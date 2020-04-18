import { Category } from "./Category.js";

export class Categories extends Array {
    constructor({ docs: categories }) {
        super();
        this.push(...categories.map(category => new Category(category)));
    }
}