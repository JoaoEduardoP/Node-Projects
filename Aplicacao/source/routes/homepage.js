import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {title: "Meu App", message: "Olá"});
});

export default router;