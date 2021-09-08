module.exports.isAdmin = (req, res, next) => {
  if(req.session.isAdmin){
    return next();
  }
  res.redirect('/');
}

module.exports.isUser = (req, res, next) => {
  if(req.session.user){
    return next();
  }
  res.redirect('/');
}