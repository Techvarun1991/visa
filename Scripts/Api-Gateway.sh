#!/bin/bash

# Define the base URL that will be passed to the application
SPRING_APP_FRONTEND_URL="http://localhost:3000"

# Set the PROJECT_FOLDER (the folder where your repository is located)
PROJECT_FOLDER="visa"  # Name of the folder the repository will be cloned into

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Step 1: Navigate to the 'api-gateway' folder
echo "Navigating into the 'api-gateway' folder..."
cd "$PROJECT_FOLDER/api-gateway" || { echo "Failed to enter api-gateway directory"; exit 1; }

# Step 2: Run Maven clean install
echo "Running Maven clean install..."
mvn clean install -U

# Step 3: Find and execute the JAR file inside the /target folder
JAR_FILE=$(find target -name "*.jar" | head -n 1)

if [ -z "$JAR_FILE" ]; then
  echo "JAR file not found in the target directory."
  exit 1
else
  echo "Executing the JAR file: $JAR_FILE"
  
  # Pass the API_BASE_URL dynamically as an environment variable
  SPRING_APP_FRONTEND_URL="$SPRING_APP_FRONTEND_URL" nohup java -jar "$JAR_FILE" > api-gateway.log 2>&1 &
  
  echo "api-gateway started in detached mode with API_BASE_URL: $API_BASE_URL"
fi
