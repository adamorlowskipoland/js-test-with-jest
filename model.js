export default class Model {
  constructor(data = []) {
    this.$collection = [];

    if (data.length) {
      this.record(data)
    }
  }

  record(data) {
    this.$collection.push(...data);
  }

  all() {
    return this.$collection.map(entry => Object.assign({}, entry));
  }

  find(phrase) {
    const entry = this.$collection.find(entry => entry.name === phrase);
    if (entry) {
      return entry;
    }
    return null;
  }

  update() {
  }
}
