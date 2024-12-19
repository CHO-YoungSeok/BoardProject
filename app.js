const exrpess = require('express');
const app = exrpess();
const port = 8000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, ()=> {
    console.log(port + "port watting....");
})

