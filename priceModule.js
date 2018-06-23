var url = require('url');

exports.calcResult = function(req,res) {

        var result = "";
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        if (query.weight == NaN || query.weight < 0.1 || query.weight > 13 ) {
          result = "Error- Weight must be between 0.1 and 13 ounces.";
          var answer = {answer: result};
          res.status(200)
             .json(answer);
        }
        switch (query.type) {
          case 'metered':
              result = meteredMail(query.weight);
              break;
          case 'stamped':
              result = stampedMail(query.weight);
              break;
          case 'flat':
              result = flatMail(query.weight);
              break;
          case 'package':
              result = retailMail(query.weight);
        }
        result =  "Price: $" + result.toFixed(2);
        var answer = {answer: result}
        res.status(200)
           .json(answer);
      }
      
      function stampedMail(weight) {
        
        if (weight <= 3) {
          return ((Math.ceil(weight) - 1) * .21 + .50);
        } else if (weight <= 3.5) {
          return 1.13;
        } else {
          return flatMail(weight);
        }
      }
      
      function meteredMail(weight) {
        if (weight > 3.5) {
          return flatMail(weight);
        } else {
          return (stampedMail(weight) - .03);
        }
      }
      
      function flatMail(weight) {
          return ((Math.ceil(weight) - 1) * .21 + 1.00);
      
      }
      
      function retailMail(weight) {
        if (weight <= 4) {
          return 3.50;
        } else if (weight <= 8) {
          return 3.75;
        } else {
          return ((Math.ceil(weight) - 8) * .35 + 3.75);
        } 
      
}