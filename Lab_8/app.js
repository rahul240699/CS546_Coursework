//Here is where you'll set up your server as shown in lecture code
import express from 'express';
import configRoutesFunction from './routes/index.js';
import exphbs from 'express-handlebars';


const app = express();


const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
};


app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
    or: function(a,b){
      return a || b;
    }
  }
}));

app.set('view engine', 'handlebars');

configRoutesFunction(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
