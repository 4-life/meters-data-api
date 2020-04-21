
# Steps to create a server

## Create DB

> sudo -i -u postgres

> psql

Create DB from `schema.sql` file.

## Test request:

> curl --header "Content-Type: application/json" http://localhost:3005/api/v1/metrics -d '{"sensorid": "13451571" }'
