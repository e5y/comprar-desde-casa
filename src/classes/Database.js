import { Categories } from "../classes/Categories.js";
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
}
