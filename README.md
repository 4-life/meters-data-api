<a href="https://travis-ci.org/4-life/meters-data-api"><img src="https://travis-ci.org/4-life/meters-data-api.svg" alt="Build Status"></a>
<a href="https://david-dm.org/4-life/meters-data-api"><img src="https://david-dm.org/4-life/meters-data-api.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/4-life/meters-data-api/?type=dev"><img src="https://david-dm.org/4-life/meters-data-api/dev-status.svg" alt="devDependency Status"></a>

# Steps to create a server

## Create DB

> sudo -i -u postgres

> psql

Create DB from `schema.sql` file.

## Test request:

> curl --header "Content-Type: application/json" http://localhost:3005/api/v1/metrics -d '{"sensorid": "13451571" }'
