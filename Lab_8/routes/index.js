//Here you will import route files and export them as used in previous labs
import movieRoutes from './movies.js';

const constructorMethod = (app) => {
    app.use('/', movieRoutes);
  
    app.use('*', (req, res) => {
      res.status(404).json({error: 'Route Not found'});
    });
  };
  
  export default constructorMethod;