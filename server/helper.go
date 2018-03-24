package server

import (
	"os"
	"time"
	"github.com/sfreiberg/gotwilio"
	"errors"
	"fmt"
	"github.com/labstack/gommon/log"
)

var (
	accountSid = mustGetenv("TWILIO_ID")
	authToken = mustGetenv("TWILIO_TOKEN")
	TWILIO_NUMBER = mustGetenv("TWILIO_NUMBER")
	twilio = gotwilio.NewTwilioClient(accountSid, authToken)
)

func mustGetenv(k string) string {
	v := os.Getenv(k)
	if v == "" {
		log.Fatalf("%s environment variable not set.", k)
	}
	return v
}

// https://stackoverflow.com/questions/38386762/running-code-at-noon-in-golang
func scheduleText(scheduledText ScheduledText) error {
	var scheduleTime time.Time  = scheduledText.Time

	now := time.Now()
	// How much time out
	timeDiff := scheduleTime.Sub(now)
	if timeDiff < 0 {
		errorMessage := fmt.Sprintf("Cannot schedule text for the past (now: %s, scheduled: %s)", now, scheduleTime)
		return errors.New(errorMessage)
	}

	// Schedule the text in the future using a new goroutine.
	go scheduleSendtext(timeDiff, scheduledText)
	return nil
}

// TODO: support recurring texts.
func scheduleSendtext(timeDiff time.Time, scheduledText ScheduledText) {
	log.Debugf(fmt.Sprintf("scheduleSendText - time: %s, message: %s, phone: %s", timeDiff, message, phone))
	for {
		time.Sleep(timeDiff)
		var message string = scheduledText.Message
		var phone string = scheduledText.Phone
		sendText(message, phone)
		db.Model(&scheduledText).Update("sent", true)
	}
}

func sendText(message string, phone string) {
	twilio.SendSMS(TWILIO_NUMBER, phone, message, "", "")
}

