CREATE TABLE IF NOT EXISTS public.category (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    type VARCHAR(45) NOT NULL
);

INSERT INTO public.category (id, "name", "type") values ('db781ffa-85ac-404a-bef2-3ff77bc8b6d6', 'Salary', 'INCOME');
INSERT INTO public.category (id, "name", "type") values ('8d461be1-4104-4ed9-9cf3-9fe23247d382', 'Freelance', 'INCOME');
INSERT INTO public.category (id, "name", "type") values ('1ac8ea92-3576-4999-858a-e0c5482d142a', 'Investiment', 'INCOME');

INSERT INTO public.category (id, "name", "type") values ('c9cfc94f-eb3d-481e-94df-4f56185341e4', 'House', 'EXPENSE');
INSERT INTO public.category (id, "name", "type") values ('88f3a5b1-5f85-4abf-a516-eeb26a14a412', 'Food', 'EXPENSE');
INSERT INTO public.category (id, "name", "type") values ('ab152565-cd90-4794-98c1-200d9f64a46d', 'Education', 'EXPENSE');
INSERT INTO public.category (id, "name", "type") values ('17ecf74b-2b0c-4039-a3f1-3ab3095850e1', 'Leisure', 'EXPENSE');