DROP DATABASE IF EXISTS metrics_db;
CREATE DATABASE metrics_db;

\c metrics_db;

CREATE TABLE IF NOT EXISTS metrics(
    id SERIAL PRIMARY KEY NOT NULL,
    delta0 INT NOT NULL,
    delta1 INT NOT NULL,
    good INT NOT NULL,
    boot INT NOT NULL,
    ch0 DOUBLE PRECISION NOT NULL,
    ch1 DOUBLE PRECISION NOT NULL,
    imp0 INT NOT NULL,
    imp1 INT NOT NULL,
    version INT NOT NULL,
    voltage DOUBLE PRECISION NOT NULL,
    version_esp VARCHAR(255) NOT NULL,
    key VARCHAR(255) NOT NULL,
    resets INT NOT NULL,
    voltage_low BOOLEAN NOT NULL,
    voltage_diff INT NOT NULL,
    rssi INT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL
);
