export class Owner {
  constructor(owner) {
    Object.assign(this, {
      name: "",
      email: "",
    });

    if (owner) {
      this.id = owner.id;
      Object.assign(this, owner.data());
    }
  }

  get export() {
    return {
      name: this.name,
      email: this.email,
    };
  }
}
