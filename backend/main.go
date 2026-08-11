package main

import (
	"api/deadline-hub/database"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {

	app := fiber.New()

	app.Use(cors.New())

	// connection
	db := database.Connect()

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	//
	defer db.Close()
	app.Listen(":3000")
}
