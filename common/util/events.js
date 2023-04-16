class EventsEmitter {
  constructor() {
    this.events = new Map()
  }
  addListener(name, callback) {
    if (!this.events.has(name)) {
      this.events.set(name, callback)
      // console.log("addListener", this.events);
    }
  }
  emit(name, data) {
    if (this.events.has(name)) {
      this.events.get(name)(data)
      // console.log("emit", this.events);
    }
  }
  removeListener(name) {
    const names = [].concat(name || [])
    names.forEach(name => {
        if (this.events.has(name)) {
            this.events.delete(name)
        }
    })
  }
}
let emitter = new EventsEmitter()
export default emitter