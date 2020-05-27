import { get } from "svelte/store";
import slugify from "slugify";
import { categories, db, storage } from "../stores.js";
import { Owner } from "../classes/Owner.js";
import {
  arrayToDays,
  makeCommaSeparatedString,
  randBetween,
} from "../utilities.js";

export class Business {
  constructor(business, raw = false) {
    Object.assign(this, {
      owner_id: "",
      name: "Sin nombre",
      position: null,
      location: "",
      phone: "",
      whatsapp: false,
      category: "otros",
      delivery_days: [],
      delivery_radius: "",
      description: "Sin descripción..",
      url: "",
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
      Object.assign(this, business);
    }
  }

  async getOwner() {
    if (!this.owner) {
      this.owner = new Owner(
        await get(db).collection("owners").doc(this.owner_id).get()
      );
    }
    return this.owner;
  }

  async getImages() {
    if (!this._images) {
      this._images = [];
      const { items } = await get(storage).ls(`businesses/${this.id}/images`);
      const images = await Promise.all(
        items.map(async (item) => {
          item.url = await item.getDownloadURL();
          let file = await fetch(item.url)
            .then((r) => r.blob())
            .then((blobFile) => new File([blobFile], item.name));
          await this.addImageFromFile(file);
        })
      );
    }
    return this._images;
  }

  async removeImage(image) {
    this._images = this._images.filter((_image) => _image.id !== image.id);
    return this._images;
  }

  async addImageFromFile(file) {
    const dataURL = await new Promise((res, rej) => {
      try {
        const reader = new FileReader();
        reader.addEventListener("load", ({ target: { result } }) =>
          res(result)
        );
        reader.readAsDataURL(file);
      } catch (e) {
        rej(e);
      }
    });
    file.url = dataURL;
    this._images.push(new BusinessImage(file));
    return this._images;
  }

  get id() {
    return this._id || slugify(this.name) + "-" + this._rand;
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
      createdAt: firebase.firestore.Timestamp.now(),
    };
  }

  get category_hr() {
    return get(categories).find((category) => category.id === this.category)
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

class BusinessImage {
  constructor(itemOrFile) {
    this.itemOrFile = itemOrFile;
    this.type = itemOrFile instanceof File ? "file" : "item";
  }
  get ext() {
    return this.type === "file" ? this.itemOrFile.name.split(".").pop() : "";
  }
  get id() {
    return this.type === "file"
      ? this.itemOrFile.name
      : this.itemOrFile.fullPath;
  }
  get url() {
    return this.itemOrFile.url;
  }
}
