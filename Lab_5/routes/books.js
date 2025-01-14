//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getBooks() function in the /data/data.js file to return the list of books.  You can also import your getBookById(id) function and call it in the :/id route.
import { getBooks, getBookById } from "../data/data.js";
import express from 'express';

const router = express.Router();

router.route('/')
.get(async (req, res) => {
    try{
        const bookList = await getBooks();
        return res.json(bookList);
    }catch(e){
        return res.status(500).send(e);
    }
});
// Implement GET Request Method and send a JSON response  See lecture code!

router.route('/:id')
.get(async (req, res) => {
    try{
        const book = await getBookById(req.params.id);
        return res.json(book);
    }catch(e){
        return res.status(404).json({"error": e});
    }
});
// Implement GET Request Method and send a JSON response See lecture code!

export default router;
