CREATE TABLE IF NOT EXISTS public.transaction (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES public.user(id),
    account_id VARCHAR(255) REFERENCES public.account(id),
    category_id VARCHAR(255) REFERENCES public.category(id),
    name VARCHAR(45) NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR(45) NOT NULL,
    date TIMESTAMP NOT NULL
);
