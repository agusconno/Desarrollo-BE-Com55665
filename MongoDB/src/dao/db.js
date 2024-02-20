import mongoose from 'mongoose';

function connect() {
  return mongoose.connect("mongodb+srv://agustinaconno:LTiEZx9zFmkxi2aV@clusterbe.plhgerh.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
  })
  .then(() => {
    console.log("Base de datos conectada correctamente.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });
}

export default connect;
