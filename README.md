# お喋り

(oshaberi: to chat)

a forum app built with React Typescript, Go and PostGreSQL

## Installation

clone and navigate to this repo.

use the docker-compose.yml file to set up the database:

```bash
docker compose up --build
```

install and run [air](https://github.com/air-verse/air) to launch the server at http://localhost:8080

navigate to client folder and install dependencies:

```bash
cd client
yarn install
```

lastly launch the client at http://localhost:5173 using:

```bash
yarn dev
```
