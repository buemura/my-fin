package helpers

import (
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

var errorsMap = map[string]int{
	"permission denied":   http.StatusForbidden,
	"invalid credentials": http.StatusUnauthorized,
	"not found":           http.StatusNotFound,
	"alredy exists":       http.StatusUnprocessableEntity,
	"service unavailable": http.StatusServiceUnavailable,
}

func BuildErrorResponse(c echo.Context, errMsg string) error {
	for key, statusCode := range errorsMap {
		if strings.Contains(strings.ToLower(errMsg), key) {
			return c.JSON(statusCode, map[string]interface{}{
				"error": errMsg,
			})
		}
	}

	return c.JSON(http.StatusBadRequest, map[string]interface{}{
		"error": errMsg,
	})
}
