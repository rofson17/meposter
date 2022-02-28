
# Me Poster

A simple wep application using MEARN. you can sing up, sing in , contact and post using this website.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE`

`AUTHOR_EMAIL`

`SMTP_EMAIL_ADRESS` `SMTP_EMAIL_PASSWORD`

`SECRECT_KEY`

## Run Locally

Clone the project

```bash
  git clone https://github.com/rofson17/meposter.git
```

set up your environment variables in `.env` file

Go to the project folder
```bash
    cd meposter
```


**Install dependencies for server**

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
*server will start at: http://localhost:5000/*

**Install dependencies for client**

```bash
  cd client
  npm install
```

start the client server
```bash
  npm start
```
*client server will start at: http://localhost:3000/*
