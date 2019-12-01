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
const bcrypt = require('bcrypt');
const multer = require('multer');

const userInfo = require('./userInfo.json');

const app = express();

initializePassport(passport,
  email => fetchUserInfo(email),
  id => fetchUserInfoById(id)
)

const port = process.env.PORT || 8000
const root = require('path').join(__dirname, 'client', 'build')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret:'KoXokie12Sec?ret!',
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:1*24*60*60*1000,
  }
}));
app.use(pino)
app.use(passport.initialize());
app.use(passport.session());
app.use('./images', express.static(path.join(__dirname, './images')));
app.use(express.static(root));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images/');
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
})

const fileFilter = (req, file, callback) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, itemValidations(req.body));
  } else callback(null, false);
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

app.get('/test_route', (request, response) => {
  console.log(request.user)
  if(request.isAuthenticated()) {
    console.log('User is authenticated')
  }
  else {
    console.log("user not authenticated")
  }
  const name = request.query.name || 'No Name';
  return response.json({message: 'Updated state message'})
});

app.get('/checkAuthentication', (request, response) => {
  if(checkAuthentication(request)) {
    return response.json({success: 1, message: 'User is authenticated'});
  }
  return response.json({success: 0, message:'User not authenticated'});
})


app.post('/processLogin', (request, response, next) => {
  passport.authenticate('local', function(error, user, info) {
    if(error) return next(error)
    if(!user) return response.json({success: 0, message: 'Login unsuccessful'})
    request.login(user, function(error) {
      if(error) return next(error);
      return response.json({success: 1, message: 'Login successful', id: user.id})
    })
  })(request, response, next);
})

app.get('/fetchMenu', (request, response) => {
  jsonReader('./menu.json', (data) => {
    if(data === false) {
      return response.json({success: 0, message: "Error reading file"})
    }
    return response.json({success: 1, message: 'Successfully fetched data', menu: data});
  })
});

app.post('/addItem', upload.single('image'), (request, response) => {
  if(!checkAuthentication(request)) {
    return response.json({success: -1, message: 'User not authorized to perform this action'});
  }

  jsonReader('./menu.json', (data) => {
    data[request.body['name']] = {
      price: request.body['price'],
      description: request.body['description'],
      imagePath: request.file.filename
    }
    fs.writeFile('./menu.json', JSON.stringify(data, null, 2), (err) => {
      if(err){
        return response.json({success: 0, message: 'Error writing to new item to storage.'})
      }
      else return response.json({success: 1, message: 'Successfully added item to menu'});
    })
  })
})

app.get('/fetchImage/:imagePath', (request, response) => {
  var imagePath = request.params.imagePath;
  const sendPath = path.join(__dirname, `./images/${imagePath}`)
  return response.sendFile(sendPath, (err) => {
    if(err){
      console.log("There was an error. This file does not exist.");
    }
  })
})

app.post('/editItem/withoutImage/:originalName', (request, response) => {
  const originalName = request.params.originalName;
  console.log("originalName:", originalName)
  if(!checkAuthentication(request)) {
    return response.json({success: -1, message: 'User not authorized to perform this action'});
  }

  jsonReader('./menu.json', (data) => {
    if(!(originalName in data))
      return response.json({success: 0, message: 'Item not in menu.'})
    const information = request.body;

    if(information.name === originalName) {
      data[originalName].description = information.description;
      data[originalName].price = information.price;
    } else {
      const imagePath = data[originalName].imagePath;
      delete data[originalName];
      data[information.name] = {
        price: information.price,
        description: information.description,
        imagePath: imagePath
      }
    }

    fs.writeFile('./menu.json', JSON.stringify(data, null, 2), (err) => {
      if(err){
        return response.json({success: 0, message: 'Error writing to edited to storage.'})
      }
      else return response.json({success: 1, message: `Successfully edited ${originalName} from menu`, item: originalName});
    });
  })
})

app.post('/editItem/withImage/:originalName', upload.single('image'), (request, response) => {
  const originalName = request.params.originalName;
  console.log("originalName:", originalName)
  if(!checkAuthentication(request)) {
    return response.json({success: -1, message: 'User not authorized to perform this action'});
  }

  jsonReader('./menu.json', (data) => {
    if(!(originalName in data))
      return response.json({success: 0, message: 'Item not in menu.'})
    const information = request.body;

    const originalImagePath = data[originalName].imagePath;
    fs.unlink(`./images/${originalImagePath}`, (err) => {
      if(err) {
        console.log("Error deleting file", originalImagePath)
      }
    })
    if(information.name === originalName) {
      data[originalName].description = information.description;
      data[originalName].price = information.price;
      data[originalName].imagePath = request.file.filename;

    } else {
      delete data[originalName];
      data[information.name] = {
        price: information.price,
        description: information.description,
        imagePath: request.file.filename
      }
    }
    fs.writeFile('./menu.json', JSON.stringify(data, null, 2), (err) => {
      if(err){
        return response.json({success: 0, message: 'Error writing to edited to storage.'})
      }
      else return response.json({success: 1, message: `Successfully edited ${originalName} from menu`, item: originalName});
    });
  })
});


app.post('/removeItem', (request, response) => {
  if(!checkAuthentication(request)) {
    return response.json({success: -1, message: 'User not authorized to perform this action'});
  }

  jsonReader('./menu.json', (data) => {
    if(!(request.body.name in data)) {
      return response.json({success: 0, message: 'Item not in menu.'})
    }
    const imagePath = data[request.body.name].imagePath;

    fs.unlink(`./images/${imagePath}`, (err) => {
      if(err) {
        console.log("Error deleting file", originalImagePath)
      }
    })

    delete data[request.body.name];
    fs.writeFile('./menu.json', JSON.stringify(data, null, 2), (err) => {
      if(err){
        return response.json({success: 0, message: 'Error writing to new item to storage.'})
      }
      else return response.json({success: 1, message: 'Successfully removed item from menu', item: request.body.name});
    })
  })
})

app.get("*", (request, response) => {
    response.sendFile('index.html', { root });
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
  if(username !== userInfo.username) return false;
  return userInfo;
}

function fetchUserInfoById(id) {
  if(id !== userInfo.id) return false;
  return userInfo;
}

function checkAuthentication(request) {
  if(request.isAuthenticated() && request.user.id === userInfo.id) {
    return true;
  } 
  return false;
}

function itemValidations(fields) {
  if(fields.name === '' || fields.price === '' || fields.description === '')
    return false
  jsonReader('./menu.json', (data) => {
    if(fields.name in data) return false
  });
  return true;
}

function hashPassword(input) {
  bcrypt.hash(input, 10, (err, hash) => {
    if(err) {
      console.log("Error")
      return err;
    }
    console.log("HashedPW:", hash)
    return hash
  })
}

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}`)
})
