#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER lyubimov WITH encrypted password 'lyubiroman';
    CREATE DATABASE lyubimovstudio;
    GRANT ALL PRIVILEGES ON DATABASE lyubimovstudio TO lyubimov;
EOSQL
