import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    //监听item里的图片是否加载完毕
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    //对监听的函数进行保存
    this.itemImgListener=() => {
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  deactivated(){
    //取消全局事件
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  
}
export const backTopMixin = {
  components: { BackTop },
  data() {
    return {
      backActive: false,
      
    }
  },
  methods: {
    getBack() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
}