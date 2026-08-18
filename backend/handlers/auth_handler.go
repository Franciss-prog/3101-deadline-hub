package handlers

import (
	"api/deadline-hub/auth"
	"api/deadline-hub/models"
	"api/deadline-hub/repository"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v3"
)

type AuthHandler struct {
	repo *repository.AuthRepository
}

func NewAuthHandler(repo *repository.AuthRepository) *AuthHandler {
	return &AuthHandler{
		repo: repo,
	}
}

func (h *AuthHandler) Login(c fiber.Ctx) error {
	// get the user model
	student := new(models.Student)

	// bind the request data
	if err := c.Bind().All(student); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "failed to bind user"})
	}

	// form validation
	if student.SrCode == "" || student.Email == "" || student.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Please fill all the fields"})
	}

	// Check to the database if the user and password match
	fullName, err := h.repo.VerifyStudent(student)
	fmt.Println(fullName)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Check your srcode, email or password"})
	}

	// generate jwt
	token, err := auth.GenerateJWT(auth.Claims{SrCode: student.SrCode, Role: student.Role})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Failed to generate jwt"})
	}

	// set the cookie
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	})

	// success message
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Welcome to  Deadline Hub", "name": fullName})
}

func (h *AuthHandler) Register(c fiber.Ctx) error {

	// get the user model
	student := new(models.Student)

	// obtain the request data
	if err := c.Bind().All(student); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Failed to bind user"})
	}

	// obtain the form validation
	if student.SrCode == "" || student.Email == "" || student.Password == "" || student.FullName == "" || student.Role == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Please fill all the fields"})
	}
	// print the srcode
	fmt.Println(student.SrCode)
	// create the user
	if err := h.repo.CreateStudent(student); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Failed to create user"})
	}

	// generate tokens
	token, err := auth.GenerateJWT(auth.Claims{SrCode: student.SrCode, Role: student.Role})

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Failed to generate jwt"})
	}

	// set the cookie
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	})

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Welcome to  Deadline Hub" + " " + student.FullName})
}

func Logout(c fiber.Ctx) error {
	return c.SendString("Logout")
}
