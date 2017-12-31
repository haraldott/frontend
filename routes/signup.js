module.exports = (app, partials) => {
  app.get('/signup', (req, res) => {
    return res.render('signup.html', {
      partials
    })
  })
};