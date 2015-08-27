function handleDelete(itemID, storageArray) {
  var listItem = storageArray.filter(function(item){
    return item.id===parseInt(itemID);
  });
  if(listItem.length>0){
    for (var i = 0; i < storageArray.length; i++) {
      if(storageArray[i].id === parseInt(itemID)){

        var tempItem = storageArray.splice(i, 1);
        return {
          message: 'That item is off the list!',
          removedItem: tempItem,
          itemlist: storageArray
        };
      }
    }
  } else {
    return ("That item doesn't exist");
  }
}


//replace res.json with return
//storage.items = storageArary
// storage = storage
//storage.addItem is a function from index...can I use that? with index.storage.addItem

function handlePost(itemName, storage){
  var listItem = storage.items.filter(function(item){
    return item.name.toLowerCase()===itemName.toLowerCase();
  });
    if(listItem.length>0){
      return {
        message: "NOOOOOO!!!"
      };
    } else {
      var newItem = storage.addItem(itemName);
      return {
        message: "Woot!",
        itemList: storage.items
      };
    }
}

//itemID = req.params.id
//body = req.body (can use it for rec.body.name, etc)
//res.json gets replaced with return
function handlePut(itemID, body, storage){
  var listItem = storage.items.filter(function(item){
    return item.id===parseInt(itemID);
  });
  if(listItem.length>0){
    for (var i = 0; i < storage.items.length; i++) {
      if(storage.items[i].id === parseInt(itemID)){
        for(var key in body){
          if(key === "name") {
            storage.items[i].name = body.name;
          }
        }
      }
    }
    return storage.items;
  } else {

    var newItem = storage.addItem(body.name);
      return({
        message: "Woot!",
        itemList: storage.items
      });
    }
}





module.exports = {
  handleDelete: handleDelete,
  handlePost: handlePost,
  handlePut: handlePut,
};
