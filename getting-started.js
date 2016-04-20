(function(){
    
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');
  
  mongoose.connect('mongodb://localhost/csv');
  
  const Schema = mongoose.Schema;
  
  const csvSchema = Schema({
    name    : String,
    text     : String
  });
  
  const CSV  = mongoose.model('CSV', csvSchema);
  
  let file1 = new CSV({ name: 'file1', text: 'hola,esto, es ,prueba' });
  let error = file1.validateSync();
  console.log(error);
  
  file1.save(function (err, file1) {
    if (err) return console.error(err);
  });
})();