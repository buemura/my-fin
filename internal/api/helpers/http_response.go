package helpers

import (
	"errors"
	"net/http"

	"github.com/buemura/my-fin/internal/domain/account"
	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/labstack/echo/v4"
)

func HandleHttpError(c echo.Context, err error) error {
	switch {
	case errors.Is(err, user.ErrAlreadyExists):
		return c.NoContent(http.StatusUnprocessableEntity)

	case errors.Is(err, user.ErrInvalidCredential):
		return c.NoContent(http.StatusUnauthorized)

	case errors.Is(err, user.ErrNotFound):
		return c.NoContent(http.StatusNotFound)

	case errors.Is(err, user.ErrPermissionDenied):
		return c.NoContent(http.StatusForbidden)

	case errors.Is(err, account.ErrAccountNotFound):
		return c.NoContent(http.StatusNotFound)

	default:
		return c.NoContent(http.StatusInternalServerError)
	}
}
