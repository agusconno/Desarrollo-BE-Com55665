import { Router } from "express";


const routerRealTimeProducts = Router();

//configuro la ruta para renderizar la vista
routerRealTimeProducts.get('/', (req, res) => {
  res.render('pages/realTimeProducts', {
    styles: "/styles",
    js: "/realTimeProducts.js"
  });
});


export { routerRealTimeProducts };
