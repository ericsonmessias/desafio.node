const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'nodedb'
};

const mysql = require('mysql2');
const connection = mysql.createConnection(config);

// Lista de nomes para escolher aleatoriamente
const randomNames = ['Lebron James', 'Austin Reaves', 'Antony Davis', 'D`Angelo Russel', 'Rui Hachimura'];

// Função para escolher aleatoriamente um nome da lista
function getRandomName() {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    return randomNames[randomIndex];
}


app.get('/', (req, res) => {
    // Inserir nome aleatório no banco de dados
    const randomName = getRandomName();
    const sql = `INSERT INTO people (name) VALUES ('${randomName}')`;
    connection.query(sql)

    // Consulta os nomes na tabela 'people'
    connection.query('SELECT name FROM people', (error, results, fields) => {
        if (error) {
            // Em caso de erro, envie uma resposta de erro para o navegador
            res.status(500).send('Erro ao consultar o banco de dados.');
            throw error;
        }

        console.log('Resultados da consulta:', results); // Adiciona um log para verificar os resultados da consulta

        // Mapeie os resultados para extrair os nomes
        const names = results.map(result => result.name);

        console.log('Nomes recuperados:', names); // Adiciona um log para verificar os nomes recuperados

        // Cria uma lista HTML com os nomes
        const htmlResponse = `
            <h1>Full Cycle Rocks!!!</h1></br>
            <h2>Nomes:</h2>
            <ul>
                ${names.map(name => `<li>${name}</li>`).join('')}
            </ul>
        `;

        // Envie a resposta HTML para o navegador
        res.status(200).send(htmlResponse);
    });
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});