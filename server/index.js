var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "myproject";
const client = new MongoClient(url, { useNewUrlParser: true });
var db;

client.connect(function(err) {
  console.log("Connected successfully to server");

  db = client.db(dbName);
  // db.collection("users").deleteMany({});
  var result = db
    .collection("users")
    .find({})
    .count()
    .then(value => console.log(value));
  db.collection("users")
    .find({})
    .forEach(doc => {
      console.log(doc.listOfPosts);
    });

  require("./Routes/signup")(app, db);
  require("./Routes/login")(app, db);
  require("./Routes/verify")(app, db);
  require("./Routes/sendVerificationEmail")(app, db);
  require("./Routes/forgotPassword")(app, db);
  require("./Routes/addPost");
});

var port = process.env.port || 3000;

app.use(express.static("public"));

app.get("/api", function(req, res) {
  res.send("Welcome To Blogging App API");
});
app.listen(3000, () => {
  console.log(`Listening from ${port}`);
});
