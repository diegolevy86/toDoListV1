const express = require("express");
const bodyParser = require("body-parser");
const port = 3010;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Study", "Do the dishes", "Shower", "Cook", "Eat"];
let workItems = [];

app.get("/", function(req, res){
    let today = new Date();
    /*let dayNumber = today.getDay();*/
    let options = {weekday: "long", day: "numeric", month: "long"};
    let day = today.toLocaleDateString("en-US", options);

    /*switch(dayNumber)
    {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Err";
            break;
    }*/

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

app.listen(port, function(){
    console.log("Server running on port "+port);
});