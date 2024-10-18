# ChatApp

A real-time chat application with user authentication and instant messaging capabilities.

## Features

- **User Authentication**: Register and login functionality with JWT-based authentication.
- **Real-Time Messaging**: Send and receive messages instantly using WebSockets (Socket.io).
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing user and chat data)
- **Real-time Communication**: Socket.io

## Installation

### Prerequisites

- Node.js (version 14.x or later)
- MongoDB (locally or a cloud-based solution like MongoDB Atlas)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/ChatApp.git
    cd ChatApp
    ```

2. Install backend dependencies:
    ```bash
    cd server
    npm install
    ```

3. Set up environment variables for the server: Create a `.env` file in the `server` directory with the following values:
    ```
    MONGODB_URL=mongodb://localhost:27017/chatapp
    CORS_ORIGIN=http://localhost:5173
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=3d
    BASE_URL=http://localhost:5173
    ```
    Replace `your_access_token_secret` and `your_refresh_token_secret` with your secret keys.

4. Run the server:
    ```bash
    npm start
    ```

5. Install frontend dependencies:
    ```bash
    cd ../client
    npm install
    ```

6. Set up environment variables for the client: Create a `.env` file in the `client` directory with the following value:
    ```
    VITE_SERVER_URL=http://localhost:8800
    ```

7. Run the React app:
    ```bash
    npm run dev
    ```

8. Access the application:
    Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Folder Structure

```bash
ChatApp/
├── client/           # React frontend
│   └── .env          # Environment variables for the client
├── server/           # Node.js/Express backend
│   ├── models/       # Mongoose models (User, Chat, etc.)
│   ├── routes/       # Express routes (auth, chat)
│   ├── controllers/  # Logic for handling requests
│   └── .env          # Environment variables for the server
├── README.md         # Project documentation
```

## Usage

1. **Register**: Create a new account using an email and password.
2. **Login**: Authenticate using your credentials.
3. **Chat**: Start a private conversation with another user.
