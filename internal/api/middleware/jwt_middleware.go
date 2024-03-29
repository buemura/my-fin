package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/buemura/my-fin/internal/constant"
	"github.com/buemura/my-fin/internal/infra/adapters"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type RquestUser struct {
	ID string
}

func extractAndValidateToken(c echo.Context) (jwt.MapClaims, error) {
	authorization := c.Request().Header["Authorization"]
	if len(authorization) == 0 {
		return nil, errors.New("missing JWT Token")
	}
	if authorization[0] == "" {
		return nil, errors.New("missing JWT Token")
	}
	token := strings.Split(authorization[0], "Bearer ")
	if len(token) == 1 {
		return nil, errors.New("missing JWT Token")
	}
	jwtToken, err := adapters.NewJwtTokenGenerator().Parse(token[1])
	if err != nil {
		return nil, err
	}
	return jwtToken.(jwt.MapClaims), nil
}

func extractAndSetUser(c echo.Context, token jwt.MapClaims) error {
	id, ok := token["sub"].(string)
	if !ok {
		return errors.New("unable to determine requester user")
	}

	c.Set(constant.UserContextKey, RquestUser{
		ID: id,
	})
	return nil
}

func EnsureAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		jwtToken, err := extractAndValidateToken(c)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{
				"error": err.Error(),
			})
		}

		if err := extractAndSetUser(c, jwtToken); err != nil {
			return c.JSON(http.StatusForbidden, map[string]string{
				"error": err.Error(),
			})
		}
		return next(c)
	}
}
