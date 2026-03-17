import app from "./src/app.js";
import config from "./src/config/config.js";
import mongoose from "mongoose";
import colors from "colors";

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Successfully connected to MongoDB".bgBlack.magenta);
    
    const PORT = config.PORT;

    app.listen(PORT, () => {
      console.log(`App is successfully running at PORT : ${PORT}`.bgBlack.blue);
    });
  } catch (error) {
    console.log(`Something went wrong ${error}`.bgRed.white);
  }
})();
