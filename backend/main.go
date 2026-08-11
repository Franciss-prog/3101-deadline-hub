package main

import (
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {

	app := fiber.New()

	app.Use(cors.New())

	app.Get("/", func(c fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Listen(":3000")
}
