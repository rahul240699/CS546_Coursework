//Here you will require route files and export them as used in previous labs.
import fibonacciPrimeRoutes from './fibonacci_prime.js';

const constructorMethod = (app) => {
  app.use('/', fibonacciPrimeRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

export default constructorMethod;