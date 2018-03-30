var express = require("express");
var app = express();
var http = require('http');
var bodyParser = require("body-parser");
var fs = require('fs');

app.use(express.static("views")); // Allow access to content of views folder
app.use(express.static("scripts")); // Allow access to scripts folder
app.use(express.static("images")); // Allow access to images folder

app.set("view engine", "jade"); // This line sets the default view wngine 

var products = require("./model/products.json"); // allow the app to access the products.json file

// This function calls the index viwe when somebody goes to the site route.
app.get('/', function(req, res) {
  res.render("index");
  console.log("Home page now rendered"); // the log function is used to output data to the terminal. 
  });


// This function calls the products page when somebody calls the products page
app.get('/products' , function(req, res){
  res.render("products.jade", 
             {products:products} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Products Page is rendered");
  
  
})

// This function calls the add products page
app.get('/add' , function(req, res){
  res.render("add"); 
  console.log("Create Products Page is rendered");
  
  
})




  // Code to create a new room
app.post('/add', function(req, res) {
  
var count = Object.keys(products).length;  //this takes the rooms variable above which is the json file and counts the length of it

// create a new room based on the info in the form
var product ={
    name: req.body.name,
    id: "13", // this adds 1 to the length of the file and assigns it as the new ID
    activity: req.body.sport,
    price: req.body.price,
	  image: req.body.image
  
  };


var json = JSON.stringify(products); // this is to Convert it from an object to string with stringify for use below


// read the json file and push the data to it
fs.readFile('./model/products.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
  //  room = JSON.parse(room); //now it an object
   products.push(product); //add the data from the variable above 
  json = JSON.stringify(products, null, 4); //convert it back to json
    fs.writeFile('./model/products.json', json, 'utf8'); // write it back 
  //  json = JSON.parse(rooms); //convert it back to json
}});




	console.log(product)

  
  res.redirect("/products")
  
  
});




















// This function gets the application up and running on the development server.
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Yippee its running");
  
})

