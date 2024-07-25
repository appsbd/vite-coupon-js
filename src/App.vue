<template>
  <AppLoader  v-if="isLoading" msg="Initial Data Is Loading ..." />
  <router-view v-else></router-view>
</template>
<script>

import {useCouponStore} from "@/modules/coupons/CouponStore";
import {mapStores} from 'pinia'
import AppLoader from "@/components/AppLoader";
import APBDRequestParam from "@/libraries/APBDRequestParam";
export default {
  name: 'App',
  components:{AppLoader},
  data()
  {
    return{
      isLoading:false,
      app_product:{

        page:1,
        total:1,
        records:0,
        limit:20,

      },

    }
  },
  mounted() {
   this.loadInitialDatas();
   this.getProducts();
  },
  computed:{
    ...mapStores(useCouponStore)
  },
  methods:{
    async loadInitialDatas() {
      this.isLoading = true;
      try {
        let resp = await this.couponStore.loadInitialDatas();
        if (resp) {
          this.isLoading = false;
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    async getProducts(){
      this.isLoading=true;
      let param= new APBDRequestParam();
      param.limit = this.app_product.limit;
      param.page = this.app_product.page;
      try {
        let response =  await this.couponStore.loadProducts(param);
          if (response) {
          this.isLoading=false;
          }
      }catch (e) {
        console.log(e);
      }
    },
  }
}
</script>
