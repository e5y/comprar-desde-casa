import { Categories } from "../classes/Categories.js";
import { Businesses } from "../classes/Businesses.js";
import * as geofirex from "geofirex";
import { get } from "geofirex";

export class Database {
  constructor(database) {
    this.database = database;
    this.geofirex = geofirex.init(database);
  }

  async getCategories() {
    return new Categories(
      await this.database
        .collection("categories")
        .where("visible", "==", true)
        .orderBy("order")
        .get()
    );
  }

  async getBusinesses(collection, userId) {
    return new Businesses(
      await this.database
        .collection(collection)
        .where("owner_id", "==", userId)
        .get()
    );
  }

  async getPendingBusinesses(userId) {
    return this.getBusinesses("pending_businesses", userId);
  }

  async getApprovedBusinesses(userId) {
    return this.getBusinesses("approved_businesses", userId);
  }
}
