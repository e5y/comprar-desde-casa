import { Business } from "./Business.js";

export class Businesses extends Array {
    constructor(businesses, raw = false) {
        super();
        if (raw)
            this.push(...businesses.map(business => new Business(business, raw)))
        else
            this.push(...businesses.docs.map(business => new Business(business, raw)))
    }
}