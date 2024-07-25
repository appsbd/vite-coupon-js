<template>
  <div class="card m-3">
    <div class="card-header">
     Usage Settings
    </div>
    <div class="card-body p-3">
      <SettingsForm @invalid="$emit('loading',false)" ref="ss-form"  :on-submit="storeSettings" class="needs-validation ">
       <div class="row">
         <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                        Coupon Usage Error Message
                   </span>

      </div>
      <div class="col-md-8 mb-3">
        <Field as="textarea" v-model="usage_settings.coupon_error_msg" placeholder="Coupon usage error message"  class="form-control form-control-sm" rules="required" label="Coupon error msg" name="coupon_error_msg" id="coupon_error_msg" />
        <ErrorMessage name="coupon_error_msg" class="apbd-v-error"/>
        <div class="form-text">
          This message will be shown when the coupon usage limit has been exceeded.
        </div>
      </div>

      <div class="col-md-4">
                    <span class="text-muted fw-semibold">
                       User Usage Error Message
                   </span>
      </div>
      <div class="col-md-8 ">
        <Field as="textarea" v-model="usage_settings.user_error_msg" placeholder="User usage error message"  class="form-control form-control-sm" rules="required" label="User error msg" name="user_error_msg" id="user_error_msg" />
        <ErrorMessage name="user_error_msg" class="apbd-v-error"/>
        <div class="form-text">
          This message will be displayed when the user usage limit has been surpassed.
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
import {  Field, ErrorMessage,Form } from 'vee-validate';
import SettingsForm from "@/components/SettingsForm";
import {mapStores} from 'pinia';
import {useSettingStore} from "@/modules/settings/SettingStore";
import UsageSettings from "@/model/UsageSettings";
import AppLoader from "@/components/AppLoader";
export default {
name: "UsageTab",
  components:{Form,ErrorMessage,Field,SettingsForm,AppLoader},
  data()
  {
    return{
      usage_settings:{},
      isLoading:false
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
      const filterObj = new UsageSettings();
      for (const obj in filterObj) {
        if (this.usage_settings.hasOwnProperty(obj) && filterObj.hasOwnProperty(obj)) {
          filterObj[obj] = this.usage_settings[obj];
        }
      }
      let response = await this.settingStore.storeSettings(filterObj);
      if (response.status ) {
        this.usage_settings = response.data;
        this.$appsbdUtls.ShowServerResponseNotification(response.msg,response.status,'5000',);
      }
      this.$emit('loading', false);
    },
    async getSettings() {
      this.isLoading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.isLoading = false;
        this.usage_settings = {...resp};
      }
    },
  }
}
</script>

<style scoped>

</style>