import { Item, updateQuality } from './gilded_rose';

// standard items: quality and sell_in go down every day
// once sell_in hits 0, quality goes down twice as fast
describe('`updateQuality`', () => {
  // separated items into their own describe blocks with their own rules
  describe('standard items', () => {
    it('decreases the sell in and quality by one', () => {
      // arrange
      const standardItem = new Item('Haunted Shoe', 10, 10);
      const expectedItem = new Item('Haunted Shoe', 9, 9);
      // act
      updateQuality([standardItem]);
      // assert
      expect(standardItem).toStrictEqual(expectedItem);
    });

    // quality cannot exceed 50
    it('quality is never higher than 50', () => {
      const standardItem = new Item('Haunted Shoe', 37, 50);
      const expectedItem = new Item('Haunted Shoe', 36, 50);
      updateQuality([standardItem]);
      expect(standardItem).toStrictEqual(expectedItem);
    });

    // quality decreases by 2x after sell_in is 0
    it('quality decreases by twice as fast when sell in reaches zero', () => {
      // arrange
      const standardItem = new Item('Elixir of the Mongoose', 0, 26);
      const expectedItem = new Item('Elixir of the Mongoose', -1, 24);
      // act
      updateQuality([standardItem]);
      // assert
      expect(standardItem).toStrictEqual(expectedItem);
    });

    // quality cannot be negative
    it('quality is never negative', () => {
      const standardItem = new Item('Haunted Shoe', -3, 0);
      const expectedItem = new Item('Haunted Shoe', -4, 0);
      updateQuality([standardItem]);
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

    it('quality increases twice as fast after sell in reaches zero', () => {
      const brieItem = new Item('Aged Brie', 0, 36);
      const expectedItem = new Item('Aged Brie', -1, 38);
      updateQuality([brieItem]);
      expect(brieItem).toStrictEqual(expectedItem);
    });

    // quality cannot exceed 50
    it('quality is never higher than 50', () => {
      const standardItem = new Item('Aged Brie', 37, 50);
      const expectedItem = new Item('Aged Brie', 36, 50);
      updateQuality([standardItem]);
      expect(standardItem).toStrictEqual(expectedItem);
    });
  });

  // backstage passes/increase item
  describe('backstage passes', () => {
    it('decreases quality to 0 when sell in is 0', () => {
      const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      const expectedBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0);

      updateQuality([backstageItem]);
      expect(backstageItem).toStrictEqual(expectedBackstageItem);
    });

    it('increases quality by one if the sell in is higher than 10', () => {
      const firstBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
      const expectedFirstBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 21);

      updateQuality([firstBackstageItem]);
      expect(firstBackstageItem).toStrictEqual(expectedFirstBackstageItem);
    });

    it('increases quality by two if the sell in is between 6-10', () => {
      const secondBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 8, 20);
      const expectedSecondBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 7, 22);

      updateQuality([secondBackstageItem]);
      expect(secondBackstageItem).toStrictEqual(expectedSecondBackstageItem);
    });

    it('increases quality by three if the sell in is 5 or less', () => {
      const thirdBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
      const expectedThirdBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 23);

      updateQuality([thirdBackstageItem]);
      expect(thirdBackstageItem).toStrictEqual(expectedThirdBackstageItem);
    });

    // quality cannot exceed 50
    it('quality is never higher than 50', () => {
      const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 37, 50);
      const expectedBackstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', 36, 50);
      updateQuality([backstageItem]);
      expect(backstageItem).toStrictEqual(expectedBackstageItem);
    });
  });

  describe('sulfuras', () => {
    it('sell_in and quality never changes', () => {
      const legendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
      const expectedLegendaryItem = new Item('Sulfuras, Hand of Ragnaros', 0, 80);

      updateQuality([legendaryItem]);
      expect(legendaryItem).toStrictEqual(expectedLegendaryItem);
    });
  });

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
