# Jest-Docker-Setup Project

This project demonstrates a Node.js testing environment with Jest, fully containerized using Docker. It includes a setup to automate dependency installation and testing, making it portable and easy to run in any environment. 

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running Tests](#running-tests)
- [About Jest](#about-jest)
  - [Jest Functions Used](#jest-functions-used)
  - [Further Reading on Jest](#further-reading-on-jest)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project automates the testing process for a Node.js application using Jest as the testing framework. Docker is configured to ensure dependencies are consistently managed across different environments, which helps avoid "works on my machine" issues. The containerized setup is especially helpful for CI/CD pipelines or for developers who want a hassle-free testing environment setup.

## Features

- **Automated Testing**: Utilizes Jest for unit tests and integration tests.
- **Containerized Setup**: All dependencies are installed in a Docker container, making the setup consistent and portable.
- **Easy Setup**: Minimal setup required for users; clone the repository, build the Docker image, and start testing.

## Project Structure

- **Dockerfile**: Configures the Docker image for this project, installs dependencies, and sets up Jest.
- **`jest.config.js`**: Configures Jest options, such as testing environment, coverage reports, and verbose output.
- **Test Files**: Located in the root directory, each test file targets a specific function, testing it for a range of possible inputs.

## Setup and Installation

Follow the steps below to get the project set up on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Node.js](https://nodejs.org/) installed, if you prefer running Jest without Docker.

### Installation

1. **Clone the repository**:
   ```bash
   git clone [Unit testing Using JEST](https://github.com/ZainabEman/Unit-Testing-Using-JEST-Framework.git)
   cd jest-docker-setup
## Run the Docker Container

Run the container with the command below:

bash

Copy code

`docker run -it --rm jest-project`

## Install Dependencies Manually (if Running Outside Docker)

If you’re running the project outside of Docker, install dependencies with:

bash

Copy code

`npm install`

## Running Tests

You can run tests in two ways: within the Docker container or directly using Jest on your machine.

### Running Tests in Docker

To run all Jest tests in Docker, use:

bash

Copy code

`docker run -it --rm jest-project npx jest`

### Running Tests Locally

If you installed dependencies locally (without Docker), run:

bash

Copy code

`npx jest`

## About Jest

[Jest](https://jestjs.io/) is a popular JavaScript testing framework developed by Facebook. It’s designed with simplicity and zero-configuration testing in mind, providing functions like `test`, `expect`, and `describe` to structure and evaluate tests efficiently.

### Jest Functions Used

- **`describe`**: Groups related tests for a function.
- **`test`**: Defines individual test cases.
- **`expect`**: Creates assertions to validate results against expected outcomes.
- **Matchers**: Jest provides built-in matchers like `toBe`, `toEqual`, and `toThrow` for common assertions.

### Further Reading on Jest

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- Jest CLI Options
- Using Matchers in Jest

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---
