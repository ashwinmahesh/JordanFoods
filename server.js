if(process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const path = require('path')
const pino = require('express-pino-logger')();
const fs = require('fs');
const initializePassport = require('./passport-config');
const passport = require('passport');

const app = express();

initializePassport(passport,
  email => fetchUserInfo(email)
)

const port = process.env.PORT || 8000

const testUsername = 'ashwin'
const testPassword = 'password'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:1*24*60*60*1000}
}));
app.use(pino)
app.use(passport.initialize());
app.use(passport.session());
// app.use('/dist', express.static(path.join(__dirname, './client/dist/')));

app.get('/test_route', (request, response) => {
  const name = request.query.name || 'No Name';
  return response.json({message: 'Updated state message'})
});

app.post('/processLogin', (request, response) => {
  const {username, password} = request.body;
  console.log(`Username: ${username}, Password: ${password}`)
  if(username != testUsername || password != testPassword) {
    return response.json({success: 0, message: 'Login unsuccessful'});
  }
  return response.json({success: 1, message: 'Login successful'});
})

app.get('/fetchMenu', (request, response) => {
  jsonReader('./menu.json', (data) => {
    if(data === false) {
      return response.json({success: 0, message: "Error reading file"})
    }
    console.log(data);
    return response.json({success: 1, message: 'Successfully fetched data', menu: data});
  })
});

app.post('/editMenu', (request, response) => {
  const menuItem = request.body.item;
  //Authenticate
})

//Helper functions
function jsonReader(filePath, callback) {
  fs.readFile(filePath, (error, fileData) => {
    if(error) {
      console.log(`Error: ${error}`)
      return callback(false);
    }
    try {
      const parsedData = JSON.parse(fileData);
      return callback(parsedData)
    } catch {
      return callback(false);
    }
  })
}

function fetchUserInfo(username) {
  //Read from a file, hash PW
  if(username !== 'ashwin') {
    return false;
  }
  return {username: 'ashwin', password: 'password', id: 'abxDF1'}
}

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`)
})
