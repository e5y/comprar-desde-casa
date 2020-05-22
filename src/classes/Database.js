import { Categories } from "../classes/Categories.js";
import { Businesses } from "../classes/Businesses.js";
import { Business } from "../classes/Business.js";
import { Owner } from "../classes/Owner.js";
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

  async getOwner(business) {
    return new Owner(
      await this.database.collection("owners").doc(business.id).get()
    );
  }

  async deleteBusiness(collection, business) {
    return this.database.collection(collection).doc(business.id).delete();
  }

  async deleteApprovedBusiness(business) {
    return this.deleteBusiness("approved_businesses", business);
  }

  async deletePendingBusiness(business) {
    return this.deleteBusiness("pending_businesses", business);
  }

  async deleteRejectedBusiness(business) {
    return this.deleteBusiness("rejected_businesses", business);
  }

  async updateBusiness(collection, business) {
    return this.database
      .collection(collection)
      .doc(business.id)
      .set(business.export);
  }

  async updateApprovedBusiness(business) {
    return this.updateBusiness("approved_businesses", business);
  }

  async updatePendingBusiness(business) {
    return this.updateBusiness("pending_businesses", business);
  }

  async updateRejectedBusiness(business) {
    return this.updateBusiness("rejected_businesses", business);
  }

  async getBusiness(collection, id) {
    return new Business(
      await this.database.collection(collection).doc(id).get()
    );
  }

  async getApprovedBusiness(id) {
    return this.getBusiness("approved_businesses", id);
  }

  async getPendingBusiness(id) {
    return this.getBusiness("pending_businesses", id);
  }

  async getRejectedBusiness(id) {
    return this.getBusiness("rejected_businesses", id);
  }

  async getBusinesses(collection, userId) {
    return new Businesses(
      await this.database
        .collection(collection)
        .where("owner_id", "==", userId)
        .get()
    );
  }

  async getApprovedBusinesses(userId) {
    return this.getBusinesses("approved_businesses", userId);
  }

  async getPendingBusinesses(userId) {
    return this.getBusinesses("pending_businesses", userId);
  }

  async getRejectedBusinesses(userId) {
    return this.getBusinesses("rejected_businesses", userId);
  }
}