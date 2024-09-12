# # ===================== with maven
# # Use a lightweight base image for Maven
 FROM maven:3.8.3-openjdk-17-slim AS build

# # Set the working directory inside the container
 WORKDIR /app

# # Copy the source code into the container
 COPY . .

# # Build the application using Maven
 RUN mvn clean install -U

# # Use a lightweight base image for Java
FROM openjdk:17-jdk-slim

# # Set the working directory inside the container
WORKDIR /app
# RUN ls

# RUN pwd

# # Copy the compiled JAR from the build stage into the container
COPY --from=build /app/target/OneHealth-PatientManagement-0.0.1-SNAPSHOT.jar app.jar

# # Expose the port your Spring Boot application is running on (change the port accordingly)
EXPOSE 8080
#EXPOSE 443

# # Run the Spring Boot application when the container starts
CMD ["java", "-jar", "app.jar"]






# ================================= with target
# Use a lightweight base image for Java
# Dockerfile
#FROM openjdk:17-jdk-slim

# Set the working directory inside the container
#WORKDIR /app
#RUN pwd
#COPY . .
#RUN ls 
# RUN ls ServiceRegistry/target
# Copy the Spring Boot application JAR into the container
#COPY target/OneHealth-PatientManagement-0.0.1-SNAPSHOT.jar app.jar
# COPY ServiceRegistry-0.0.1-SNAPSHOT.jar app.jar


# Expose the port your Spring Boot application is running on (change the port accordingly)
#EXPOSE 8082

# Run the Spring Boot application when the container startCMD ["java", "-jar", "app.jar"]
