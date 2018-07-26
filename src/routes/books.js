import express from 'express';
import authenticate from '../middlewares/authenticate';
import request from 'request-promise';
import { parseString } from 'xml2js';

const router = express.Router();

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

    // res.json({
    //     books: [
    //         {
    //             goodreadsId: 1, 
    //             title: '1984',
    //             authors: "Orwell",
    //             covers: [
    //                 "https://images.gr-assets.com/books/13489905661/5470.jpg",
    //                 "https://images.gr-assets.com/books/13489905661/5470.jpg"
    //             ],
    //             pages: 198
    //         },{
    //             goodreadsId: 2, 
    //             title: 'Three Men in a boat',
    //             authors: "Jerome K.Jerome",
    //             covers: [
    //                 "https://images.gr-assets.com/books/13489905661/5470.jpg"
    //             ],
    //             pages: 256
    //         }
    //     ]
    // })
});

export default router;