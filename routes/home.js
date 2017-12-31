module.exports = (app, partials) => {
  app.get('/', (req, res) => {
    return res.render('index.html', {
      partials
    })
  })
};