const mysql = require('mysql2/promise');
require('dotenv').config();

// Connect to the MySQL database
const cnx = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  //port: 3306, // Change this to the actual port if it's different
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

(async () => {
  const [results] = await cnx.execute('SELECT 1 + 1 AS solution');
  console.log('Connection to DB is successful and answer to query is : ', results[0].solution);
})();


// Define the authentication middleware
// const authenticate = (req, res, next) => {
//   try {
//     const api_key = req.headers.authorization.replace("Bearer ", "");
//     cnx.query("SELECT * FROM voters WHERE voter_id = ?", [api_key], (err, result) => {
//       if (err) throw err;
//       if (result.length === 0) {
//         res.status(401).json({ detail: "Forbidden" });
//       } else {
//         next();
//       }
//     });
//   } catch {
//     res.status(401).json({ detail: "Forbidden" });
//   }
// };

// Define the POST endpoint for login
// app.get("/login", authenticate, (req, res) => {
//   const voter_id = req.query.voter_id;
//   const password = req.query.password;
//   getRole(voter_id, password)
//     .then(role => {
//       const token = jwt.sign({ password, voter_id, role }, process.env.SECRET_KEY, { algorithm: 'HS256' });
//       res.json({ token, role });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(401).json({ detail: "Invalid voter id or password" });
//     });
// });

// Replace 'admin' with the actual role based on authentication
// const getRole = (voter_id, password) => {
//   return new Promise((resolve, reject) => {
//     cnx.query("SELECT role FROM voters WHERE voter_id = ? AND password = ?", [voter_id, password], (err, result) => {
//       if (err) {
//         console.error(err);
//         reject("Database error");
//       } else if (result.length > 0) {
//         resolve(result[0].role);
//       } else {
//         reject("Invalid voter id or password");
//       }
//     });
//   });
// };

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = cnx;