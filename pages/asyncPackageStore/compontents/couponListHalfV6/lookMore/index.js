Component({
  lazyObj: {
    epSelector: ".look-more-btn",
    needExposure: true,
  },
  properties: {
    mainTitle: {
      type: String,
      value: "",
    },
    userAction: {
      type: String,
      value: "",
    },
    traceId: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
  },
});