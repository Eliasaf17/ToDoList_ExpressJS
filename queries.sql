-- Necessary queries for run the app -- 

DROP DATABASE IF EXISTS permalist;
CREATE DATABASE permalist
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Latin America.1252'
    LC_CTYPE = 'Spanish_Latin America.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

CREATE TABLE works (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);