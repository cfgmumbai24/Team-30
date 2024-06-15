const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const { addQuery } = require("./controllers/forum");
const { login, register } = require("./controllers/auth");
const { leaderboard } = require("./controllers/leaderboard");
const updatePoints = require("./controllers/updatePoints");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp/",
	})
)
//cloudinary connection
cloudinaryConnect();

// app.use("/addQuery", addQuery);

app.post("/login", login);
app.post("/register", register);
app.get("/leaderboard", leaderboard);
app.post("/updatePoints", updatePoints);

//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
