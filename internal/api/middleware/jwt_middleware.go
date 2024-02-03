package middleware

import (
	"net/http"
	"strings"

	"github.com/buemura/my-fin/internal/constant"
	"github.com/buemura/my-fin/internal/infra/encryption"
	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type RquestUser struct {
	ID string
}

func extractAndValidateToken(c echo.Context) (jwt.MapClaims, error) {
	authorization := c.Request().Header["Authorization"]
	if len(authorization) == 0 {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "Missing JWT Token",
		})
	}
	if authorization[0] == "" {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "Missing JWT Token",
		})
	}
	token := strings.Split(authorization[0], "Bearer ")
	if len(token) == 1 {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "Missing JWT Token",
		})
	}
	jwtToken, err := encryption.ParseToken(token[1])
	if err != nil {
		return nil, c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "Unauthorized",
		})
	}
	return jwtToken, nil
}

func extractAndSetUser(c echo.Context, token jwt.MapClaims) error {
	id := token["sub"]
	str, ok := id.(string)
	if !ok {
		return c.JSON(http.StatusForbidden, map[string]string{
			"error": "Unable to determine requester user",
		})
	}

	c.Set(constant.UserContextKey, RquestUser{
		ID: str,
	})
	return nil
}

func EnsureAuth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		var jwtToken jwt.MapClaims
		var err error

		if jwtToken, err = extractAndValidateToken(c); err != nil {
			return err
		}

		if err = extractAndSetUser(c, jwtToken); err != nil {
			return err
		}
		return next(c)
	}
}
