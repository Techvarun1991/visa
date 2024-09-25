#!/bin/bash

# Define the dynamic values for the Eureka Discovery Server
EUREKA_HOSTNAME="localhost"
EUREKA_SERVICE_URL="http://localhost:8761/eureka"
EUREKA_IP_ADDRESS="127.0.0.1"

PROJECT_FOLDER="visa"  # Name of the folder the repository will be cloned into

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Step 1: Navigate to the 'discovery-server' folder
echo "Navigating into the 'discovery-server' folder..."
cd "$PROJECT_FOLDER/discovery-server" || { echo "Failed to enter discovery-server directory"; exit 1; }

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

  # Pass the environment variables while executing the JAR 
  EUREKA_HOSTNAME="$EUREKA_HOSTNAME" \
  EUREKA_SERVICE_URL="$EUREKA_SERVICE_URL" \
  EUREKA_IP_ADDRESS="$EUREKA_IP_ADDRESS" \
  nohup java -jar "$JAR_FILE" > discovery-server.log 2>&1 &
  
  echo "Discovery Server started in detached mode with dynamic configurations!"
fi
