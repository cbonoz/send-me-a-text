package server

import "github.com/jinzhu/gorm"

type User struct {
	gorm.Model
	DeviceId  string `json:"deviceId" form:"deviceId"`
	Phone string `json:"phone" form:"phone"`
}

type ScheduledText struct {
	gorm.Model
	Time string `json:"time" form:"time"`
	DeviceId  string `json:"deviceId" form:"deviceId"`
	Phone string `json:"phone" form:"phone"`
	Message string `json:"message" form:"message"`
	Sent bool `json:"sent" form:"sent"` // has the message been sent or not (defaults to false).
}

