const express = require('express');
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const path = require('path')
const pino = require('express-pino-logger')();
const app = express();

const port = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret:'YouWillNotGuessThis',
  resave:true,
  saveUninitialized:true,
  cookie:{maxAge:1*24*60*60*1000}
}));
app.use(pino)
// app.use('/dist', express.static(path.join(__dirname, './client/dist/')));

app.get('/test_route', (request, response) => {
  const name = request.query.name || 'No Name';
  return response.json({message: 'Updated state message'})
})

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`)
})
