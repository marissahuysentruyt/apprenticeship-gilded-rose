// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

/*
* Update inventory
* @param {Item[]} items - an array of Items representing the inventory to be updated
* Example usage:

const items = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

updateQuality(items);
*/
function isStandardItem(item) {
  return (item.name != 'Aged Brie' &&
    item.name != 'Backstage passes to a TAFKAL80ETC concert' &&
    item.name != 'Sulfuras, Hand of Ragnaros')
};
function decreaseQuality(item, amount = 1) {
  item.quality -= amount;
}
function increaseQuality(item, amount = 1) {
  item.quality += amount;
}
function decreaseSellIn(item, amount = 1) {
  item.sell_in -= 1;
}
function standardItemChanges(item) {
  // then check that the quality between 0-50, and decrease the quality by 1
  if (item.quality > 0 && item.quality < 50) {
    decreaseQuality(item, 1);
    // if the sell_in becomes negative, decrease quality again by 1
    if(item.sell_in < 0) {
      decreaseQuality(item, 1);
    }
  }
}
function agedBrieQuality(item) {
  const { quality } = item;
  // no matter what, decrease the sell_in
  decreaseSellIn(item, 1);
  if (quality > 0 && quality < 50) {
    switch (true) {
      // if the sell_in is negative (and quality is not exactly 50), increase the brie quality by 2
      case item.sell_in < 0:
        // if(quality !== 50) {
          increaseQuality(item, 2);
          break;
        // }
      // if the quality is between 0-50, increase the brie quality by 1
      default: 
        // if(quality !== 50) {
          increaseQuality(item, 1);
          break;
        // }
    }
  }
};
function backstagePassesQuality(item) {
  const { sell_in }= item;
  // decrease the sell_in no matter what
  decreaseSellIn(item);
  // then check if the quality is less than 50
  if(item.quality < 50){
    switch (true) {
      //increase the quality by 1 if the sell_in is between 11-50
      case sell_in > 10: 
        increaseQuality(item, 1);
        break;
      // //increase the quality by 2 if the sell_in is between 6-10
      case sell_in > 5 && sell_in <= 10:
        increaseQuality(item, 2);
        break;
      // //increase the quality by 3 if the sell_in is between 1-5
      case sell_in > 0 && sell_in <= 5:
        increaseQuality(item, 3);
        break;
      //decrease quality all the way if the sell_in is 0 or less
      case sell_in <= 0: 
        item.quality = item.quality - item.quality;
        break;
    }
  }
}

export function updateQuality(items) {
  for (var i = 0; i < items.length; i++) {
    // for "standard" items
    if (isStandardItem(items[i])) {
      // if it's anything but the aged brie, the passes, sulfuras, first reduce the sell_in by 1
      decreaseSellIn(items[i]);
      // checks the quality and sell_in for "standard" items and changes values accordingly
      standardItemChanges(items[i]);
      // continue with the next item in the loop
      continue;
    }
    // if the item is sulfuras, don't do anything, and continue to the next item in the loop
    if (items[i].name === 'Sulfuras, Hand of Ragnaros') continue;
    // for aged brie
    if (items[i].name === 'Aged Brie') {
     // checks the quality of brie and determines if the quality is increased by 1 or 2
      agedBrieQuality(items[i]);
        continue;
      }
      //for backstage passes
    if (items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      // backstagePassesQuality will decrease the sell_in, and determine how much to decrease the quality based on that sell_in result
      backstagePassesQuality(items[i]);
      continue;
    }
  }
}
