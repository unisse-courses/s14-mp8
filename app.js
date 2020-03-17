const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const app = express();
const port = 9090;

app.use(express.static("public"));

app.listen(port, function(){
   console.log("App listening at port: " + port); 
});


app.engine("hbs", hbs({
    extname: "hbs",
    defaultView: "main",
    layoutsDir: path.join(__dirname, "/views/layouts" ),
    partialsDir: path.join(__dirname, "/views/partials")
}));

app.set("view engine", "hbs");


app.get("/", function(req,res){
   res.render("menu");
});

