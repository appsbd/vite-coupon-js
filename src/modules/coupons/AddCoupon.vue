<template>
  <modal :modal-msg="msgs" modal-size="modal-xl" ref="product_modal"  @onSubmit="submitForm($event)" @loading-status="loaderStatusChange" @close="$emit('close')">
    <template v-slot:header>
      <span>{{coupon_id!=null?'Update Coupon':'Add Coupon'}} </span>
    </template>
    <template v-slot:body>
      <div class="row g-3">
        <div class="col-sm-12">
          <GeneralSettings :settings="all_settings.general_settings"/>
        </div>
        <div class="col-sm-12">
          <UsageSettings :settings="all_settings.usage_settings"/>
        </div>
        <div class="col-sm-12">
          <Scheduler :settings="all_settings.scheduler" :is_scheduler_active="all_settings.is_scheduler_active" />
        </div>
        <div class="col-sm-12">
          <RuleModule :rules="all_settings.condition"   />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="$emit('close')" >Cancel</button>
      <button type="submit" class="btn btn-sm btn-theme"  data-dismiss="modal" >Submit</button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";
import {  Field, ErrorMessage } from 'vee-validate';
import {mapStores} from "pinia";
import GeneralSettings from "@/modules/coupons/GeneralSettings";
import Scheduler from "@/modules/coupons/Scheduler";
import RuleModule from "@/modules/coupons/RuleModule";
import UsageSettings from "@/modules/coupons/UsageSettings";
import {Coupons} from "@/model/Rules";
import {useCouponStore} from "@/modules/coupons/CouponStore";



export default {
  name: "AddCoupon",
  components:{RuleModule,UsageSettings, Scheduler, GeneralSettings, Modal,Field,ErrorMessage},
  props:{
    coupon_id:{
      default:null,
    }
  },
  data()
  {
    return{
      all_settings:new Coupons(),
      oldData: {},
      msgs:null,
      isShowLoader:false,

    }
  },
  mounted() {
    this.showCoupon();

  },
  computed:{
    ...mapStores(useCouponStore),
  },
  methods:{
    get_form_data(){
      let all_obj=structuredClone(this.all_settings);
      // if(this.coupon_id!=null) {
      //   let form_params = this.$appsbdUtls.changedFormData(this.all_settings, this.oldData);
      //   console.log(form_params);
      //   return form_params;
      // }
      return all_obj;
    },
    async submitForm(){
      if(this.coupon_id !=null)
      {
       // const formData =this.get_form_data();
        this.$refs.product_modal.showLoader(true, "Updating Coupon...");
        let response= await this.couponStore.updateCoupon(this.all_settings);
        this.msgs=response.msg;
        if (response.status)
        {
          this.$emit('reload');
          this.$refs.product_modal.showMsgOnly(response.msg,response.status);
        }else {
          this.$refs.product_modal.showMsgOnly(response.msg,response.status);
        }
        this.$refs.product_modal.showLoader(false);
      }
      else{
        this.msgs={};
        //const formData =this.get_form_data();
        this.$refs.product_modal.showLoader(true, "Saving Coupon...");

        let response= await this.couponStore.saveCoupon(this.all_settings);
        this.msgs=response.msg;
        if (response.status)
        {
          this.$emit('reload');
          this.$refs.product_modal.showMsgOnly(response.msg,response.status);
        }else {
          this.$refs.product_modal.showMsgOnly(response.msg,response.status);
        }
        this.$refs.product_modal.showLoader(false);
      }

    },
    async showCoupon() {

      if (this.coupon_id != null) {
        let all_obj=structuredClone(this.all_settings);
        this.$refs.product_modal.showLoader(true, "Loading Coupon details");
        try {
          let response = await this.couponStore.showCouponDetails({coupon_id:this.coupon_id});
          if (response.status) {

            this.all_settings = response.data;

            this.oldData=structuredClone(response.data);

            if(! this.all_settings.hasOwnProperty('condition'))
            {
                this.all_settings.condition=all_obj.condition;
            }
            if(! this.all_settings.hasOwnProperty('scheduler'))
            {
                this.all_settings.scheduler=all_obj.scheduler;
            }
          }
          this.$refs.product_modal.showLoader(false);
        } catch (e) {
          console.log(e.message);
        }
      }

    }



  },

}
</script>

<style scoped>

</style>