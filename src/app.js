const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();

// Setting Cors and Whitelisting the Domain Name for set coockie
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

/*app.get('/test', (req, res) => {
    res.send('Admin API Working');
});

app.post('/testlogin', (req, res) => {
    console.log('Login route hit!');
    res.send('Login successful');
});

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});*/

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);


connectDB()
    .then(() => {
        console.log("Database Connection Established....");
        app.listen(process.env.PORT, () => {
            console.log("Server is listining and running on PORT "+process.env.PORT+"...");
        })
    })
    .catch((err) => {
        console.error("Database connot be connected!!!")
    })

