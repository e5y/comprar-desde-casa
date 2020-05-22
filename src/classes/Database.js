import * as geofirex from "geofirex";
import { get } from "geofirex";

export class Database {
  constructor(database) {
    this.database = database;
    this.geofirex = geofirex.init(database);
  }

  getCategories() {}
}
