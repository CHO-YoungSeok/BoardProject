const exrpess = require('express');
const app = exrpess();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


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

