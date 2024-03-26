CREATE TABLE IF NOT EXISTS public.account (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL REFERENCES public.user(id),
    name VARCHAR(45) NOT NULL,
    balance INTEGER NOT NULL,
    color VARCHAR(45) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
)