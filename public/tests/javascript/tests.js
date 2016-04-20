var expect = chai.expect;

describe("Comma Separated Values (CSV) Tests", function(){
   describe("Comprobación de valores separados", function(){

      it("Los 3 elementos son correctos", function(){
         var r = calculate('"Esto",3,"2,3"');
         expect(r[0].value[0]).to.equal('Esto');
         expect(r[0].value[1]).to.equal('3');
//         expect(r[0].value[2]).to.equal('2,3');
      });
   });

   describe("Comprobación de dobles comillas", function(){
      it("El texto está en un bloque", function(){
         var r = calculate('"Esto va junto","Esto, también","5,45 = 5.45"');
         expect(r[0].value[0]).to.equal('Esto va junto');
      });
/*
      it("No separa por la coma", function(){
         var r = calculate('"Esto va junto","Esto, también","5,45 = 5.45"');
         expect(r[0].value[1]).to.equal('Esto, también');
         expect(r[0].value[2]).to.equal('5,45 = 5.45');
      });
*/
      it("Escapa las dobles comillas", function(){
         var r = calculate('"Esto sin comillas \\"y esto con\\" comillas"');
         expect(r[0].value[0]).to.equal('Esto sin comillas "y esto con" comillas');
      });
   });
   describe("Comprobación de texto sin comillas", function(){
      it("No separa por espacios", function(){
         var r = calculate('El número 3,5 lo puso separado');
         expect(r[0].value.length).to.equal(2);
      });
      it("Los 2 elementos son correctos", function(){
         var r = calculate('El número 3,5 lo puso separado');
         expect(r[0].value[0]).to.equal('El número 3');
         expect(r[0].value[1]).to.equal('5 lo puso separado');
      });
      it("Escapa las comas", function(){
         var r = calculate('El número 3\\,5 lo puso junto');
         expect(r[0].value.length).to.equal(1);
         expect(r[0].value[0]).to.equal('El número 3,5 lo puso junto');
      });
   });

});
