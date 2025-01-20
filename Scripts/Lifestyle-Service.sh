#!/bin/bash

# Define the dynamic values for PostgreSQL, API Gateway, and Eureka Server
DATABASE_URL="jdbc:postgresql://10.128.0.39:5432/visa"
DATABASE_USERNAME="postgres"
DATABASE_PASSWORD="infobell"
API_GATEWAY_URL="http://localhost:8000"
EUREKA_SERVER_URL="http://localhost:8761/eureka"

# Set the PROJECT_FOLDER (the folder where your repository is located)
PROJECT_FOLDER="visa"  # Name of the folder the repository will be cloned into

# Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk

# Step 1: Navigate to the 'OneHealth-LifestyleandMedicalHistory' folder
echo "Navigating into the 'OneHealth-LifestyleandMedicalHistory' folder..."
cd "$PROJECT_FOLDER/OneHealth-LifestyleandMedicalHistory" || { echo "Failed to enter OneHealth-LifestyleandMedicalHistory directory"; exit 1; }

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
  
  # Run the JAR file with dynamic environment variables for PostgreSQL, API Gateway, and Eureka
  DATABASE_URL="$DATABASE_URL" \
  DATABASE_USERNAME="$DATABASE_USERNAME" \
  DATABASE_PASSWORD="$DATABASE_PASSWORD" \
  API_GATEWAY_URL="$API_GATEWAY_URL" \
  EUREKA_SERVER_URL="$EUREKA_SERVER_URL" \
  nohup java -jar "$JAR_FILE" > lifestyle.log 2>&1 &
  
  echo "OneHealth-LifestyleandMedicalHistory started in detached mode with dynamic configurations!"
fi
