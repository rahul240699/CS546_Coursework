/*
Require express and express router as shown in lecture code and worked in previous labs.

Your server this week should not do any of the processing or calculations.  Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the Fibonacci & prime number checking page.

you just need one route to send the static homepage.html file
*/

import {Router} from 'express';
import path from 'path'; 

const router = Router();

router.get('/', (req, res) => {
    const filePath = path.resolve('static', 'homepage.html');
    res.sendFile(filePath);
  });

export default router;