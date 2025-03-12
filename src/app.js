const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");


app.use("/admin", authRouter);
app.use("/admin", profileRouter);


connectDB()
    .then(() => {
        console.log("Database Connection Established....");
        app.listen(process.env.PORT, () => {
            console.log("Server is listining and running on PORT 5000...");
        })
    })
    .catch((err) => {
        console.error("Database connot be connected!!!")
    })

