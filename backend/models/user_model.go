package models

type Student struct {
	SrCode   string `json:"srCode"`
	Email    string `json:"email"`
	FullName string `json:"name"`
	Role     string `json:"role"`
	Password string `json:"password"`
}
