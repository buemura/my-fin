CREATE TABLE IF NOT EXISTS public.user (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
)