// User.js
'use strict';
import Bookshelf from '../bookshelf';
class User extends Bookshelf.Model{
  get tableName() {
    return 'user';
  };
};
export default Bookshelf.model('User', User);