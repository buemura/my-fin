package user

import "errors"

var ErrNotFound = errors.New("user not found")
var ErrAlreadyExists = errors.New("user already exists")
var ErrInvalidCredential = errors.New("invalid credential")
var ErrPermissionDenied = errors.New("permission denied")
