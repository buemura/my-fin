package adapters

import (
	"time"

	"github.com/buemura/my-fin/config"
	"github.com/golang-jwt/jwt/v5"
)

type TokenMetada struct {
	Sub  string `json:"sub"`
	Role string `json:"role"`
	Exp  int    `json:"exp"`
}

type JwtTokenGenerator struct {
}

func NewJwtTokenGenerator() *JwtTokenGenerator {
	return &JwtTokenGenerator{}
}

func (s *JwtTokenGenerator) Generate(identifier string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = identifier
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(config.JWT_SECRET))
	if err != nil {
		return "", err
	}

	return t, nil
}

func (s *JwtTokenGenerator) Parse(tokenString string) (any, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.JWT_SECRET), nil
	})
	if err != nil {
		return nil, err
	}
	return token.Claims, nil
}
