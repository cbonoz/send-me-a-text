package server

import (
	"github.com/labstack/echo"
	"net/http"
	"github.com/labstack/gommon/log"
	"fmt"
)

const (
	MAX_ACTIVE_TEXTS = 5
)

func hello(c echo.Context) error {
	return c.String(http.StatusOK, "Hello, World!")
}

// Register a new user account.
func register(c echo.Context) error {
	user := new(User)
	if err := c.Bind(user); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	log.Debugf("Creating user id: %s", user.ID)

	err := db.Create(&user).Error
	if (err != nil) {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, user)
}

// Create a new scheduled text in the DB.
func schedule(c echo.Context) error {
	var err error
	scheduledText := new(ScheduledText)

	if err = c.Bind(scheduledText); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	log.Debugf("Scheduling text id: %s", scheduledText.ID)

	// If the phone number is not on the incoming message, attempt to do a lookup.
	if (scheduledText.Phone == nil) {
		user := new(User)
		err = db.Table("user").Where("deviceId = ?", scheduledText.DeviceId).First(&user).Error
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err)
		}
		scheduledText.Phone = user.Phone
	}


	var count int64
	err = db.Table("scheduledtext").Where("(phone = ? or deviceId = ?) and sent=false", scheduledText.Phone, scheduledText.DeviceId).Count(&count).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	if (count > MAX_ACTIVE_TEXTS) {
		errorMessage := fmt.Sprintf(
			"This alert would exceed the active alert limit of %d (currently at %d)",
			MAX_ACTIVE_TEXTS, count)
		return c.JSON(http.StatusBadRequest, errorMessage)
	}

	err = db.Create(&scheduledText).Error

	if (err != nil) {
		return c.JSON(http.StatusInternalServerError, err)
	}

	err = scheduleText(scheduledText)
	if (err != nil) {
		return c.JSON(http.StatusBadRequest, err)
	}

	return c.JSON(http.StatusOK, scheduledText)
}


