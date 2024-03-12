<div align="center">
    <img src="./img/bookolog.png" alt="Bookolog" width="300">
</div>

# Bookolog
A space for users to explore books, add them to their personal bookshelf, and effectively organize and track their book collection.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Docker installed on your machine.

### Installing

1. Clone the repository:

    ```bash
    git clone https://github.com/bishrulhaq/bookolog.git
    ```

2. Navigate to the project directory:

    ```bash
    cd bookolog
    ```

3. Build and start the containers:
    ```bash
    docker-compose up --build
    ```
4. Once the containers are up and running, migrate the database:
    ```bash
    docker-compose exec backend npm run migrate
    ```
## Running the tests
To run the tests, execute the following command:

```bash
docker-compose exec backend npm run test
``` 

## Deployment
To deploy this application, you can use any Docker-compatible hosting service. Ensure that you have Docker installed on the server, clone the repository, and follow the installation steps mentioned above.

#### Built With
1. Node.js - JavaScript runtime
2. NextJs - JavaScript library for building user interfaces
3. MariaDB - Open-source relational database
4. Docker - Containerization platform
5. Jest - JavaScript testing framework
6. EsLint - Linting utility for JavaScript
7. NextAuth - Authentication library for Next.js
8. Tailwind CSS - Utility-first CSS framework
9. Express - Web application framework for Node.js