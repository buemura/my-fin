package contracts

type PasswordHasher interface {
	Hash(string) (string, error)
	Compare(passStr, hashedPass string) bool
}
