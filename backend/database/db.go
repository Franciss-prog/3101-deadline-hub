package database

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"log"
	"os"
)

func Connect() *pgxpool.Pool {
	// ge the dotenv data
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// get the database url
	dbUrl := os.Getenv("DATABASE_URL")

	// connect to the database
	db, err := pgxpool.New(context.Background(), dbUrl)
	if err != nil {
		log.Fatal(err)
	}

	return db
}
