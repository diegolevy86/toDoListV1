const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const port = 3010;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Study", "Do the dishes", "Shower", "Cook", "Eat"];
const workItems = [];

app.get("/", function(req, res){
    let day = date.getDate();
    res.render("list", {listTitle: day, newItems: items});
});

app.post("/", function(request, response){
    let item = request.body.newListItem;
    if (request.body.list === "Work List")
    {
        workItems.push(item);
        response.redirect("/work");
    }
    else
    {
        items.push(item);
        response.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newItems: workItems});
 
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(port, function(){
    console.log("Server running on port "+port);
});