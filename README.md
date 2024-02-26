# ThoughtBuddy API

Welcome to the ThoughtBuddy API! This API allows users to manage thoughts and reactions.

## Table of Contents

- [ThoughtBuddy API](#thoughtbuddy-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Endpoints](#endpoints)
  - [Usage](#usage)
  - [Video Demo](#video-demo)
  - [Links](#links)

## Features

- Create, read, update, and delete thoughts
- Add and remove reactions to thoughts
- Get all thoughts or a specific thought by ID

## Getting Started

To get started with the ThoughtBuddy API, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/carmetlo/thoughtbuddy-api.git

2. Install dependencies:
   ```bash
   cd ThoughtBuddy-API
   npm install

3.  Set up environment variables:
    1. Create a `.env` file in the root directory
    2. Define environment variables such as `MONGODB_URI` for connecting to your MongoDB database
   4. Run the server:
   ```bash
   npm run server
   ```
## Endpoints

The following endpoints are available

 - GET /api/thoughts - Get all thoughts
 - POST /api/thoughts - Create a new thought
 - GET /api/thoughts/:thoughtId - Get a specific thought by ID
 - PUT /api/thoughts/:thoughtId - Update a specific thought by ID
 - DELETE /api/thoughts/:thoughtId - Delete a specific thought by ID
 - POST /api/thoughts/:thoughtId/reactions - Add a reaction to a specific thought
 - DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a specific though

## Usage

You can use the ThoughtBuddy API to manage thoughts and reactions programmitcally or via tools like Insomnia or Postman.  Make requests to the provided endpoints use appopriate HTTP methods.

## Video Demo
Check out this video demo for a walkthrough of how to use the ThoughtBuddy API.

https://app.screencastify.com/v3/watch/GSLgXh4d9tNcHCkkRgyR

## Links

Github Repository:  https://github.com/carmetlo/thoughtbuddy-api.git

Email: michaelcarmelo16@gmail.com
