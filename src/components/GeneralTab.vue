<template>
  <div class="card m-3">
    <div class="card-header">
      General Settings
    </div>
    <div class="card-body p-3">
      <AppLoader v-if="isShowLoader" />
      <SettingsForm @invalid="$emit('loading',false)" v-else ref="gs-form" :on-submit="storeSettings"
                    class="needs-validation ">
        <div class="row">
          <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold"
                         v-tooltip="'If a coupon is saved without specifying a category, give it this default category.'">
                   Coupon category
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <Field id="default_category" v-model="general_settings.default_category" name="default_category"
                   label="Default category" as="select" class="form-select form-select-sm" rules="required">
              <option value='' disabled>Select</option>
              <option :value="item.id" v-for="item in coupon_category">{{ item.title }}</option>
            </Field>
            <ErrorMessage name="default_category" class="apbd-v-error"/>

          </div>
          <div class="col-md-4 mb-3">
                    <span class="text-muted fw-semibold"
                          v-tooltip="'Always ensure the Regular Price is used and ignore the Sale Price if present.'">
                      Always use regular price
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <div class="form-check">
              <input class="form-check-input" value="sale_price" v-model="general_settings.use_price" type="radio"
                     name="regular_price" id="sale_price">
              <label class="form-check-label" for="sale_price">
                If the sale price is available, use it by default.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" value="regular_price_bogo" type="radio"
                     v-model="general_settings.use_price" name="regular_price_bogo" id="regular_price_bogo" >
              <label class="form-check-label" for="regular_price_bogo">
                Always utilize the regular price, but exclusively for products subject to discounts through BOGO and Add Products coupons.
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" value="regular_price" v-model="general_settings.use_price"
                     name="regular_price" id="regular_price">
              <label class="form-check-label" for="regular_price">
                Always utilize the regular price for all types of coupons.
              </label>
            </div>

          </div>
          <div class="col-md-4 ">
                   <span class="text-muted fw-semibold">
                     Automatically remove coupons for failed/cancelled orders
                   </span>
          </div>
          <div class="col-md-8 ">
            <div class="form-check form-switch">
              <input class="form-check-input" true-value="Y" false-value="N" v-model="general_settings.remove_coupon"
                     type="checkbox" role="switch" id="remove_coupon">
              <label class="form-check-label ms-2" for="remove_coupon">If checked, the system will automatically remove coupons from orders that have failed or been cancelled.</label>
            </div>
          </div>
          <div class="col-md-12 d-flex justify-content-end">
            <button ref="submit-btn" class="btn btn-sm btn-theme" type="submit" v-translate>Save</button>
          </div>
        </div>
      </SettingsForm>
    </div>
  </div>


</template>

<script>
import {Field, ErrorMessage, Form} from 'vee-validate';
import SettingsForm from "@/components/SettingsForm";
import GeneralSettings from "@/model/GeneralSettings";
import {mapStores} from "pinia";
import {useCouponStore} from "@/modules/coupons/CouponStore";
import {useSettingStore} from "@/modules/settings/SettingStore";
import {useCategoryStore} from "@/modules/categories/CategoryStore";
import AppLoader from "@/components/AppLoader";
export default {
  name: "GeneralTab",
  components: {Form, ErrorMessage, Field, SettingsForm,AppLoader},
  data() {
    return {
      isShowLoader:false,
      coupon_category: [],
      general_settings: {},
    }
  },
  mounted() {
    this.getSettings();
    this.getCategoryList();
  },
  computed: {
    ...mapStores(useCouponStore, useSettingStore, useCategoryStore)
  },
  methods: {
    async getCategoryList() {
      this.isShowLoader = true;
      try {
        let response = await this.categoryStore.loadCategories();
        //console.log(response);
        if (response) {
          this.coupon_category = response.rowdata;
        }
        this.isShowLoader = false;
      } catch (e) {
        console.log(e);
      }
    },
    async storeSettings() {
      const filterObj = new GeneralSettings();
      try {

        for (const obj in filterObj) {
          if (this.general_settings.hasOwnProperty(obj) && filterObj.hasOwnProperty(obj)) {
            filterObj[obj] = this.general_settings[obj];
          }
        }
        let response = await this.settingStore.storeSettings(filterObj);
        if (response.status) {
          this.general_settings = response.data;
          this.$appsbdUtls.ShowServerResponseNotification(response.msg,response.status,'5000',);
        }
        this.$emit('loading', false);
      }catch (e) {
        console.log(e.message);
      }

    },
    async getSettings() {
      this.isShowLoader = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.isShowLoader = false;
        this.general_settings = {...resp};
      }
    },
  }
}
</script>

<style scoped>

</style>