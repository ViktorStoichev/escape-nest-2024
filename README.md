
# Escape Nest

**Escape Nest** is a platform for users to share their trip experiences in Bulgaria with others. It allows users to see, post, edit, and delete experiences, while also allowing others to like, dislike, and comment on posts. It's designed to connect people who love to explore and share their adventures.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Technologies](#technologies)

## Description

Escape Nest is a web application where users can:

- Share their travel experiences in Bulgaria.
- View and interact with others' posts.
- Like, dislike, and comment on experiences shared by other users.

This project uses **Node.js**, **Express**, **MongoDB**, and **Angular** to handle the backend and frontend functionality.

## Installation

To install and run **Escape Nest** locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/escape-nest.git
   ```

2. Navigate to the `backend` directory:
   ```bash
   cd escape-nest/backend
   ```

3. Initialize the backend project and install dependencies:
   ```bash
   npm init -y
   npm install express mongoose cors
   ```

4. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```

   (Note: No additional installation is needed for the frontend)

## Usage

To run the project locally:

1. Open a terminal window, navigate to the `backend` directory, and run the backend server:
   ```bash
   npm start
   ```

2. Open another terminal window, navigate to the `frontend` directory, and start the Angular app:
   ```bash
   ng serve
   ```

3. Visit `http://localhost:4200` in your browser to access the application.

## Contributing

This project is for a personal task, and no contributions are required. Feel free to explore the code or visit the platform!

## License

This project doesn't have a formal license since it's a simple project for a task.

## Technologies

- **Node.js**: For the backend server.
- **Express**: For handling routes and HTTP requests.
- **MongoDB**: For the database to store user data and posts.
- **Angular**: For the frontend application to interact with the backend.
