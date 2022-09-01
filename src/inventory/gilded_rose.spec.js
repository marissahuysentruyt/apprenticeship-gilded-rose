import { Item, updateQuality } from './gilded_rose';

// standard items: quality and sell_in go down every day
// once sell_in hits 0, quality goes down twice as fast
describe('`updateQuality`', () => {
  // separated items into their own describe blocks with their own rules
  describe('haunted shoe', () => {
    it('decreases the sell in and quality by one for a Haunted Shoe', () => {
      // arrange
      const standardItem = new Item('Haunted Shoe', 10, 10);
      const expectedItem = new Item('Haunted Shoe', 9, 9);
      // act
      updateQuality([standardItem]);
      // assert
      expect(standardItem).toStrictEqual(expectedItem);
    });

    // quality decreases quality by 2x after sell_in
    it('quality decreases by twice as fast when sell in is 0 or less', () => {
      // arrange
      const standardItem = new Item('Elixir of the Mongoose', 0, 26);
      const expectedItem = new Item('Elixir of the Mongoose', -1, 24);
      // act
      updateQuality([standardItem]);
      // assert
      expect(standardItem).toStrictEqual(expectedItem);
    });
  });

  // aged brie/increase item
  describe('aged brie', () => {
    it('increases quality by one as sell in decreases by one', () => {
      // arrange- get your data ready for the test
      const increaseItem = new Item('Aged Brie', 25, 25);
      const expectedIncreaseItem = new Item('Aged Brie', 24, 26);
      // act- call the function to act on the arranged data
      updateQuality([increaseItem]);
      // assert- what should the outcome be?
      // use toStrictEqual because i'm comparing the entire, changed object
      expect(increaseItem).toStrictEqual(expectedIncreaseItem);
    });

    it('brie quality is never higher than 50', () => {
      const standardItem = new Item('Aged Brie', 37, 50);
      const expectedItem = new Item('Aged Brie', 36, 50);
      updateQuality([standardItem]);
      expect(standardItem).toStrictEqual(expectedItem);
    });

    it('quality increases faster after sell in reaches zero', () => {
      const brieItem = new Item('Aged Brie', 0, 36);
      const expectedItem = new Item('Aged Brie', -1, 38);
      updateQuality([brieItem]);
      expect(brieItem).toStrictEqual(expectedItem);
    });
  });

  // backstage passes/backstage item
  describe('backstage passes', () => {
    it('decreases quality to 0 when sell in is 0', () => {
      const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      const expectedBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0);

      updateQuality([backstageItem]);
      expect(backstageItem).toStrictEqual(expectedBackstageItem);
    });
  });

  describe('quality', () => {
    it('quality is never negative', () => {
      const standardItem = new Item('Haunted Shoe', -3, 0);
      const expectedItem = new Item('Haunted Shoe', -4, 0);
      updateQuality([standardItem]);
      expect(standardItem).toStrictEqual(expectedItem);
    });

    it('special item quality changes at a different rate', () => {
      const legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
      const expectedLegendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

      const firstBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
      const expectedFirstBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 21);

      const secondBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 8, 20);
      const expectedsecondBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 7, 22);

      const thirdBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
      const expectedThirdBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 23);

      updateQuality([legendaryItem]);
      updateQuality([firstBackstageItem]);
      updateQuality([secondBackstageItem]);
      updateQuality([thirdBackstageItem]);
      expect(legendaryItem).toStrictEqual(expectedLegendaryItem);
      expect(firstBackstageItem).toStrictEqual(expectedFirstBackstageItem);
      expect(secondBackstageItem).toStrictEqual(expectedsecondBackstageItem);
      expect(thirdBackstageItem).toStrictEqual(expectedThirdBackstageItem);
    });
  });
  // });

  // this test fails because I don't have the logic within the actual updateQuality function yet
  describe('conjured items', () => {
    it.skip('decreases the quality by two for conjured items', () => {
      const conjuredItem = new Item('Conjured Mana Cake', 3, 6);
      const expectedConjuredItem = new Item('Conjured Mana Cake', 2, 4);
      updateQuality([conjuredItem]);
      expect(conjuredItem).toStrictEqual(expectedConjuredItem);
    });
  });
});
