'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      
      if (!input) {
        return res.json({ error: 'No input provided' });
      }

      const result = convertHandler.convertAll(input);

      if (result.error) {
        return res.json({ error: result.error });
      }

      res.json(result);
    });
    
};