const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const port = 4000;

function getToken(username, password, callback) {
    const curlCommand = `curl -X POST \
      'http://localhost:3000/api/session' \
      --header 'Content-Type: application/json' \
      --data-raw '{
        "username": "${username}",
        "password": "${password}",
        "remember": true
      }'`;

    exec(curlCommand, (error, stdout, stderr) => {
        if (error) {
            callback(`Erro: ${error.message}`, null);
            return;
        }

        console.log(`Executado com sucesso: ${stdout}`);

        callback(null, stdout);
    });
}

app.use(bodyParser.json())

app.use(cors());

app.post('/execute', (req, res) => {

    getToken(req.body.username, req.body.password, (error, output) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(output);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
