package helpers

import (
	"errors"
	"net/http"

	"github.com/buemura/my-fin/internal/domain/user"
	"github.com/labstack/echo/v4"
)

var ErrBadRequest = errors.New("bad request")
var ErrInvalidArgument = errors.New("invalid argument")

type ErrorMessage struct {
	Error string `json:"error"`
}

func HandleHttpError(c echo.Context, err error) error {
	switch {
	case errors.Is(err, user.ErrUserAlreadyExists): // 422
		return c.NoContent(http.StatusUnprocessableEntity)
	case errors.Is(err, user.ErrUserInvalidCredential): // 401
		return c.NoContent(http.StatusUnauthorized)
	case errors.Is(err, user.ErrUserNotFound): // 404
		return c.NoContent(http.StatusNotFound)
	case errors.Is(err, user.ErrUserPermissionDenied): // 403
		return c.NoContent(http.StatusForbidden)

	case errors.Is(err, ErrBadRequest): // 404
		return c.NoContent(http.StatusBadRequest)
	case errors.Is(err, ErrInvalidArgument): // 422
		return c.NoContent(http.StatusUnprocessableEntity)
	default: // 500
		return c.NoContent(http.StatusInternalServerError)
	}
}
