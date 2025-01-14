/*
Here is where you'll set up your server as shown in lecture code and worked in previous labs.
Your server this week should not do any of the processing or calculations.  Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the Fibonacci & prime number checking page.
*/
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import routes from './routes/fibonacci_prime.js'


const staticDir = express.static('public');

app.use('/', routes);

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});