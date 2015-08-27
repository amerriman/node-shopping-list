var express = require('express');
var router = express.Router();
var logic = require('../utilities/logic');
var storage = require('../models/items');


// create some instances
storage.addItem('Noodles');
storage.addItem('Tomatoes');
storage.addItem('Peppers');


// route handler
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/items', function(req, res) {
  res.json(storage.items);
});

router.get('/item/:id', function(req, res){
  res.json(storage.items[req.params.id]);
});


//http -f POST localhost:3000/items name="sausage"
router.post("/items", function(req, res){
  var response = logic.handlePost(req.body.name, storage);
  res.json(response);
});


/////////////   THE LONG WAY  ////////////////////
// //http -f POST localhost:3000/items name="sausage"
// router.post("/items", function(req, res){
//   var listItem = storage.items.filter(function(item){
//     //what is happening here? - body works, params does not
//     return item.name.toLowerCase()===req.body.name.toLowerCase();
//   });

//   if(listItem.length>0){
//     res.json(
//       {message: "NOOOOOO!!!"}
//     );
//   } else {
//     var newItem = storage.addItem(req.body.name);
//       res.json({
//         message: "Woot!",
//         itemList: storage.items
//       });
//     }
// //Keep working on this - can it work with a for loop?
//   // for (var i = 0; i < storage.items.length; i++) {
//   //   if(storage.items[i].name === req.params.name){
//   //     res.json(
//   //       {message: "You already have that on the list!"}
//   //     );
//   //   } else {
//   //     var newItem = storage.addItem(req.body.name);
//   //     res.json({
//   //       message: "Woot!",
//   //       itemList: storage.items
//   //     });
//   //   }
//   // }
// });

router.put("/item/:id", function(req, res, next){
  var results = logic.handlePut(req.params.id, req.body, storage);
  res.json(results);
});

//////  THE LONG WAY ///////////////////////////
// //http PUT localhost:3000/item/0 name="blueberries"
// router.put("/item/:id", function(req, res, next){
//   //This sees if the item exists
//   var listItem = storage.items.filter(function(item){
//     //this will return the object you are looking for in a new little array.  It's ONLY to see if it's there or not and is connected to the else below
//     return item.id===parseInt(req.params.id);
//   });
//   //if the item exists,
//   if(listItem.length>0){
//     //loop through the storage items to find the item with that id
//     for (var i = 0; i < storage.items.length; i++) {
//       if(storage.items[i].id === parseInt(req.params.id)){
//         //look for the key we've specified in our request
//         //reafactor as a true filter; DO NOT use for/in to iterate through an array
//         for(var key in req.body){
//           //if the key is 'name'
//           if(key === "name") {
//             //change the name to the one we specified in the request
//             storage.items[i].name = req.body.name;
//           }
//           // else if (key === "id") {
//           //   //this is problematic - you can end up with two ids of the same number (and then you can't delete the one you changed for some reason)- need a whole other thing here to make sure the id isn't the same as an existing id?
//           //   storage.items[i].id = req.body.id;
//           // }
//         }
//       }
//     }
//     res.json(storage.items);
//   } else {

//     var newItem = storage.addItem(req.body.name);
//       res.json({
//         message: "Woot!",
//         itemList: storage.items
//       });
//     }

// });

//// double validation attempt.  Come back to this. ////
// router.put("/item/:id", function(req, res, next){
//   var listItem = storage.items.filter(function(item){
//     return item.id===parseInt(req.params.id);
//   });
//   console.log(listItem[0].name, "list item.name");
//   console.log(req.params.name, "req params name");

//   //if the item exists,
//   if(listItem.length>0 && listItem[0].name != req.body.name){
//     //loop through the storage items to find the item with that id
//     for (var i = 0; i < storage.items.length; i++) {
//       if(storage.items[i].id === parseInt(req.params.id)){
//         //look for the key we've specified in our request
//         for(var key in req.body){
//           //if the key is 'name'
//           if(key === "name") {
//             //change the name to the one we specified in the request
//             storage.items[i].name = req.body.name;
//           } else if (key === "id") {
//             storage.items[i].id = req.body.id;
//           }
//         }
//       }
//     }
//     res.json(storage.items);
//   // } else if(listItem[0].name === req.params.name) {
//   //     res.json(
//   //       {message: "NOOOOOO!!!"}
//   //     );

//     } else {

//     var newItem = storage.addItem(req.body.name);
//       res.json({
//         message: "Woot!",
//         itemList: storage.items
//       });
//     }

// });

//http DELETE localhost:3000/item/2
router.delete('/item/:id', function(req, res, next){
  var response = logic.handleDelete(req.params.id, storage.items);
  res.json(response);
});

///////////  THE LONG WAY  //////////////////////////
// router.delete('/item/:id', function(req, res, next){
//   var listItem = storage.items.filter(function(item){
//     return item.id===parseInt(req.params.id);
//   });
//   if(listItem.length>0){
//     for (var i = 0; i < storage.items.length; i++) {
//       if(storage.items[i].id === parseInt(req.params.id)){

//         var tempItem = storage.items.splice(i, 1);
//         res.json({
//           message: 'That item is off the list!',
//           removedItem: tempItem,
//           itemlist: storage.items
//         });
//       }
//     }
//   } else {
//     res.json("That item doesn't exist");
//   }
// });

module.exports = router;

///////////////////////////////////////////////

// //Or, everything below does pretty much the same thing but WAY simpler to write?  Still need validation for much of this

// var express = require('express');
// var router = express.Router();

// router.get('/items', function(req, res, next) {
//   res.json(storage.items);
// });

// router.post('/items', function(req, res) {
//   storage.addItem(req.body.name);
//   res.json(storage.items);
// });

// router.put('/item/:id', function(req, res, next) {
//   console.log(storage.items[req.params.id]);
//   if(storage.items[req.params.id]){
//     storage.items[req.params.id].name = req.body.name;
//     res.json(storage.items);
//   }
//   else {
//     storage.addItem(req.body.name);
//     res.json(storage.items);
//   }
// });

// router.delete('/item/:id', function(req, res, next) {
//   console.log(storage.items[req.params.id]);
//   if(storage.items[req.params.id]){
//     storage.items.splice([req.params.id],1);
//     res.json(storage.items);
//   }else {
//     res.json(storage.items);
//   }
// });

// // router.get('/item/:id', function(req, res, next) {
// //   console.log(storage.items);
// //   console.log(storage.items[req.params.id]);
// //   storage.items[req.params.id - 1].name;
// //   storage.items[req.params.id - 1].age ;

// //   res.json(this.items[req.params.id - 1]);
// // });


// // constructor
// function ItemLibrary() {
//   this.items = [];
//   this.id = 0;
// }

// // methods
// ItemLibrary.prototype.addItem = function(name) {
//   var newItem = {name: name, id: this.id};
//   this.items.push(newItem);
//   this.id += 1;
// };

// // create some instances
// var storage = new ItemLibrary();
// storage.addItem('Noodles');
// storage.addItem('Tomatoes');
// storage.addItem('Peppers');

// // route handler
// router.get('/items', function(req, res) {
//   res.json(storage.items);
// });


// module.exports = router;






