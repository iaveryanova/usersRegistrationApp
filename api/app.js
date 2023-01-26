const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const mysql_async = require('mysql2/promise');
const bodyParser = require('body-parser');
const config = require("./config");
const cookieParser = require('cookie-parser');
var crypto = require('crypto');

const app = express();
const port = 3020;

const cookie_options = {
    maxAge: 1000 * 60 * 30,
    httpOnly: false,
    secure: false // http
}

app.use(cors({
    origin: "http://io-dev.avehub.ml",
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/api/users', async (req, res) => {
    let token = req.cookies['token'];
    if(token){
        let connection = await mysql_async.createConnection(config);
        const [rows, fields] = await connection.query('select id from users where token=? and status = 1',
            [token]);
        connection.end();
        if (rows.length > 0) {
            connection = await mysql_async.createConnection(config);
            connection.connect();
            const [rows1, fields] = await connection.query('select * from users');
            connection.end();
            res.send(rows1);
            return;
        }
        else{
            res.clearCookie('token');
        }
    }
    res.sendStatus(403);
    return;
});

app.post('/api/register', function (req, res) {
    let connection = mysql.createConnection(config);
    connection.connect();

        let query = `INSERT INTO users
        (id, firstname, lastname, email, login, password, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;

        let hash_password = crypto.createHash('md5').update(req.body.password).digest('hex');

        connection.query(query, [
            null,
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.login,
            hash_password,
            new Date()
        ], (err, rows) => {
            if (err) throw err;
        });
    connection.end();
    res.status(200).json({ message: 'Register successfully'});
    return;
});

app.post('/api/login', async (req, res) => {

    let connection = await mysql_async.createConnection(config);
    let hash_password = crypto.createHash('md5').update(req.body.password).digest('hex');
    const [rows, fields] = await connection.execute('select * from users where status=1 and login=? and password=?',
        [req.body.login, hash_password]);
    connection.end();
    if (rows.length > 0) {
        connection = await mysql_async.createConnection(config);
        let user_data = rows[0];
        let generate_token = crypto.createHash('md5').update(new Date().toLocaleString() + JSON.stringify(user_data)).digest('hex');

        const [rows2, fields] = await connection.execute('update users set last_login=?, token=? where id=?',
            [new Date(), generate_token, user_data.id]);

        if (rows2.affectedRows > 0) {
            res.cookie('token', generate_token, cookie_options);
            res.status(200).json({ message: 'Login successfully'});
        } else {
            res.status(400).json({ message: 'Not update'});
        }
    } else {
        res.sendStatus(404);
    }
    return;
})

app.post('/api/block-user', async (req, res) => {
    let ids = req.body;
    let token = req.cookies['token'];
    const result = await setStatusUsers(token, 0, ids);
    if(result.result){
        if(result.clearCookie){
            res.clearCookie('token');
        }
        else{
            res.cookie('token', token, cookie_options);
        }
        res.status(200).json({ message: 'Block successfully users', ids: ids });
    }
    else{
        res.clearCookie('token');
        res.status(403).json({ message: 'Forbidden' });
    }

    return;
})

app.post('/api/activate-user', async (req, res) => {
    let ids = req.body;
    let token = req.cookies['token'];
    const result = await setStatusUsers(token, 1, ids);
    if(result.result){
        if(result.clearCookie){
            res.clearCookie('token');
        }
        else{
            res.cookie('token', token, cookie_options);
        }
        res.status(200).json({ message: 'Activate users successfully', ids: ids });

    }
    else{
        res.clearCookie('token');
        res.status(403).json({ message: 'Forbidden' });
    }

    return;
})

app.post('/api/delete-user', async (req, res) => {
    let ids = req.body;
    let token = req.cookies['token'];
    const result = await deleteUsers(token, ids);
    if(result.result){
        if(result.clearCookie){
            res.clearCookie('token');
        }
        else{
            res.cookie('token', token, cookie_options);
        }
        res.status(200).json({ message: 'Activate users successfully', ids: ids });

    }
    else{
        res.clearCookie('token');
        res.status(403).json({ message: 'Forbidden' });
    }

    return;
})

app.post('/api/logout', async (req, res) => {
    let token = req.cookies['token'];
    if(token){
        let connection = await mysql_async.createConnection(config);
        const [rows, fields] = await connection.execute('update users set token=NULL where token=?;',
            [token]);
        connection.end();
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout' });
    }

    return;
})


setStatusUsers = async(token, active, ids) => {
    if(token){
        let connection = await mysql_async.createConnection(config);
        const [rows1, fields] = await connection.query('select id from users where token=? and status = 1',
            [token]);
        connection.end();
        if (rows1.length > 0) {
            let id = rows1[0].id;
            let clearCookie = false;
            if(active === 0 && ids.includes(id)){
                clearCookie = true;
            }
            ids = ids.join(',');
            let connection = await mysql_async.createConnection(config);
            const [rows, fields] = await connection.execute('update users set status=? where id in ('+ ids +');',
                [active]);
            connection.end();
            return {result: true, clearCookie: clearCookie};
        }

    }
    return {result: false};
}

deleteUsers = async(token, ids) => {
    if(token){
        let connection = await mysql_async.createConnection(config);
        const [rows1, fields] = await connection.query('select id from users where token=? and status = 1',
            [token]);
        connection.end();
        if (rows1.length > 0) {
            let id = rows1[0].id;
            let clearCookie = false;
            if(ids.includes(id)){
                clearCookie = true;
            }
            ids = ids.join(',');
            let connection = await mysql_async.createConnection(config);
            const [rows, fields] = await connection.execute('delete from users where id in ('+ ids +')');
            connection.end();

            return {result: true, clearCookie: clearCookie};
        }

    }
    return {result: false};
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});