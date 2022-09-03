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
export function updateQuality(items) {
  for (var i = 0; i < items.length; i++) {
    // if it's anything but the aged brie, the passes, sulfuras, && the quality is still above 0, reduce quality by 1
    if (items[i].name != 'Aged Brie' && 
        items[i].name != 'Backstage passes to a TAFKAL80ETC concert' && 
        items[i].name != 'Sulfuras, Hand of Ragnaros' && 
        items[i].quality > 0) {
          items[i].quality = items[i].quality - 1;
    } else { //OTHERWISE...
        // if the quality is still under 50, && the item is either the brie or the passes, increase the quality by 1
        if ((items[i].quality < 50) &&
            (items[i].name == 'Backstage passes to a TAFKAL80ETC concert' || 
            items[i].name == 'Aged Brie')) {
              items[i].quality = items[i].quality + 1
          }
        // ALSO...if the item is ONLY the passes and the quality is still less than 50...
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert' && 
            items[i].quality < 50) {
          // and the sell_in this less than 11, increase the quality AGAIN by 1 (2 total)
          if (items[i].sell_in <= 10) {
            items[i].quality = items[i].quality + 1
          }
          // and the sell_in this less than 6, increase the quality AGAIN by 1 (3 total)
          if (items[i].sell_in <= 5) {
            items[i].quality = items[i].quality + 1
          }
          // and once the passes get to sell_in of 0, the lose all quality
          if (items[i].sell_in <= 0) {
            items[i].quality = items[i].quality - items[i].quality
          }
        }
      }
    
    // ALSO...if the item is not sulfuras, the sell_in will go down by 1
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    
    // ALSO...
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } 
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}
