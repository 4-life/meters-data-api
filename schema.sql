DROP DATABASE IF EXISTS metrics_db;
CREATE DATABASE metrics_db;

\c metrics_db;

CREATE TABLE IF NOT EXISTS metrics(
    id SERIAL PRIMARY KEY NOT NULL,
    status TEXT NOT NULL,
    sensorid TEXT NOT NULL,
    datetime TIMESTAMP WITH TIME ZONE NOT NULL,
);
