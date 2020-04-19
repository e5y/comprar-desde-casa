import { Business } from "./Business.js";

export class Businesses extends Array {
    constructor(businesses, raw = false) {
        super();
        this.push(...businesses.map(business => new Business(business, raw)))
    }
}