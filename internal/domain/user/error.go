package user

import "errors"

var ErrUserAlreadyExists = errors.New("user already exists")
var ErrUserNotFound = errors.New("user not found")
var ErrUserInvalidCredential = errors.New("invalid credential")
var ErrUserPermissionDenied = errors.New("permission denied")
