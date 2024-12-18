# Escape Nest

**Escape Nest** is a single-page web application (SPA) that connects travelers by allowing them to share and explore trip experiences across Bulgaria. Users can create, edit, and delete posts, interact with others' posts through likes, dislikes, and comments, and engage with a dynamic and user-friendly platform.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## Description

Escape Nest provides a platform where users can:

- Share personal travel experiences and adventures in Bulgaria.
- View a catalog of posts, each with detailed information about the trips.
- Like, dislike, and comment on other users' posts to foster interaction.
- Edit and delete their own posts when necessary.

The platform is built using the **MEAN stack** (MongoDB, Express.js, Angular, Node.js), providing a robust and scalable foundation.

---

## Features

1. **Dynamic Pages**
   - **Catalog Page**: Displays a list of all posts (dynamic data).
   - **Post Details Page**: Shows detailed information about a specific post, including comments and reactions.
   - **User Dashboard**: Displays a personalized list of posts for the logged-in user.
   - **Explore Page**: Browse trending posts based on likes and comments.

2. **User Roles and Access**
   - Guests can:
     - Browse the catalog and view details of posts.
     - Access public pages like the home, about, register, and login pages.
   - Registered users can:
     - Create, edit, and delete posts.
     - Like, dislike, and comment on posts.

3. **CRUD Operations**
   - Full CRUD functionality for posts, including validation and error handling.
   - Interaction features such as liking, disliking, and commenting.

4. **Secure Routing**
   - **Route Guards**: Prevent unauthorized access to private pages (e.g., create, edit, dashboard).
   - Private routes for logged-in users and public routes for guests.

5. **Responsive Design**
   - Optimized for mobile and desktop devices with clean, user-friendly UI/UX.

6. **Error Handling**
   - Conditional rendering based on error responses.
   - User-friendly error messages and validation prompts.

---

## Installation

To set up and run **Escape Nest** locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/escape-nest.git
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Configure the environment variables:
   - **Frontend**: Update the `environment.ts` file in the `environments` folder to use the backend URL (e.g., `http://localhost:3000`).

---

## Usage

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`.

Alternatively, use the hosted version:
[Escape Nest Live Demo](https://flourishing-smakager-8cf897.netlify.app)

---

## Technologies

### Frontend
- **Angular 18**: For building the single-page application (SPA).
  - Features: standalone components, reactive forms, route guards, and observables.
- **RxJS**: For handling asynchronous operations and reactive programming.
- **CSS**: For styling and responsive design.

### Backend
- **Node.js**: For the runtime environment.
- **Express.js**: For creating the REST API and handling requests.
- **MongoDB**: As the database to store user data and posts.
- **JWT**: For secure authentication.

---

## Architecture

1. **Frontend**:
   - Built with Angular and TypeScript.
   - Implements client-side routing with parameterized routes for dynamic pages.
   - Uses Angular services to communicate with the backend via HTTP.

2. **Backend**:
   - RESTful API built with Express.js.
   - Authentication using JWT and cookies for secure sessions.
   - Mongoose for database interaction.

3. **Database**:
   - MongoDB for storing users, posts, comments, and reactions.
   - Relational-style schema for efficient querying.

4. **Deployment**:
   - Backend hosted on [Render].
   - Frontend hosted on [Netlify].

---

## Contributing

This project was created for academic purposes. Contributions are not required but are welcome. Feel free to fork the repository or suggest improvements.

---

## License

This project is not licensed as it was created for educational purposes.
