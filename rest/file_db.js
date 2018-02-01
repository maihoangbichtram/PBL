var sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'Library.db')
var db = new sqlite3.Database(dbPath);

/*db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS counts (key TEXT, value INTEGER)");
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0);
});*/



var express = require('express');
var restapi = express();
var router = express.Router();

restapi.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

restapi.use('/api', router);

restapi.get('/data', function(req, res){
    db.get("SELECT COUNT (*) AS total FROM book", function(err, row){
        res.json({ "count" : row });
    });
	//console.log("abc");
});

restapi.get('/:query', function(req, res){
    db.get(req.params.query, function(err, row){
        res.json({ row });
    });
	//console.log("abc");
});

restapi.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})

console.log("Submit GET or POST to http://localhost:3000/data");

/*db.serialize(function() {
    db.each("SELECT ID FROM patron", function(err, row) {
		//console.log(err);
        console.log(row.ID);
    });
});*/