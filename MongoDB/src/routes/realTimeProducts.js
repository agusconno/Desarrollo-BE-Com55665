import { Router } from "express";


const routerRealTime = Router();

//configuro la ruta para renderizar la vista
routerRealTime.get('/', (req, res) => {
  res.render('pages/realTimeProducts', {
    styles: "/styles",
    js: "/realTimeProducts.js"
  });
});


export { routerRealTime };
