# Todo Backend - Instalation and Exec guide

Heres the step by step guide on how to run the backend for the todos app:

## Pré-requisitos

-   Node.js (v20+)
-   npm
-   Docker and Docker Compose

### 1. Clone repo

```bash
git clone https://github.com/seu-usuario/backend-todo-app.git
cd backend-todo-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure enviroment variables

Copy .env.example

```bash
cp .env.example .env
```

Open the .env file and set the information of your database and jwt

### 4. Configure Docker and Data Base

a. run container:

```bash
docker-compose up -d
```

b. Verify if is running:

```bash
docker-compose ps
```

b. run the migrations with typeORM:

```bash
npm run migration:run
```

c. Running the app:

```bash
npm start
```

#### App access at:

```bash
http://localhost:3000
```

### 5. Useful commands

Stop all containers

```bash
docker-compose down
```

Rebuild

```bash
docker-compose up -d --build
```
