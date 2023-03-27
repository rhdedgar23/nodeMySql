//npm init
//npm install --save mysql express

//bring express and mysql
const express= require('express');
const mysql= require('mysql');

//To start using mysql we'll need to make a connection
//It takes in a configuration object
const db= mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'nodemysqlDB'
});

//Connect
db.connect((err) => {
    if(err) throw err;
    console.log('MySQL connected...');
});

//Setup a simple express server
const app= express();

//Create DB
//we need to create a route with VARIABLE.get();
app.get('/createdb', (req, res) => {
    let sql= 'CREATE DATABASE nodemysqlDB';//put the query into a variable
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    });
});

//we create another route to create table
app.get('/createpoststable', (req, res) => {
    let sql= 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//another route to insert post 1
app.get('/addpost1', (req, res) => {
    let post= {title:'Post one', body:'This is post number one'};
    let sql= 'INSERT INTO posts SET ?';//the ? symbol is a placeholder for post data
    let query= db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...');
    });
});

//another route to insert post 2
app.get('/addpost2', (req, res) => {
    let post= {title:'Post two', body:'This is post number two'};
    let sql= 'INSERT INTO posts SET ?';//the ? symbol is a placeholder for post data
    let query= db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 2 added...');
    });
});

//Select posts
app.get('/getposts', (req, res) => {
    let sql= 'SELECT * FROM posts';
    let query= db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched');
    });
});

//Select single post
app.get('/getpost/:id', (req, res) => {//:id passes id as parameter
    let sql= `SELECT * FROM posts WHERE id = ${req.params.id}`;//use backticks instead of quotes; that allows us to put a variable in 
    let query= db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post fetched');
    });
});

//Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle= 'Updated Title';
    let sql= `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`; 
    let query= db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle= 'Updated Title';
    let sql= `DELETE FROM posts WHERE id = ${req.params.id}`; 
    let query= db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});

app.listen('3000', () => {//listen on port 3000, arrow function which indicates code to execute after the server starts
    console.log('Server started on port 3000');
});

//npm install -g nodemon
//-g == globally
//nodemon allows us to run our server but not have to restart it everytime we make a change
//when we enter localhost:3000 on a browser we'll get "Cannot GET /" message
//This is because we dont have any routes for our application
//We'll create routes so we can run certain queries, we wont have a UI

