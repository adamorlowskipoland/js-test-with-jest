export default class Model {
  constructor(data = []) {
    this.$collection = [];

    if (data.length) {
      this.record(data)
    }
  }

  record(data) {
    const dataWithIds = data.map(entry => {
      if (entry.id) {
        return entry
      }
      entry.id = Date.now();
      return entry;
    });
    this.$collection.push(...dataWithIds);
  }

  all() {
    return this.$collection.map(entry => Object.assign({}, entry));
  }

  find(id) {
    const entry = this.$collection.find(entry => entry.id === id);
    return entry ? Object.assign({}, entry) : null;
  }

  update(id, data) {
    const entryIndex = this.$collection.findIndex(entry => entry.id === id);
    if (entryIndex < 0) return false;
    this.$collection.splice(entryIndex, 1, Object.assign(this.$collection[entryIndex], data));
  }
}
