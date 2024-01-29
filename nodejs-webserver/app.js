const express = require('express');
const app = express();
const port = 3000;

const homeText = "This is the home page";

app.get('/', (req, res) => {
    res.send(homeText);
});

app.get('/about', (req, res) => {
    const currentDate = new Date().toISOString();
    const membersData = require('./members');

    const responseData = {
        Status: "success",
        Message: "response success",
        Description: "Exercise 2",
        Date: currentDate,
        Data: membersData
    };

    res.json(responseData);
});

app.get('/users', async (req, res) => {
    try {
        const axios = require('axios');
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const usersData = response.data;

        res.json(usersData);
    }   catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});