#!/bin/bash

# Define the dynamic API Gateway URL, defaulting to 'localhost:8000' if not set
API_GATEWAY_URL="localhost:8000"

# Navigate to the frontend project directory
echo "Navigating into the 'visa-poc-fe' folder..."
cd visa/visa-poc-fe || { echo "Failed to enter the project directory"; exit 1; }

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Set the API Gateway path using the REACT_APP_BACKEND_URL environment variable
echo "Setting API Gateway path..."
export REACT_APP_BACKEND_URL=$API_GATEWAY_URL

# Start the React application in detached mode
echo "Starting the React application with the API Gateway path: $API_GATEWAY_URL"
nohup npm start > react-app.log 2>&1 &

echo "React application started in detached mode with API Gateway URL: $API_GATEWAY_URL"
