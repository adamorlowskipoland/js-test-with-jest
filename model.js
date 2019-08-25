export default class Model {
  constructor(options = {}) {
    const data = options.data || [];
    delete options.data;
    this.$collection = [];
    this.$options = Object.assign({primaryKey: "id"}, options);

    if (data.length) {
      this.record(data)
    }
  }

  record(data) {
    const dataWithIds = data.map(entry => {
      if (entry[this.$options.primaryKey]) {
        return entry
      }
      entry[this.$options.primaryKey] = Date.now();
      return entry;
    });
    this.$collection.push(...dataWithIds);
  }

  all() {
    return this.$collection.map(entry => Object.assign({}, entry));
  }

  find(id) {
    const entry = this.$collection.find(entry => entry[this.$options.primaryKey] === id);
    return entry ? Object.assign({}, entry) : null;
  }

  update(id, data) {
    const entryIndex = this.$collection.findIndex(entry => entry[this.$options.primaryKey] === id);
    if (entryIndex < 0) return false;
    this.$collection.splice(entryIndex, 1, Object.assign(this.$collection[entryIndex], data));
  }

  remove(id) {
    const entryIndex = this.$collection.findIndex(entry => entry[this.$options.primaryKey] === id);
    if (entryIndex > -1) {
      this.$collection.splice(entryIndex, 1);
    }
  }
}
