module.exports = (app, partials) => {
  app.get('/:slug', (req, res) => {
    return res.status(404).render('404.html', {
      partials
    })
  })
};