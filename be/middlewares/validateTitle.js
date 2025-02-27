module.exports = (req, res, next) => {
    if (req.body.title && req.body.title.toLowerCase().includes('test')) {
      return res.status(400).json({ error: 'Title cannot contain the word "test"' });
    }
    next();
  };