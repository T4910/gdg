# GDG Competition API

This is the backend API for the GDG Competition project, built using AdonisJS.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Tasks](#tasks)
    - [Admin](#admin)
- [Middleware](#middleware)
- [Exception Handling](#exception-handling)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
     ```sh
     git clone <repository-url>
     cd gdg-competition
     ```

2. Install dependencies:
     ```sh
     npm install
     ```

3. Copy the .env.example to .env and configure the environment variables:
     ```sh
     cp .env.example .env
     ```

## Configuration

Configure the environment variables in the .env file according to your setup.

## Running the Server

1. To start the server in development mode:
     ```sh
     npm run dev
     ```

2. To build the project:
     ```sh
     npm run build
     ```

3. To start the server in production mode:
     ```sh
     npm start
     ```

## API Endpoints

### Authentication
- `POST /auth/login`: Log in a user.
- `POST /auth/register`: Register a new user.
- `POST /auth/forgot-password`: Request a password reset.
- `POST /auth/reset-password`: Reset the user's password.
- `POST /auth/logout`: Log out the current user.
- `GET /auth/verify`: Verify the user's email.
- `GET /auth/me`: Get details of the authenticated user.

### Tasks
- `GET /users/:userId/tasks`: Get tasks for a user.
- `POST /users/:userId/tasks`: Create a new task for a user.
- `GET /users/:userId/tasks/:taskId`: Get a specific task for a user.
- `PATCH /users/:userId/tasks/:taskId`: Update a specific task for a user.
- `DELETE /users/:userId/tasks/:taskId`: Delete a specific task for a user.

### Admin
- `GET /admin/users`: Get all users.
- `POST /admin/users`: Create a new user.
- `GET /admin/users/:userId`: Get a specific user.
- `DELETE /admin/users/:userId`: Delete a specific user.

## Middleware
- `AuthMiddleware`: Ensures the user is authenticated.
- `AdminMiddleware`: Ensures the user is an admin.

## Exception Handling

Exceptions are handled by the `HttpExceptionHandler` in `handler.ts`.

## Testing

To run the tests:
     ```sh
     npm test
     ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the UNLICENSED License.