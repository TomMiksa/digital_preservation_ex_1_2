# Using OpenJdk 8 as parent image, which uses Alpine Linux for smaller image sizes
FROM openjdk:8-jdk-alpine

# Metadata
LABEL maintainer="michael.sober@ymail.com"
LABEL version="1.0"
LABEL description="Dockerfile for the backend of the digital preservation exercise 1.2"

#Volume to store data on the filesystem
VOLUME /tmp

#Jar file, which should be copied to the container
ARG JAR_FILE="backend-0.0.1-SNAPSHOT.jar"

# Copy the monitoring app into the container
COPY ./build/libs/${JAR_FILE} backend.jar

# Expose the port 8080 outside of the container
EXPOSE 8080

#Run this on container startup
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/backend.jar"]