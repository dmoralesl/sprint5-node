import express from 'express'
import bodyParser from 'body-parser'

// import authenticateJWT from "../src/middlewares/jwtAuth.js";
// import unless from "../src/helpers/unless.js";

const server = express()

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
// server.use(unless('/api/login', authenticateJWT));

server.get('/', (req: any, res) => {
  res.send('Hello World!')
})

server.listen(3000, () => {
  console.log(`App running `)
})
