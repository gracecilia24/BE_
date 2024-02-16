const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

const users = [
    {
        id: 1,
        name: "John",
    },
    {
        id: 2,
        name: "Smith",
    },
    {
        id: 3,
        name: "Bob",
    },
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:name', (req, res) => {
    const { name } = req.params;
    const user = users.find(user => user.name.toLowerCase() === name.toLowerCase());
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            status: "error",
            message: "Data user tidak ditemukan",
        });
    }
});

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Resource tidak ditemukan",
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan pada server",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});