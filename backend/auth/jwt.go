package auth

import (
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"os"
	"time"
)

// struct the jwt
type Claims struct {
	SrCode string `json:"srCode"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// function to generate jwt
func GenerateJWT(claims Claims) (string, error) {

	// load the JWT_SECRET
	if err := godotenv.Load(); err != nil {
		return "", err
	}
	// get the  JWT_SECRET
	JWT_SECRET := os.Getenv("JWT_SECRET")

	// set the expiration time
	claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(time.Hour * 24))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(JWT_SECRET))

	if err != nil {
		return "", err
	}
	return tokenString, nil
}
