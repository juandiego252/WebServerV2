// const app = require('./server.js')
//Carga las variablaes de entono
require('dotenv').config();
const { connect } = require('moongose')
const connection = require('./database.js')
const app = require('./server.js')
connection()


app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}`);
})


