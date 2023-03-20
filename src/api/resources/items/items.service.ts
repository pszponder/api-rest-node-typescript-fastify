/**
 * The service layer separates the business logic of an application
 * from the communication layer (controller)
 */

import { ItemsData } from "./items.data.js";
import { Item, ItemQuality } from "./items.types.js";

/**
 * ItemsService is responsible for all business logic of the
 * Items resource
 */
export class ItemsService {
  // Use Dependency Injection to accept an instance of the
  //  ItemsData (Data Access Layer)
  constructor(private itemsData: ItemsData) {}

  /**
   * Add a new item to the DB
   * @param name The name of the new item to create
   * @param quality The new item quality
   * @param value The value of the new item
   * @returns Newly created item w/ id from the DB
   */
  addItemAsync = async (name: string, quality: ItemQuality, value: number) => {
    // Create the item from inputs
    const newItem: Item = {
      name,
      quality,
      value,
    };

    const dbItem = await this.itemsData.saveItemAsync(newItem);
    return dbItem;
  };

  /**
   * Retrieve all items from the db
   * @returns All items from the db
   */
  getAllItemsAsync = async () => {
    const dbItems = await this.itemsData.readAllItemsAsync();
    return dbItems;
  };

  /**
   * Searches for and returns item in DB with specified id
   * @param id UUID of the item to search for
   * @returns The found item in the DB
   */
  getItemByIdAsync = async (id: string) => {
    const foundItem = await this.itemsData.readItemByIdAsync(id);
    return foundItem;
  };

  /**
   * Update an item based on passed in options
   * @param id UUID of the item to update
   * @param name optional: The new item name
   * @param quality optional: The new quality of the item
   * @param value optional: The new value of the item
   * @returns updated item from the DB
   */
  updateItemByIdAsync = async (
    id: string,
    name?: string,
    quality?: ItemQuality,
    value?: number,
  ) => {
    const updatedItem = await this.itemsData.updateItemByIdAsync(
      id,
      name,
      quality,
      value,
    );

    return updatedItem;
  };

  /**
   * Delete an item w/ specified id
   * @param id UUID of item to be deleted
   * @returns Deleted Item from the DB
   */
  deleteItemByIdAsync = async (id: string) => {
    const deletedItem = await this.itemsData.deleteItemByIdAsync(id);
    return deletedItem;
  };
}