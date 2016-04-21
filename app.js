"use strict";

const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const CSV = require('./models/mongoCSV.js');


app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {
  response.render('index', { title: 'CSV_AA' });
});

app.get('/csv', (request, response) => {
  response.send({ "rows": calculate(request.query.input) });
});

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});

// Supongamos que se visita con GET la ruta /mongo/input1
app.get('/models/:ejemplo', function(req, res) {
  console.log(req.params.ejemplo); /* input1 */
  /* ... Consultar la base de datos y retornar contenidos de input1 ... */
});

app.get('/mongo/:variable', function(req, res) {
    //console.log('valor req.params: ' + req.params.variable);
    //console.log('Valor req:' + req.query.text);
    CSV.find({}, function(err, files) {
        if (err)
            return err;
        if (files.length > 3) {
            CSV.find({name: files[3].name}).remove().exec();
            
            /*let newCSV = new CSV({name: req.params.variable, text: req.query.text});
            newCSV.save(function(err){ 
              if(err) resp.send('ERROR!');
              res.send('SUCCESS!');
              console.log("Elemento guardado con éxito.")
            });*/
        }
            let newCSV = new CSV({name: req.params.variable, text: req.query.text});
            newCSV.save(function(err){ 
              if(err) resp.send('ERROR!');
              res.send('SUCCESS!');
              console.log("Elemento guardado con éxito.")
            });
    });
});