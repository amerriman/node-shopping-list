var express = require('express');
var router = express.Router();

// constructor
function ItemLibrary() {
  this.items = [];
  this.id = 0;
}

// methods
ItemLibrary.prototype.addItem = function(name) {
  var newItem = {name: name, id: this.id};
  this.items.push(newItem);
  this.id += 1;
};

// create some instances
//Instructions say to do below, but doesn't work
// var storage = new ItemLibrary();
// storage.add('Noodles');
// storage.add('Tomatoes');
// storage.add('Peppers');

var storage = new ItemLibrary();
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

router.post("/items", function(req, res){
  var listItem = storage.items.filter(function(item){
    //what is happening here? - body works, params does not
    return item.name.toLowerCase()===req.body.name.toLowerCase();
  });

  if(listItem.length>0){
    res.json(
      {message: "NOOOOOO!!!"}
    );
  } else {
    var newItem = storage.addItem(req.body.name);
      res.json({
        message: "Woot!",
        itemList: storage.items
      });
    }
//Keep working on this - can it work with a for loop?
  // for (var i = 0; i < storage.items.length; i++) {
  //   if(storage.items[i].name === req.params.name){
  //     res.json(
  //       {message: "You already have that on the list!"}
  //     );
  //   } else {
  //     var newItem = storage.addItem(req.body.name);
  //     res.json({
  //       message: "Woot!",
  //       itemList: storage.items
  //     });
  //   }
  // }
});

router.put("/item/:id", function(req, res, next){
  //This sees if the item exists
  var listItem = storage.items.filter(function(item){
    //this will return the object you are looking for in a new little array.  It's ONLY to see if it's there or not and is connected to the else below
    return item.id===parseInt(req.params.id);
  });
  //if the item exists,
  if(listItem.length>0){
    //loop through the storage items to find the item with that id
    for (var i = 0; i < storage.items.length; i++) {
      if(storage.items[i].id === parseInt(req.params.id)){
        //look for the key we've specified in our request
        for(var key in req.body){
          //if the key is 'name'
          if(key === "name") {
            //change the name to the one we specified in the request
            storage.items[i].name = req.body.name;
          } else if (key === "id") {
            storage.items[i].id = req.body.id;
          }
        }
      }
    }
    //puppies example has send - why send and not json? They seem to be the same? It's json in the else, but they both seem to work either way
    res.json(storage.items);
  } else {

    var newItem = storage.addItem(req.body.name);
      res.json({
        message: "Woot!",
        itemList: storage.items
      });
    }

});


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

router.delete('/item/:id', function(req, res, next){
  var listItem = storage.items.filter(function(item){
    return item.id===parseInt(req.params.id);
  });

  if(listItem.length>0){
    for (var i = 0; i < storage.items.length; i++) {
      if(storage.items[i].id === parseInt(req.params.id)){

        var tempItem = storage.items.splice(i, 1);
        res.json({
          message: 'That item is off the list!',
          removedItem: tempItem,
          itemlist: storage.items
        });
      }
    }
  } else {
    res.json("That item doesn't exist");
  }
});

module.exports = router;






