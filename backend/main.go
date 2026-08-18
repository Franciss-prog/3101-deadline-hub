package main

import (
	"api/deadline-hub/database"
	"api/deadline-hub/handlers"
	"api/deadline-hub/repository"
	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func main() {

	app := fiber.New()

	// cors config
	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowCredentials: true,
	}))

	// connect to the database
	db := database.Connect()

	// close the connection
	defer db.Close()

	// repo
	repo := repository.NewAuthRepository(db)
	// auth handler
	auth := handlers.NewAuthHandler(repo)

	// auth handlers
	app.Post("/login", auth.Login)
	app.Post("/register", auth.Register)

	app.Listen(":3000")
}
