import { isLogin } from "../../../../../../common/util/loginUtil";
Component({
  properties: {
    // 主文案
    mainTitle: {
      type: String,
      value: "",
    },
    // 副文案
    subtitle: {
      type: String,
      value: "",
    },
    // 地址
    poi: {
      type: String,
      value: "",
    },
    imageUrl: {
      type: String,
      value: "",
    },
  },
  data: {
    isLogin: isLogin(),
  },
  methods: {
  },
});
