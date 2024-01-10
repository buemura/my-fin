package user

type UserSignupInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserSigninInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
