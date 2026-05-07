# Michanoku Message Board

The Odin Project Mini Message Board. A small Express app that lets users view and post messages.

## What it does

* Displays a list of messages on the homepage (`/`)
* Provides a form to create a new message (`/new`)
* Lets users submit messages via POST request
* Shows individual message details on a separate page (`/message/:id`)
* Stores messages in a PostgreSQL database
* Includes basic server-side validation for submitted messages

## Tech Stack

* Express used as the server framework
* EJS used as the templating engine
* PostgreSQL used for data storage
* node-postgres (`pg`) used for database queries

## Notes

* Requires a `.env` file with:
  * `NODE_ENV`
  * `DB_USERNAME`
  * `DB_PASSWORD`
  * `DB_HOST`
  * `DB_NAME`
* Focus is on understanding Express routing, request flow and DB implementation
