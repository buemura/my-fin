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

func buildError(c echo.Context, status int, errMsg string) error {
	return c.JSON(status, map[string]string{"error": errMsg})
}

func HandleHttpError(c echo.Context, err error) error {
	switch {
	case errors.Is(err, user.ErrAlreadyExists): // 422
		return buildError(c, http.StatusUnprocessableEntity, err.Error())
	case errors.Is(err, user.ErrInvalidCredential): // 401
		return buildError(c, http.StatusUnauthorized, err.Error())
	case errors.Is(err, user.ErrNotFound): // 404
		return buildError(c, http.StatusNotFound, err.Error())
	case errors.Is(err, user.ErrPermissionDenied): // 403
		return buildError(c, http.StatusForbidden, err.Error())

	case errors.Is(err, ErrBadRequest): // 404
		return buildError(c, http.StatusBadRequest, err.Error())
	case errors.Is(err, ErrInvalidArgument): // 422
		return buildError(c, http.StatusUnprocessableEntity, err.Error())
	default: // 500
		return buildError(c, http.StatusInternalServerError, err.Error())
	}
}
