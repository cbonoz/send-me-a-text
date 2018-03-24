package server

import (
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/op/go-logging"
	"fmt"
	"github.com/labstack/echo/middleware"
	"os"
	"github.com/labstack/gommon/log"
)

/*
 * Go Microservice for managing requests for scheduling text messages from the Alexa application
 */

var db *gorm.DB

var (
	DB_NAME = "schedule"
	DB_USER = mustGetenv("SCHEDULE_DB_USER")
	DB_PASS = mustGetenv("SCHEDULE_DB_PASS")
)

// Example format string. Everything except the message has a custom color
// which is dependent on the log level. Many fields have a custom output
// formatting too, eg. the time returns the hour down to the milli second.
var format = logging.MustStringFormatter(
	//`%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.4s} %{id:03x}%{color:reset} %{message}`,
	`%{color}%{time:15:04:05.000} %{shortfunc} ▶ %{level:.3s} %{color:reset} %{message}`,
)

func configureLogging() {
	errorBackend := logging.NewLogBackend(os.Stderr, "", 0)
	debugBackend := logging.NewLogBackend(os.Stdout, "", 0)

	// For messages written to backend2 we want to add some additional
	// information to the output, including the used log level and the name of
	// the function.
	debugBackendFormatter := logging.NewBackendFormatter(debugBackend, format)

	// Only errors and more severe messages should be sent to backend1
	errorBackendLeveled := logging.AddModuleLevel(errorBackend)
	errorBackendLeveled.SetLevel(logging.ERROR, "")

	// Set the backends to be used.
	logging.SetBackend(errorBackendLeveled, debugBackendFormatter)
	log.Debugf("configured logging successfully")
}

func main() {
	configureLogging()

	var err error
	// Create global db.
	dbUrl := fmt.Sprintf("host=localhost user=%s dbname=%s sslmode=disable password=%s", DB_USER, DB_NAME, DB_PASS)
	db, err = gorm.Open("postgres", dbUrl)
	defer db.Close()
	if err != nil {
		log.Error(err.Error())
	}
	log.Debugf("Opened DB %s", dbUrl)
	db.AutoMigrate(&User{}, &ScheduledText{})
	// Only allow a scheduled text to be created if there is already a registered deviceId/phone in the User table.
	db.Model(&ScheduledText{}).AddForeignKey("deviceId", "user(deviceId)", "RESTRICT", "RESTRICT")

	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Routes.
	e.GET("/sc/hello", hello)

	// Create a new user (device and phone)
	e.POST("/sc/register", register)
	// Schedule a text message to be sent.
	e.POST("/sc/schedule", schedule)

	port := ":9002"
	fmt.Println("Started server on port $1", port)
	e.Logger.Error(e.Start(port))
}
