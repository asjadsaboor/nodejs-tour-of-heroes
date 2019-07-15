#!/bin/sh


# Generate API Documentation
npm run apidocs

npm run migrate:run

exec "$@"
