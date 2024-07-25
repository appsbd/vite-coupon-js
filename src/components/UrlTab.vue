<template>
  <div class="card m-3">
    <div class="card-header">
      URL Coupons
    </div>
    <div class="card-body p-3">

      <SettingsForm @invalid="$emit('loading',false)"  ref="us-form" :on-submit="storeSettings"
                    class="needs-validation ">
        <div class="row">

          <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                        URL prefix
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <Field type="text" class="form-control form-control-sm" v-model="url_coupon.url_prefix" id="url_prefix"
                   label="Url Prefix" name="url_prefix" placeholder="Coupon" rules="required|url"/>
            <ErrorMessage name="url_prefix" class="apbd-v-error"/>
            <div class="form-text">
              The prefix to be utilized preceding the coupon code.<br>
              Eg. http://vitepos.com/coupon_plugin/code/name
            </div>

          </div>
          <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                       Redirect URL after applying coupon
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <Field type="text" class="form-control form-control-sm " id="redirect_url"
                   label="Redirect url" name="redirect_url" v-model="url_coupon.redirect_url"
                   placeholder="http://localhost/coupon_plugin/cart/"
                   rules="required|url"/>
            <ErrorMessage name="redirect_url" class="apbd-v-error"/>
            <div class="form-text">
              Upon attempting to apply the coupon, users will be redirected to the provided URL.
            </div>

          </div>
          <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                       Redirect URL after applied invalid coupon
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <Field type="text" class="form-control form-control-sm " id="invalid_redirect_url"
                   label="Invalid redirect url" v-model="url_coupon.invalid_redirect_url" name="invalid_redirect_url"
                   placeholder="http://localhost/coupon_plugin/cart/"
                   rules="required|url"/>
            <ErrorMessage name="invalid_redirect_url" class="apbd-v-error"/>
            <div class="form-text">
             This will redirect the user to the provided URL if an invalid coupon has been applied.
            </div>

          </div>
          <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                      Success message
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <Field as="textarea" class="form-control form-control-sm " id="success_message"
                   label="Success message" v-model="url_coupon.success_message" name="success_message"
                   placeholder="Coupon applied successfully"
                   rules="required"/>
            <ErrorMessage name="success_message" class="apbd-v-error"/>
            <div class="form-text">
              Users will be redirected to the provided URL in the event of applying valid coupon.
            </div>

          </div>
          <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                     Disable message
                   </span>
          </div>
          <div class="col-md-8 mb-3">
            <Field as="textarea" class="form-control form-control-sm " id="disable_message"
                   label="Disable message" v-model="url_coupon.disable_message" name="disable_message"
                   placeholder="Inactive coupon url"
                   rules="required"/>
            <ErrorMessage name="disable_message" class="apbd-v-error"/>
            <div class="form-text">
              This message will appear when the functionality for coupon URLs is disabled.
            </div>

          </div>
          <div class="col-md-4">
                   <span class="text-muted fw-semibold">
                     Hide coupon fields
                   </span>
          </div>
          <div class="col-md-8">
            <div class="form-check form-switch">
              <input class="form-check-input" v-model="url_coupon.is_show_checkout" type="checkbox" true-value="Y"
                     false-value="N" role="switch" id="flexSwitchCheckChecked" checked>
              <label class="form-check-label ms-2" for="flexSwitchCheckChecked">Hide the coupon fields from the cart and checkout pages on the client side.</label>
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
import {mapStores} from 'pinia';
import {useSettingStore} from "@/modules/settings/SettingStore";
import UrlSettings from "@/model/UrlSettings";
import AppLoader from "@/components/AppLoader";

export default {
  name: "UrlTab",
  components: {Form, ErrorMessage, Field, SettingsForm,AppLoader},
  data() {
    return {
      url_coupon: {},
      isLoading:false,

    }
  },
  mounted() {
    this.getSettings();
  },
  computed:{
    ...mapStores(useSettingStore)
  },
  methods:{
    async storeSettings()
    {
      const filterObj = new UrlSettings();
      for (const obj in filterObj) {
        if (this.url_coupon.hasOwnProperty(obj) && filterObj.hasOwnProperty(obj)) {
          filterObj[obj] = this.url_coupon[obj];
        }
      }
      let response = await this.settingStore.storeSettings(filterObj);
      if (response.status) {
        this.url_coupon = response.data;
        this.$appsbdUtls.ShowServerResponseNotification(response.msg,response.status,'5000',);
      }
      this.$emit('loading', false);
    },
    async getSettings()
    {
      this.isLoading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.isLoading = false;
        this.url_coupon = {...resp};
      }
    },
  }
}
</script>

<style scoped>

</style>