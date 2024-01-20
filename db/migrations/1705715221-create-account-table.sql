CREATE TABLE IF NOT EXISTS public.account (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES public.user(id),
    name VARCHAR(45) NOT NULL,
    amount INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
)