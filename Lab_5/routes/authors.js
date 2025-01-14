//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById function and call it in the :/id route.
// import { error } from "console";
import { getAuthors, getAuthorById} from "../data/data.js";
import express from 'express';

const router = express.Router()

router.route('/')
.get(async (req, res) => {
    try{
        const authorList = await getAuthors();
        return res.json(authorList);
    }catch(e){
        return res.status(500).send(e);
    }
});
// Implement GET Request Method and send a JSON response See lecture code!

router.route('/:id')
.get(async (req, res) => {
    try{
        const author = await getAuthorById(req.params.id);
        return res.json(author);
    }catch(e){
        return res.status(404).json({"error": e});
    }
});
//Implement GET Request Method and send a JSON response See lecture code!

export default router;
