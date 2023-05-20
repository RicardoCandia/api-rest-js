Script de la base de datos
-- Database: CANDIACORP

-- DROP DATABASE IF EXISTS "CANDIACORP";

CREATE DATABASE "CANDIACORP"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Bolivia.1252'
    LC_CTYPE = 'Spanish_Bolivia.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT TEMPORARY, CONNECT ON DATABASE "CANDIACORP" TO PUBLIC;

GRANT ALL ON DATABASE "CANDIACORP" TO postgres;

-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    cedula_identidad character varying COLLATE pg_catalog."default",
    nombre character varying COLLATE pg_catalog."default",
    primer_apellido character varying COLLATE pg_catalog."default",
    segundo_apellido character varying COLLATE pg_catalog."default",
    fecha_nacimiento date
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;
    
Dirección de la api
http://localhost:8080/estado
http://localhost:8080/usuarios
http://localhost:8080/usuarios/6096990
http://localhost:8080/promedioEdad
http://localhost:8080/usuarios/ (POST)
http://localhost:8080/usuarios/6096990 (PUT)
http://localhost:8080/usuarios/6096990 (DELETE)