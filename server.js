const express = require('express');
const bodyParser = require('body-parser')
const expressSession = require('express-session');

const pino = require('express-pino-logger')();
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret:'YouWillNotGuessThis',
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:1*24*60*60*1000}
}));
app.use(pino)

app.get('/', (request, response) => {
  const name = request.query.name || 'No Name';
  return response.json({message: 'Updated state message'})
})

app.get('/login', (request, response) => {
  return response.json({success: 1, message: 'The test is successful'})
})

app.listen(8000, () => {
  console.log("Server is listening on Port 8000")
})

