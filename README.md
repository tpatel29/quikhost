# Quikhost - Quickly Host Any Docker Image

Quikhost is a command-line tool that simplifies the process of hosting Docker images with Traefik configuration. It helps you set up Traefik reverse proxy, Docker Compose files, and more, making it easier to deploy your Docker services with minimal effort.

## Installation

To use Quikhost, you need to have Node.js installed on your system. You can install Quikhost globally using npm.

## Usage

Quikhost provides two main commands: `init` and `docker`.

### Initialize Traefik Configuration

To set up a folder with Traefik configuration files, use the `init` command. This command will create a folder named "traefik" and generate the following configuration files:

```bash
quikhost init
```

- `Dockerfile`: A sample Dockerfile for your web service.
- `docker-compose.yml`: Docker Compose configuration for your service.
- `traefik.yml`: Traefik configuration for routing and HTTPS support.

You will be prompted to enter your email and website name during the initialization process.

### Host a Docker Image

To host a Docker image using Quikhost, use the `docker` command. You will be prompted to provide the following information:

```bash
quikhost docker
```
- `service`: The name of your service.
- `website`: The website name with a subdomain (e.g., subdomain.example.com).
- `port`: The port your service listens on.

This command will create a folder with the specified service name and generate a Docker Compose configuration tailored to your service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
