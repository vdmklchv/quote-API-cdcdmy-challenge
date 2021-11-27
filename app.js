const express = require('express');
const morgan = require('morgan');
const app = express();

const {
    quotes
} = require('./data');
const {
    getRandomElement
} = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({ "quote": randomQuote });
})

app.get('/api/quotes', (req, res, next) => {
    if (!req.query.person) {
        res.send({
            "quotes": quotes,
        })
    } else {
        const person = req.query.person;
        const results = quotes.filter((quote) => quote.person === person);
        if (results) {
            res.send({
                "quotes": results,
            })
        } else {
            res.send({});
        }
    }
})

app.post('/api/quotes', (req, res, next) => {
    if (req.query.quote && req.query.person) {
        const newQuote = {
            quote: req.query.quote,
            person: req.query.person,
        }
        quotes.push(newQuote);
        res.status(201).send({
            "quote": newQuote,
        });
    } else {
        res.status(400).send();
    }
})

app.listen(PORT, () => {
    console.log(`Started listening at port ${PORT}`);
})