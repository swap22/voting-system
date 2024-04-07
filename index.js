const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cnx = require('./Database_API/main.js');

require('dotenv').config();

const app = express();
app.use(cors());


// Authorization middleware
const authorizeUser = (req, res, next) => {
  const token = req.query.Authorization;

  if (!token) {
    return res.status(401).send('<h1 align="center"> Login to Continue </h1>');
  }
  
  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ['HS256'] });

    req.user = decodedToken;
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
};


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/login.html'));
});
//login route
app.get('/login', async (req, res) => {
    try {
      const [rows] = await cnx.execute('SELECT voter_id, role, password FROM voters WHERE voter_id = ?', [req.query.voter_id]);
      if (rows.length === 1) {
        if(rows[0].password==req.query.password){
          const password=rows[0].password;
          const role =rows[0].role;
          const voterId = rows[0].voter_id;
          const token = jwt.sign({password, voterId, role }, process.env.SECRET_KEY, { algorithm: 'HS256' }, { expiresIn: '48h' });
          const response={role,token};
          return res.status(200).header("token", token).send({response});
        }else{
          return res.status(400).send("Wrong Password");
        }
      }else{
        return res.status(400).send("Voter is not present in list");
      }
      } catch (err) {
        console.log("error while connecting while database",err);  
        return res.status(500).send("Internal Server Error");
      }


});

app.get('/js/login.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/js/login.js'))
});

app.get('/css/login.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/css/login.css'))
});

app.get('/css/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/css/index.css'))
});

app.get('/css/admin.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/css/admin.css'))
});

app.get('/assets/eth5.jpg', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/assets/eth5.jpg'))
});

app.get('/js/app1.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/js/app1.js'))
});
app.get('/js/web3.min.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/js/web3.min.js'))
});
app.get('/js/truffle-contract.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/js/truffle-contract.js'))
});
app.get('/admin.html', authorizeUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/admin.html'));
});

app.get('/index.html', authorizeUser, (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

app.get('/dist/login.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/dist/login.bundle.js'));
});

app.get('/dist/app.bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/dist/app.bundle.js'));
});

// Serve the favicon.ico file
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/favicon.ico'));
// });

// Start the server
app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080/');
});
