# Task Management System

This is a task management system built with Python, utilizing AWS Lambda for serverless functions and MongoDB as the NoSQL database for storing tasks and user information. The system includes user authentication and task management functionalities.

## Project Structure

```
task-management-backend
├── src
│   ├── auth
│   ├── lambda
│   ├── models
│   ├── services
│   └── utils
├── tests
├── .gitignore
├── README.md
├── requirements.txt
├── serverless.yml
└── setup.py
```

## Features

- User registration and authentication
- Task management (create, read, update, delete tasks)
- Serverless architecture using AWS Lambda
- MongoDB for data storage

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd task-management-backend
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up MongoDB:**
   - Ensure you have a MongoDB instance running.
   - Update the connection details in `src/utils/db_connector.py`.

5. **Deploy AWS Lambda functions:**
   - Install the Serverless framework if you haven't already:
     ```
     npm install -g serverless
     ```
   - Deploy the functions:
     ```
     serverless deploy
     ```

## API Usage

- **User Registration:**
  - Endpoint: `/register`
  - Method: `POST`
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`

- **User Authentication:**
  - Endpoint: `/login`
  - Method: `POST`
  - Body: `{ "email": "user@example.com", "password": "yourpassword" }`

- **Task Management:**
  - Endpoints for creating, retrieving, updating, and deleting tasks.

## Running Tests

To run the tests, use the following command:
```
pytest tests/
```

## License

This project is licensed under the MIT License.