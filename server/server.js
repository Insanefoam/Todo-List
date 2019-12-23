const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

var dbConnection = pgp("postgres://tgqjeimi:UtqC93HviX_t-iTL7RDcQUVcRwayt5AM@rajje.db.elephantsql.com:5432/tgqjeimi");

app.listen(3000, function(){
    console.log("Listen on port " + "http://localhost:3000");
})

app.get('/', function(req, res){
    dbConnection.any("SELECT * FROM TODOES")
    .then(function (data) {
        res.send(data);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});

app.post('/add_new_todo', function(req, res){
    dbConnection.none("INSERT INTO TODOES VALUES(${todo_text})", {todo_text : req.body.todo_text})
    .then(function (data) {
        res.send("OK");
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
}); 

app.post('/delete_an_todo', function(req, res){
    dbConnection.none("DELETE FROM TODOES WHERE TODO_TEXT = ${todo_text}", {todo_text : req.body.todo_text})
    .then(function (data) {
        res.send("OK");
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
});