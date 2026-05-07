#! /usr/bin/env node
require("dotenv").config();
const { argv } = require('node:process');
const { Client } = require("pg");

const database = process.argv0;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message TEXT,
  added TIMESTAMP WITH TIME ZONE DEFAULT now(),
);

INSERT INTO messages (username, message) 
VALUES
    ('Luke Skywalker', 'May the Force be with you.'),
    ('Rocky Balboa', 'It ain’t about how hard you hit. It’s about how hard you can get hit and keep moving forward.'),
    ('Batman', 'It’s not who I am underneath, but what I do that defines me.'),
    ('Yoda', 'Do or do not. There is no try.'),
    ('Spider-Man', 'With great power comes great responsibility.'),
    ('Forrest Gump', 'Life is like a box of chocolates. You never know what you’re gonna get.'),
    ('Tony Stark', 'I am Iron Man.'),
    ('The Terminator', 'I’ll be back.'),
    ('Maximus', 'What we do in life echoes in eternity.'),
    ('Neo', 'There is no spoon.'),
    ('Obi-Wan Kenobi', 'These aren’t the droids you’re looking for.'),
    ('Gandalf', 'All we have to decide is what to do with the time that is given us.'),
    ('Jack Sparrow', 'Why is the rum always gone?'),
    ('Morpheus', 'Free your mind.'),
    ('Darth Vader', 'I find your lack of faith disturbing.');
`;

// Here we would user the argv0 to populate a production database with the info.
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${database}:5432/messages`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
