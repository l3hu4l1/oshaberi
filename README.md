# お喋り

(oshaberi: to chat)

a forum app built with React Typescript, Go and PostGreSQL

## Installation

clone and navigate to this repo.

use the docker-compose.yml file to open a database env:

```bash
docker compose up --build
```

initialise database:
```bash
make migrate-up
```

install dependencies from go.mod file:
```bash
go mod download
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

(APIs can be tried at localhost:8080/v1/swagger/index.html)
<img width="800" alt="swagger" src="https://github.com/user-attachments/assets/acfde2f7-aecf-45e7-bcad-0077c7824fd5" />
