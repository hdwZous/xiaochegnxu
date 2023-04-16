class Bus {
    constructor() {
      this.map = new Map()
    }
    emit(name, data) {
      this.map.set(name, data)
    }
    once(name, callback) {
      if (this.map.has(name)) {
        let data = this.map.get(name)
        this.map.delete(name)
        callback.call(null, data)
      }
    }
}
let bus = new Bus()
export default bus