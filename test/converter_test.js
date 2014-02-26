var converter = require('../routes/converter');
var expect = require('expect.js');

describe('converter.js',function(){
/* 
	describe('currencyreader',function(){
		it('reads the contents of the file',function(done) {
			converter.currencyreader(function(err,filecontent1){
				expect(filecontent1.length).to.be.greaterThan(0);
				
			});
			done();
		});
	}); */
	describe('asyncparallelresult',function(){
		it('Expect it to be an array',function(done) {
			converter.asyncparallelresult(function(result){
				expect(result).to.be.an('array');
				
			});
			done();
		});
		
	});
});