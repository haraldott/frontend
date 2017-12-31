// Routes
module.exports = (app, partials) => {
  require('./home')(app, partials);
  require('./signup')(app, partials);
  require('./user')(app, partials);
  require('./404')(app, partials); //has to be the last one!!
};