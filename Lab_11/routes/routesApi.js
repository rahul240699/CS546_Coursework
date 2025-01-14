// Set-Up Routes
import express from "express";
import path from 'path'
const router = express.Router();

router.route('/').get(async (req, res) => {
  //code here for GET to show static HTML flie
  //IF you have any other routes besides this one, you will get a 0. everything must be done via client-side and AJAX requests (a client-side fetch or axios request can be used instead of AJAX)
  const filePath = path.resolve('static', 'webpage.html');
  res.sendFile(filePath);
});

export {router as apiRoutes};