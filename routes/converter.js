var fs = require("fs");
var http = require('http');
var request = require("request");
var async = require("async")
var fs = require("fs");


 exports.currency = function(req, res) {
    
	  exports.currencyreader(function (rdata){
			var symbols = [];
		  data = JSON.parse(rdata);
		  for (var prop in data) {
		  
			if (data.hasOwnProperty(prop)) {
				var row = {};
				row['key'] = prop;
				row['symbol'] = data[prop]['symbol'];
				symbols.push(row);
			}
		  }
		  res.jsonp(symbols);
	  });
};
exports.currencyreader = function(callback){
fs.readFile('./files/rate.txt', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
		callback(data);
	 });

}

exports.activity = function(req, res) {
     exports.activityreader(function (activitydata){
		console.log(activitydata);
	  res.jsonp(JSON.parse(activitydata)); 
    });
};

exports.activityreader = function(callback){
	var fs1=fs;
	fs1.readFile('./files/Activity.txt', 'utf8', function (err,activitydata) {
      if (err) {
        return console.log(err);
      }
	  callback(activitydata);
	});
}
/* exports.currencyConversion = function(req,res){
var resq= req;
async.parallel([
   function(cb){
    request.get('http://www.localeplanet.com/api/auto/currencymap.json?name=',resq.query.amt,function(error,response,body){
        cb(error,body)
    });
  },
  function(cb){
    request.get('http://openexchangerates.org/api/latest.json?app_id=11c058108ce448238a2c48274ce67f15',function(error,response,body){
        cb(error,body)
    });
  },
  fs.readFile.bind(fs,"./files/rate.txt",'utf8')
], function(error, results){
    valueTable = JSON.parse(results[1]).rates;
    symbolTable = JSON.parse(results[0]);
    var symbols = {};
    for (var prop in valueTable) {
    if (valueTable.hasOwnProperty(prop)) {
        var row = {}
        row['currency'] = prop;
        row['rate'] = valueTable[prop].toFixed(2);
        if(typeof symbolTable[prop] != 'undefined')
            row['symbol'] = symbolTable[prop].symbol_native
        else
            row['symbol'] = prop
        symbols[prop] = row;
		
    }
	}
	var resultjsonlive = symbols;
	var from = symbols[resq.query.from];
	var to = symbols[resq.query.to];
	
	var conversionrate = (to.rate / from.rate).toFixed(2);
	var amt = resq.query.amt;
	var net;
	if(typeof amt === 'undefined'){
		amt= 1;
		net = (conversionrate * amt).toFixed(2);
	}else{
		net = (conversionrate * amt).toFixed(2);
	}
	console.log(from,to,amt,conversionrate,net);
	
	var resultjsonfromfile = JSON.parse(results[2]);
	var filefrom = resultjsonfromfile[resq.query.from];
	var fileto = resultjsonfromfile[resq.query.to];
	var isfromchanged= false;
	var istochanged= false;
	
	if (from.rate !== filefrom.rate){
		var temp = resultjsonfromfile[resq.query.from];
		temp.rate = from.rate;
		resultjsonfromfile[resq.query.from] = temp;
		console.log(resultjsonfromfile[resq.query.from]);
		isfromchanged=true;
	}
	if (to.rate !== to.rate){
		var temp = resultjsonfromfile[resq.query.to];
		temp.rate = to.rate;
		resultjsonfromfile[resq.query.to] = temp;
		istochanged= true;
	}
	if (isfromchanged || istochanged){
		var fs1 = require('fs');
	
		fs1.writeFile('rate.txt', JSON.stringify(resultjsonfromfile), function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
	}
	

var status={};
status.net = net;
res.jsonp(status);
});
};

export.asyncparallelresult = function(callback){
	async.parallel([
	   function(cb){
		request.get('http://www.localeplanet.com/api/auto/currencymap.json?name=',resq.query.amt,function(error,response,body){
			cb(error,body)
		});
	  },
	  function(cb){
		request.get('http://openexchangerates.org/api/latest.json?app_id=11c058108ce448238a2c48274ce67f15',function(error,response,body){
			cb(error,body)
		});
	  },
	  fs.readFile.bind(fs,"./files/rate.txt",'utf8')
	], function(error, results){
		callback(results);
	});

}; */

exports.currencyConversion = function(req,res){
var resq= req;
exports.asyncparallelresult(function (results){
	valueTable = JSON.parse(results[1]).rates;
    symbolTable = JSON.parse(results[0]);
    var symbols = {};
    for (var prop in valueTable) {
    if (valueTable.hasOwnProperty(prop)) {
        var row = {}
        row['currency'] = prop;
        row['rate'] = valueTable[prop].toFixed(2);
        if(typeof symbolTable[prop] != 'undefined')
            row['symbol'] = symbolTable[prop].symbol_native
        else
            row['symbol'] = prop
        symbols[prop] = row;
		
    }
	}
	var resultjsonlive = symbols;
	var from = symbols[resq.query.from];
	var to = symbols[resq.query.to];
	
	var conversionrate = (to.rate / from.rate).toFixed(2);
	var amt = resq.query.amt;
	var net;
	if(typeof amt === 'undefined'){
		amt= 1;
		net = (conversionrate * amt).toFixed(2);
	}else{
		net = (conversionrate * amt).toFixed(2);
	}
	console.log(from,to,amt,conversionrate,net);
	
	var resultjsonfromfile = JSON.parse(results[2]);
	var filefrom = resultjsonfromfile[resq.query.from];
	var fileto = resultjsonfromfile[resq.query.to];
	var isfromchanged= false;
	var istochanged= false;
	
	if (from.rate !== filefrom.rate){
		var temp = resultjsonfromfile[resq.query.from];
		temp.rate = from.rate;
		resultjsonfromfile[resq.query.from] = temp;
		console.log(resultjsonfromfile[resq.query.from]);
		isfromchanged=true;
	}
	if (to.rate !== to.rate){
		var temp = resultjsonfromfile[resq.query.to];
		temp.rate = to.rate;
		resultjsonfromfile[resq.query.to] = temp;
		istochanged= true;
	}
	if (isfromchanged || istochanged){
		var fs1 = require('fs');
	
		fs1.writeFile('rate.txt', JSON.stringify(resultjsonfromfile), function (err) {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
	}
	

var status={};
status.net = net;
res.jsonp(status);

});

};

exports.asyncparallelresult = function(callback){
	async.parallel([
	   function(cb){
		request.get('http://www.localeplanet.com/api/auto/currencymap.json?name=',function(error,response,body){
			cb(error,body)
		});
	  },
	  function(cb){
		request.get('http://openexchangerates.org/api/latest.json?app_id=11c058108ce448238a2c48274ce67f15',function(error,response,body){
			cb(error,body)
		});
	  },
	  fs.readFile.bind(fs,"./files/rate.txt",'utf8')
	], function(error, results){
		console.log(results);
		callback(results);
	});

}