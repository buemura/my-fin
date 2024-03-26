package user

import "errors"

var ErrAlreadyExists = errors.New("user already exists")
var ErrNotFound = errors.New("user not found")
var ErrInvalidCredential = errors.New("invalid credential")
var ErrPermissionDenied = errors.New("permission denied")
