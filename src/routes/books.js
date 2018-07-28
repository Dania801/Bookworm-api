import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';
import Book from '../models/Book';

const router = express.Router();

router.get('/', (req, res) => {
    console.log('recieved a request: ')
    Book.find({ userId: '5b596655178b7612d3bb2403'}).then(books => {
        if(books)
            res.status(200).json(books);
        
            res.status(400).json({errors: {
                global: 'Couldnt get books!'
            }})
    })
})

router.post("/", (req, res) => {
    Book.create({ ...req.body.book, userId: '5b596655178b7612d3bb2403' })
      .then(book => res.status(201).json({ book }))
      .catch(err => res.status(400).json({ errors: {
          global: 'An error occured while adding new book'
      } }));
});

router.get('/search', authenticate, (req, res) => {

    request.get(`https://www.goodreads.com/search/index.xml?key=RZyUFB3FRU1drtWn44030Q&q=${req.query.q}`)
        .then(result =>
            parseString(result, (err, goodreadsResult) =>
                res.json({
                    books: goodreadsResult.GoodreadsResponse.search[0].results[0].work.map(
                    work => ({
                        goodreadsId: work.best_book[0].id[0]._,
                        title: work.best_book[0].title[0],
                        authors: work.best_book[0].author[0].name[0],
                        covers: [work.best_book[0].image_url[0]]
                    })
                    )
                })
            )
        );
});

router.get('/fetchPages', authenticate, (req, res) => {
    const goodreadsId = req.query.goodreadsId;

    request.get(`https://www.goodreads.com/book/show.xml?key=RZyUFB3FRU1drtWn44030Q&id=${goodreadsId}`)
        .then( result => {
            parseString(result, (err, goodreadsResult) => {
                const numPages = goodreadsResult.GoodreadsResponse.book[0].num_pages[0];
                const pages = numPages ? parseInt(numPages, 10): 0
                res.json({
                    pages
                })
            })
        }
    );
});


export default router;