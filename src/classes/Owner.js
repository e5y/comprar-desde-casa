export class Owner {
  constructor(owner) {
    Object.assign(this, {
      name: "",
      email: "",
    });

    if (owner) {
      if (owner.empty) {
        this.empty = true;
        return;
      }
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
