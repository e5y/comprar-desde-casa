export class Category {
    constructor(category) {
        this.id = category.id;
        const data = category.data();
        delete data.img;
        Object.assign(this, data);
    }

    get img() {
        return `/categories/${this.id}.jpg`;
    }
}