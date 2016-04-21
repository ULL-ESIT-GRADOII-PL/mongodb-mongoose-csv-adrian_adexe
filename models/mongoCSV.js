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

  let input1 = new CSV({ name: 'input1', text: '"producto",           "precio"\n"camisa",             "4,3"\n"libro de O\"Reilly", "7,2"' });
  let input2 = new CSV({ name: 'input2', text: '"producto",           "precio"  "fecha"\n"camisa",             "4,3",    "14/01"\n"libro de O\"Reilly", "7,2"     "13/02"'})
  let input3 = new CSV({ name: 'input3', text: '"edad",  "sueldo",  "peso"\n,         "6000€",  "90Kg"\n47,       "3000€",  "100Kg"'})
  

  let p1 = input1.save(function (err, file1) {
    if (err) return console.error(err);
  });
  
  let p2 = input2.save(function (err, file1) {
    if (err) return console.error(err);
  });
  
  let p3 = input3.save(function (err, file1) {
    if (err) return console.error(err);
  });
  
  Promise.all([p1, p2, p3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));
    //mongoose.connection.close(); 
  });
  
  module.exports = CSV;
  
})();
