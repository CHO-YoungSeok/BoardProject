const exrpess = require('express');
const app = exrpess();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

let db_info = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    database: "board"
};
let db_table = "contents";
const mysql = require('mysql2');
let conn = mysql.createConnection(db_info);
conn.connect;

app.listen(port, ()=> {
    console.log(`${port} 에서 대기중...`);
})

app.get('/', (req, res) => {
    res.render('main');
})
app.get('/center', (req, res) => {
    res.render('center');
})
app.get('/footer', (req, res) => {
    res.render('footer');
})
app.get('/list', (req, res) => {
    let sql = `SELECT * FROM ${db_table} ORDERBY no DESC`;
    conn.query(sql, (err, result) => {
        if(err) {
            console.log("ERROR: query is not excute from list\n" + err );
        }
        else {
            res.render('list', {data:result});
        }
    })
})
