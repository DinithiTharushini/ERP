# ERP Backend

Spring Boot 3 (Java 17) backend for the ERP app.

## Prerequisites

- Java 17+ (`java -version`)
- Maven 3.9+ (`mvn -v`)

## Run locally

```bash
cd backend
mvn spring-boot:run
```

App will start on http://localhost:8080

Health check:

```bash
curl http://localhost:8080/api/health
```

## Build jar

```bash
mvn clean package
java -jar target/erp-backend-0.0.1-SNAPSHOT.jar
```
