# Project Setup Instructions for Windows

These instructions are valid for Windows. For Linux/Mac OS, the setup process might differ.

## 1. Clone the Project and Install Dependencies
To run the project locally, clone the repository and install the dependencies:
```bash
git clone https://github.com/Proph7000/exchange-rate-service.git
```

```bash
cd exchange-rate-service
```

```bash
npm i
```

Ensure that [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) is installed on your system.

Create a `.env` file from `example.env` in the root directory of your project.

## 2. Running the Project in a Docker Container
To run the project in a Docker container, follow these steps:

- Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/) from the official site.

- Build the Docker container:

```bash
npm run dev:docker:build
```

## 3. Run Database Migration
Run the migration to create the database with a test record:

```bash
npm run migrate
```

This will create a database named "subscribers" with one test record.

## 4. Access and Edit the Database
You can connect to the database at `mongodb://localhost:27018` using [MongoDB Compass](https://www.mongodb.com/products/tools/compass) to view and edit the data.

## 5. Start and Stop Docker Container
Use the following commands to start and stop the Docker container:

```bash
npm run dev:docker:start
```
```bash
npm run dev:docker:stop
```

## 6. Running the Project Locally Without Docker
If you prefer to run the project locally without Docker, skip steps 2-5 and follow these instructions:

- Change the database address for migration in the `migrate-mongo-config.js` file from `mongodb://localhost:27018` to `mongodb://localhost:27017`.

- Run the migration:
```bash
npm run migrate
```

- When connecting with MongoDB Compass, change the address from `mongodb://localhost:27018` to `mongodb://localhost:27017`.

## API Endpoints
You can send requests locally to `http://localhost:3000/api`:

- GET `/rate`: Retrieve the current exchange rate.
- POST `/subscribe`: Subscribe with a required parameter `email`. Email validation is implemented using the yup library.


### To test the email sending service, you can use [mailtrap.io](https://mailtrap.io/):

##### 1. Sign up: 
Register for an account on Mailtrap.

##### 2. Start testing:
On the home page, click the "Start testing" button.

##### 3. Show credentials:
Click on "Show credentials" to reveal the SMTP settings.

##### 4. Update .env file:
In your `.env` file, update the following variables with the corresponding SMTP values from Mailtrap:

```bash
EMAIL=${Host}
EMAIL_PASSWORD=${Password}
EMAIL_HOST=${Username}
```
