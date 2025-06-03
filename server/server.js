require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const createPostRoute = require("./routes/createPostRoute");
const viewFeedRoute = require("./routes/viewFeedRoute");
const cookieParser = require('cookie-parser');
const cookieJwtAuth = require('./middleware/cookieJwtAuth');

const app = express(); 
app.use(cors()); //CORS is required to allow front-end to make request to back-end when the two have different domains
app.use(express.json()); //To parse JSON sent in body of req
app.use(cookieParser()); //To allow express to parse JWT stored in cookies

//Mongodb atlas database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((err) => console.error("MongoDB connection failed:", err));

//User registeration:
app.use("/api/v1/instafren/register", registerRoute);

//User login:
app.use("/api/v1/instafren/login", loginRoute);

//Creating a post:
app.use("/api/v1/instafren/createPost", cookieJwtAuth, createPostRoute);

//Viewing feed:
app.use("/api/v1/instafren/viewFeed", cookieJwtAuth, viewFeedRoute);

const PORT =  process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`server is up and running on ${PORT}`);
})
