import 'dotenv/config';
import { sequelize } from "./database/db.js";
import app from "./app.js";


const main = async () => {
  try {
    const port = process.env.PORT || 3000;

    await sequelize.authenticate(); // Conectar a la base de datos y verificar la conexión
    await sequelize.sync({ force: true }); // Sincronizar el modelo con la base de datos
    console.log(`Conexión a la base de datos ${process.env.DB_DATABASE} realizada correctamente`);

    app.listen(port, () => {
      console.log("Servidor levantado en el puerto 3000");
    });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};
main();
