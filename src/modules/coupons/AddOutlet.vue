<template>
  <modal :modal-msg="msgs" modal-size="modal-md" ref="product_modal" @onSubmit="submitForm($event)"
         @loading-status="loaderStatusChange" @close="$emit('close')">
    <template v-slot:header>
      <span>{{coupon_id!=null?'Update outlet ':'Add outlet'}} </span>
    </template>
    <template v-slot:body>
      <div class="row">
        <div class="col-md-12 mb-2">
          <div class="form-check form-switch">
            <input class="form-check-input"  v-model="settings['vitepos_settings']['is_all_outlet']" type="checkbox"
                   true-value="Y"
                   false-value="N"
                   role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label ms-3" for="flexSwitchCheckDefault">Select Vitepos All Outlets?</label>
          </div>
        </div>
        <div class="col-md-12" v-if="settings['vitepos_settings']['is_all_outlet']=='N' ">
          <label class="form-label" for="outlet_data">Outlets</label>
          <div class="input-group input-group-sm multiselect-sm">
            <Field id="outlet_data" class="form-select-sm"  :disabled="settings['vitepos_settings']['is_all_outlet']=='Y'" name="outlet_data" label="Outlet"
                   v-model="settings['vitepos_settings']['outlet_data']" rules="required">
              <multiselect
                  v-model="settings['vitepos_settings']['outlet_data']"
                  :disabled="settings['vitepos_settings']['is_all_outlet']=='Y'"
                  mode="tags"
                  label="name"
                  :multiple="true"
                  placeholder="Select Outlet"
                  valueProp="id"


                  :clearOnSelect="true"
                  :close-on-select="true"
                  :options="getOptions">

              </multiselect>
            </Field>
          </div>
          <ErrorMessage name="outlet_data" class="apbd-v-error"/>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="$emit('close')">Cancel
      </button>
      <button type="submit" class="btn btn-sm btn-success" data-dismiss="modal">Submit</button>
    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";
import {Field, ErrorMessage} from 'vee-validate';
import {mapStores} from "pinia";
import {useCouponStore} from "@/modules/coupons/CouponStore";
import Multiselect from '@vueform/multiselect';



export default {
  name: "AddOutlet",
  components: {Modal, Field, ErrorMessage, Multiselect},
  props: {
    coupon_id: {
      default: null,
    },
    settings: {
      type: Object,
      default: {}
    },

  },
  data() {
    return {
      // form_data: {
      //   is_all_outlet: 'N',
      //   outlet_data: [],
      // },
      msgs: null,
      isShowLoader: false,

    }
  },
  mounted() {
     this.showOutlet();

  },
  computed: {
    ...mapStores(useCouponStore),
    getOptions() {
      return this.couponStore.datas?.data?.outlets;
    }
  },
  methods: {
    async showOutlet() {

      if (this.coupon_id != null) {
        this.$refs.product_modal.showLoader(true, "Loading Coupon details");
        try {
          let response = await this.couponStore.showCouponDetails({coupon_id:this.coupon_id});
          if (response.status) {
            const vitepos_settings ={...response.data.general_settings.vitepos_settings};
            this.form_data = vitepos_settings;
          }
          this.$refs.product_modal.showLoader(false);
        } catch (e) {
          console.log(e.message);
        }
      }

    },
    async submitForm(){
        this.msgs={};
        this.$refs.product_modal.showLoader(true, "Saving Outlet...");
        let param={outlet:this.settings['vitepos_settings'],coupon_id:this.coupon_id};
        let response= await this.couponStore.saveOutlet(param);
        this.msgs=response.msg;
        if (response.status)
        {
          this.$emit('reload');
          this.$refs.product_modal.showMsgOnly(response.msg,response.status);
        }else {
          this.$refs.product_modal.showMsgOnly(response.msg,response.status);
        }
        this.$refs.product_modal.showLoader(false);
    },

  },

}
</script>

<style scoped>

</style>