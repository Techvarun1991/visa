#!/bin/bash

# Update the system
sudo dnf update -y

# Install Java 17
echo "Installing Java 17..."
sudo dnf install java-17-openjdk-devel -y

# Install Node.js 20.x
echo "Installing Node.js 20.x..."
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

# Install Maven
echo "Installing Maven..."
sudo dnf install -y maven

# Install Git
echo "Installing Git..."
sudo dnf install -y git

echo "Installation complete for RHEL 9."