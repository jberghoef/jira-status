package main

import (
	"log"

	valid "github.com/asaskevich/govalidator"
	"github.com/jberghoef/jira-status/api"
	"github.com/joho/godotenv"
)

func init() {
	valid.SetFieldsRequiredByDefault(true)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found...")
	}
}

func main() {
	api.Start()
}
