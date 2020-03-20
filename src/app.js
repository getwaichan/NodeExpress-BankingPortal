const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded,  { extended: true} );


let accountData="";
accountData=fs.readFileSync(path.join(process.cwd(),'./src/json/accounts.json'), 'utf8', 
    ( err, accountData ) => {
    if (err) throw err;
    console.log(accountData);    
}).toString();

let accounts = JSON.parse(accountData);
// console.log(accountData);

let userData="";
userData=fs.readFileSync(path.join(process.cwd(),'src/json/users.json'),'UTF8', (err, userData) => {
    if (err) throw err;
    console.log(userData);    
}).toString();
let users = JSON.parse(userData);
// console.log(users);

app.get('/', (req,res) => res.render( 'index', { title: 'Account Summary', accounts: accounts } ));
app.get('/savings', (req,res) => res.render( 'account', { account: accounts.savings }));
app.get('/checking', (req,res) => res.render( 'account', { account: accounts.checking }));
app.get('/credit', (req,res) => res.render( 'account', { account: accounts.credit }));
app.get('/profile', (req,res) => res.render('profile', { user: users[0] }));
app.get('/transfer', (req,res) => res.render('transfer'));
app.post('/transfer', (req,res) => res.render('transfer',
        accoubts[req.body.to].balance = accounts[req.body.from].balance.parseInt() - req.body.amount.parseInt() 
));

app.listen(3000, () => console.log('PS Project Running on port 3000!'));
