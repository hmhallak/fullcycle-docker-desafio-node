const express = require('express');
const mysql = require('mysql')
const peopleNames = require('people-names')

const app = express();

const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config)

const createTable = "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL);"
connection.query(createTable)

app.get('/', async (_,res) => {
  const connection = mysql.createConnection(config)

  const name = peopleNames.allRandomEn()

  const insert = `INSERT INTO people(name) VALUES ('${name}');`
  connection.query(insert)

  const selectPeople = "SELECT * FROM people;"
  
  const people = await new Promise(function(resolve, reject) {
    connection.query(selectPeople, function(error, result, fields) {
      if(error) {
        reject(error)
      }

      resolve(result)
    })
  })

  connection.end()

  console.log({ people })

  res.send(`
    <p>Full Cycle Rocks!</p>
    ${people.map(p => (
      `<p>- ${p.name}</p>`
    )).join('')}
  `)
})

app.listen(port, () => {
  console.log("Rodando na porta "+port)
})