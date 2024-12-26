const exrpess = require('express');
const app = exrpess();
const port = 8000;
app.use(exrpess.json());
app.use(exrpess.urlencoded({extended:true}));
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
conn.connect();

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
    let sql = "SELECT * FROM contents";
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        else res.render('list', {data:result});
    })
})
app.get('/insert', (req, res)=> {
    res.render('insert');
})
app.post('/insert', (req, res) => {
    const {title, content} = req.body;
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const year = now.getFullYear();
    const hour = now.getHours() + 1;
    const minutes = now.getMinutes();
    const time = hour + "-" + minutes;
    let sql = "INSERT INTO contents (title, time, content) VALUES (" + title +", " + time + ", " + content + "); " ;
    conn.query(sql, (err, result) => {
        if(err) console.log(err);
        else {
            let msg= `<script type="text/javascript">`
            msg+= `alert("저장되었습니다");`;
            msg+= `window.location.href='/list';`;
            msg+= `</script>`
            res.send(msg);
        }
    })

})