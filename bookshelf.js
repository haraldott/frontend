var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'localhost',
    user     : 'root',
    password : 'MVfdM15MidA',
    database : 'userdb',
    charset  : 'utf8'
  }
});
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
export default bookshelf;