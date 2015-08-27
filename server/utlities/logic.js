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


module.exports = {
  handleDelete: handleDelete,
};
