[![Build Status](https://travis-ci.org/4-life/meters-data-api.svg?branch=master)](https://travis-ci.org/4-life/meters-data-api)
![David](https://img.shields.io/david/4-life/meters-data-api)
![David](https://img.shields.io/david/dev/4-life/meters-data-api)
[![glutenfree](https://img.shields.io/badge/Gluten-Free-green.svg)](https://github.com/4-life/meters-data-api)
# Steps to create a server

## Create .env file with environments

See example in `.env-template` file

## Create DB

> sudo -i -u postgres

> psql

Create DB from `schema.sql` file.

## Test request:

> curl --header "Content-Type: application/json" http://localhost:3005/api/v1/metrics -d '{"sensorid": "13451571" }'
