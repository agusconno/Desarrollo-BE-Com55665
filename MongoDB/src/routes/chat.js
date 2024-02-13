import { Router } from 'express';

const chatRouter = Router();

chatRouter.get('/', async (req, res) => {
    try {
        res.status(200).render('chat', { js: 'chat.js' });
    } catch (error) {
        console.log(`Error obteniendo los productos: ${error}`);
    }
});

export default chatRouter;
