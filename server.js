const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')

mongoose.connect("mongodb+srv://Avneet:Avneet@cluster0.h1jff.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log("err",err);
});

db.once("open", () => {
  console.log("Database Connection Established!");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const EmployeeRoutes = require("./routes/employee")

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)



