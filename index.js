const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

let tasks = [
    {
        "name":"HackPrep Day 1",
        "index":0,
    },
    {
        "name":"HackPrep Day 2",
        "index":1,
    }
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/home', (req, res) => {
    res.render("home", {tasks: tasks});
});

app.post('/remove-item', (req, res) => {
    let index = req.body.index;
    console.log(index);
    tasks.splice(index, 1);
    console.log(tasks)
    res.send("removed");
});

app.post('/add-item', (req, res) => {
    let task = req.body.task;
    tasks.push({name: task});
    res.send("added");
});

app.use("/", (req, res)=>{
    res.send("Hello World");
});

app.listen(5000, () => {
    console.log("Server Listening on port 5000");
});