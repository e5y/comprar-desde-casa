import { Categories } from "../classes/Categories.js";
import { Businesses } from "../classes/Businesses.js";
import { Business } from "../classes/Business.js";
import { Owner } from "../classes/Owner.js";
import * as geofirex from "geofirex";
import { get as geoGet } from "geofirex";

export class Database {
  constructor(firebase) {
    this.database = firebase.firestore();
    this.geofirex = geofirex.init(firebase);
  }

  createPosition(lat, lng) {
    return this.geofirex.point(lat, lng);
  }

  async getApprovedBusinessesInRadius(position, radius, category = "todos") {
    const query =
      category === "todos"
        ? this.database.collection("approved_businesses")
        : this.database
            .collection("approved_businesses")
            .where("category", "==", category);

    const geoQuery = this.geofirex
      .query(query)
      .within(
        this.geofirex.point(
          position.coords.latitude,
          position.coords.longitude
        ),
        radius,
        "position"
      );

    // TODO: Remove Geofirex and replace with Geofirestore-js, will break Businesses and Business classes.
    return new Businesses(await geoGet(geoQuery), true);
  }

  async addBusiness(collection, business, owner) {
    await this.database
      .collection("owners")
      .doc(business.owner_id)
      .set(owner.export);
    await this.database
      .collection(collection)
      .doc(business.id)
      .set(business.export);
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
      await this.database.collection("owners").doc(business.owner_id).get()
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
