
# Full Stack Email Builder App

Email Builder is a full-stack web application designed to create and manage email templates easily. It provides a user-friendly interface for non-technical users to customize email templates according to their needs.

![Email Builder Demo](demo.gif)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

### Frontend

- **Display Layout**: Fetches and displays the HTML content of the email template (`layout.html`) from the backend.
- **Edit Text Fields**: Allows users to modify text fields such as Title, Content, etc., within the template.
- **Upload Images**: Provides functionality to upload image assets that can be included in the email template.
- **Object Storage**: Stores all template field values in a JavaScript object, which can be sent to the backend for further processing.

#### Advanced Features (Bonus)

- **Section Reordering**: Capability to rearrange sections within the email template (move sections up and down).
- **Styling Options**: Ability to customize colors, text sizes, alignment, etc., for text fields and other elements within the template.

### Backend API

- **GET /getEmailLayout**: Retrieves the HTML code of `layout.html` stored on the server and sends it to the frontend for editing.
- **POST /uploadImage**: API endpoint for uploading image assets to the server, making them available for use in email templates.
- **POST /uploadEmailConfig**: Stores the email template configuration (as JSON) in the database for future retrieval and rendering.
- **POST /renderAndDownloadTemplate**: Uses the layout HTML and substitutes configured values from the frontend to generate a final output HTML file ready for email distribution.

## Technologies Used

- **Frontend**: [React](https://reactjs.org/) (or replace with your chosen frontend framework)
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/) (or your preferred backend framework)
- **Database**: [MongoDB](https://www.mongodb.com/) (or any database suitable for storing JSON objects)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your local environment
- MongoDB server running locally or accessible remotely (if using MongoDB)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your_username/email-builder.git
   cd email-builder
   ```

2. Install npm dependencies for frontend and backend:

   - Frontend (assuming you're using React):

     ```sh
     cd frontend
     npm install
     ```

   - Backend:
     ```sh
     cd backend
     npm install
     ```

3. Set up environment variables:

   - Configure necessary environment variables such as database connection strings, API keys, etc., in `.env` files in both `frontend` and `backend` directories.

### Running the Application

1. Start frontend development server:

   ```sh
   cd frontend
   npm start
   ```

   The frontend will run on `http://localhost:3000` by default.

2. Start backend server:

   ```sh
   cd backend
   npm start
   ```

   The backend will run on `http://localhost:5000` by default.

3. Open your web browser and navigate to `http://localhost:3000` to use the Email Builder application.

## API Documentation

For detailed API documentation and usage, refer to the [API Documentation](API_DOCUMENTATION.md).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- Example UI and concept inspired by [insert reference or inspiration here, if applicable]
- Special thanks to [mention anyone you want to thank, if applicable]

---

Feel free to modify and expand upon this template to suit your specific project needs. Good luck with your "Email Builder" project!
