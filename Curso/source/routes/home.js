import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });     // Renderiza a página viwes/index.pug
});

export default router;