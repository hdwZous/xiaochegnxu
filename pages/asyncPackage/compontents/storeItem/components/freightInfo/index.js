Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    storeItem: {
      type: Object,
      value: {},
    },
  },
  methods: {
    goToStore(e) {
      let owner = this.selectOwnerComponent()
      owner.goToStore(e)
    }
  }
});
