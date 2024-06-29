// server.js
const express = require('express');
const app = express();
const port = 3500;
const db = require('./db');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pdshukla'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route for the home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route with a parameter
app.get('/user/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

// Route to handle POST requests
app.post('/data', (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
});

// Route to add a new data
app.post('/add', (req, res) => {
    const { clientName, emailId, suitNo, suitStage, respondent, advocateName, dateOfFile, nextDate } = req.body;
    if (!clientName || !emailId) {
      res.status(400).send('Bad Request: clientName and emailId are required');
      return;
    }
  
    const query = 'INSERT INTO suits (clientName, emailId, suitNo, suitStage, respondent, advocateName, dateOfFile, nextDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [clientName, emailId, suitNo, suitStage, respondent, advocateName, dateOfFile, nextDate], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        //   res.status(201).send(`User added with ID: ${result.insertId}`);
        res.status(201).send({
            code: 200,
            msg: "data saved successfully"
        })
    });
});

app.get('/list', (req, res) => {
    db.query('SELECT * FROM suits', (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// ------------------------- CRON JOB -------------------------- //

const cron = require('node-cron');

// Schedule a task to run every day at 10:00 AM
cron.schedule('0 10 * * *', () => {
  console.log('Task is running every day at 10:00 AM');
  // Add your task logic here
  
  nextDateUser();
});

// ------------------------------ END CRON JOB ---------------------------

function nextDateUser(){

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  const towDayIncrease = Number(day)+3;
  const formattedDate = `${year}-${month}-${towDayIncrease}`;
  console.log(formattedDate); // Outputs: '2024-06-21'

  db.query('SELECT * FROM suits WHERE nextDate = ?', [formattedDate], (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      // res.status(500).send('Internal Server Error');
      return;
    }
    var mailList = results;
    console.log("-----results---emailId:-->",results[0].emailId);
    for(var i=0; i<mailList.length; i++){
      let userDetail = mailList[i];
      sendMail(userDetail.clientName, userDetail.emailId, userDetail.nextDate)
    }
    // res.json(results);
  });
}

function sendMail(recName, recMail, nextDate){

  const nodemailer = require('nodemailer');

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Your email address
      pass: 'your-email-password'   // Your email password (consider using environment variables or OAuth2 for better security)
    }
  });
  
  // Set up email data
  const mailOptions = {
    from: 'your-email@gmail.com',         // Sender address
    to: recMail,    // List of recipients
    subject: 'Your next hearing date is'+nextDate,        // Subject line
    text: 'Hello '+recName,                 // Plain text body
    html: `<b>Hello ${recName}</b>`           // HTML body
  };
  
  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  

}

nextDateUser();