Got it. I've updated the README file accordingly:

```markdown
# Distributed Blog CMS

This repository contains the source code for a distributed Blog CMS developed using Node.js, Express.js, MongoDB, and related technologies.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Build and Run](#build-and-run)

## Installation

Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/distributed-blog-cms.git
    ```

2. Navigate to the project directory:

    ```bash
    cd distributed-blog-cms
    ```

3. Create a `.env` file in the root directory and configure your environment variables. You can use the provided `.env.example` as a template:

    ```bash
    cp .env.example .env
    ```

    Update the values in the `.env` file as needed.

4. Build the frontend:

    ```bash
    cd distributed-blogcms-frontend
    npm install
    npm run build
    ```

5. Build the backend:

    ```bash
    cd ../distributed-blogcms-backend
    npm install
    tsc
    ```

## Build and Run

1. Move back to the root directory:

    ```bash
    cd ..
    ```

2. Build and run the Docker containers:

    ```bash
    docker-compose up --build
    ```

    To run in detached mode, add the `-d` option:

    ```bash
    docker-compose up --build -d
    ```

3. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the frontend and [http://localhost:8080](http://localhost:8080) for the backend.

### Stopping the Services

To stop the services:

```bash
docker-compose down
```

### Cleaning Up

To remove containers, networks, and volumes created by `docker-compose`:

```bash
docker-compose down -v
```

## Contributing

If you would like to contribute to the project, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
```
