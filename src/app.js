require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connection")
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;
connectDB();

app.use('/api/user', require('./routes/user.routes'));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});