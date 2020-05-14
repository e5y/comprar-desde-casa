import { get } from "svelte/store";
import slugify from 'slugify';
import { categories, db } from "../stores.js";
import { arrayToDays, makeCommaSeparatedString, randBetween } from "../utilities.js";

export class Business {
    constructor(business, raw = false) {
        Object.assign(this, {
            owner_id: "",
            name: "Sin nombre",
            position: null,
            location: "",
            phone: "",
            whatsapp: false,
            category: 'otros',
            delivery_days: [],
            delivery_radius: "",
            description: "Sin descripción..",
            url: ""
        });

        this._rand = randBetween(10000, 99999);

        if (business && !raw) {
            if (!business.exists) throw new Error("Business doesn't exist.");
            this._id = business.id;
            const data = business.data();
            Object.assign(this, data);
        } else if (business) {
            this._id = business.id;
            delete business.id;
            Object.assign(this, business)
        };
    }

    async getOwner() {
        if (!this.owner) {
            const owner = await get(db)
                .collection('users')
                .doc(this.owner_id)
                .get();
            this.owner = owner.data();
        }
        return this.owner;
    }

    get id() {
        return this._id || slugify(this.name) + '-' + this._rand;
    }

    get export() {
        return {
            owner_id: this.owner_id,
            name: this.name,
            position: this.position,
            location: this.location,
            phone: this.phone,
            whatsapp: this.whatsapp,
            category: this.category,
            delivery_days: this.delivery_days,
            delivery_radius: this.delivery_radius,
            description: this.description,
            url: this.url,
            createdAt: firebase.firestore.Timestamp.now()
        };
    }

    get category_hr() {
        return get(categories)
            .find(category => category.id === this.category)
            .name;
    }

    get marker() {
        return `/markers/${this.category}.png`;
    }

    get delivery_days_hr() {
        return makeCommaSeparatedString(arrayToDays(this.delivery_days));
    }

    get delivery_radius_hr() {
        return `${this.delivery_radius} km`;
    }

    get permalink() {
        return `https://comprardesdecasa.com.ar/negocio/${this.id}`;
    }
}