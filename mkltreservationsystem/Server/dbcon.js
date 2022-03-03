var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_brinkmo',
  password        : '9641',
  database        : 'cs340_brinkmo'
});
module.exports.pool = pool;
