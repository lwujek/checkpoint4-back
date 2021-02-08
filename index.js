const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./databases/database');

const { SERVER_PORT, CLIENT_URL } = process.env;
const app = express();
app.use(
    cors({
        origin: CLIENT_URL,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (request, response) => {
    connection.query('SELECT * FROM participant', (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        if (result.lenght === 0) {
            response.sendStatus(404);
        } else {
            response.status(200).json(result);
        }
    });
});

app.post('/edit', (req, res) => {
    const { name, firstname, city } = req.body;
    connection.query(
        'INSERT INTO participant(name, firstname, city) VALUES(?, ?, ?)', [name, firstname, city],
        (err) => {
            if (err) {
                res.status(500).send('Participant non ajouté');
            } else {
                res.status(201).send('Le participant a bien été ajouté');
            }
        }
    );
});

app.get('/podium', (request, response) => {
    connection.query('SELECT * FROM participant ORDER BY points DESC LIMIT 3', (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        if (result.lenght === 0) {
            response.sendStatus(404);
        } else {
            response.status(200).json(result);
        }
    });
});

app.get('/triche', (request, response) => {
    connection.query(
        `SELECT * FROM participant col JOIN categorie cat ON col.categories_idcategories = cat.idcategories WHERE cat.name = "triche"`,
        (error, result) => {
            if (error) {
                response.status(500).send(error);
            }
            if (result.lenght === 0) {
                response.sendStatus(404);
            } else {
                response.status(200).json(result);
            }
        });
});

app.get('/charme', (request, response) => {
    connection.query(
        `SELECT * FROM participant col JOIN categorie cat ON col.categories_idcategories = cat.idcategories WHERE cat.name = "charme"`,
        (error, result) => {
            if (error) {
                response.status(500).send(error);
            }
            if (result.lenght === 0) {
                response.sendStatus(404);
            } else {
                response.status(200).json(result);
            }
        });
});

app.get('/velocite', (request, response) => {
    connection.query(
        `SELECT * FROM participant col JOIN categorie cat ON col.categories_idcategories = cat.idcategories WHERE cat.name = "vélocité"`,
        (error, result) => {
            if (error) {
                response.status(500).send(error);
            }
            if (result.lenght === 0) {
                response.sendStatus(404);
            } else {
                response.status(200).json(result);
            }
        });
});

app.get('/lourd', (request, response) => {
    connection.query(
        `SELECT * FROM participant col JOIN categorie cat ON col.categories_idcategories = cat.idcategories WHERE cat.name = "poids lourd"`,
        (error, result) => {
            if (error) {
                response.status(500).send(error);
            }
            if (result.lenght === 0) {
                response.sendStatus(404);
            } else {
                response.status(200).json(result);
            }
        });
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}.`);
});