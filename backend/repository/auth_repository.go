package repository

import (
	"api/deadline-hub/models"
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
)

type AuthRepository struct {
	db *pgxpool.Pool
}

// auth repository
func NewAuthRepository(db *pgxpool.Pool) *AuthRepository {
	return &AuthRepository{
		db: db,
	}
}

// function to create student
func (r *AuthRepository) CreateStudent(student *models.Student) error {

	_, err := r.db.Exec(context.Background(), "INSERT INTO users (sr_code, password_hash, name, role) VALUES ($1, crypt($2, gen_salt('bf', 12)), $3, $4)", student.SrCode, student.Password, student.FullName, student.Role)
	if err != nil {
		return err
	}

	return nil
}

// function to verify student
func (r *AuthRepository) VerifyStudent(student *models.Student) (string, error) {
	var name string
	err := r.db.QueryRow(context.Background(), "SELECT name FROM users WHERE sr_code = $1 AND email = $2 AND password_hash = crypt($3, password_hash)", student.SrCode, student.Email, student.Password).Scan(&name)

	if err != nil {
		return "", err
	}

	return name, nil
}
