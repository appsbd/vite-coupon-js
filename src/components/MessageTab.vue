<template>
  <div v-if="isLoading">
    <AppLoader  />
  </div>
  <div v-else>
    <div class="card m-3">
      <div class="card-header">
        Message Settings
      </div>
      <div class="card-body p-3">
        <SettingsForm @invalid="$emit('loading',false)" ref="ss-form"  :on-submit="storeSettings" class="needs-validation ">
          <div class="row">

            <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                        Coupon Success Message
                   </span>

            </div>
            <div class="col-md-8 mb-3">
              <Field as="textarea" v-model="message_settings.success_msg" placeholder="Coupon success message"  class="form-control form-control-sm" rules="required" label="Coupon success msg" name="coupon_success_msg" id="coupon_success_msg" />
              <ErrorMessage name="coupon_success_msg" class="apbd-v-error"/>
              <div class="form-text">
                This message will be shown when the coupon is applied successfully.
              </div>
            </div>

            <div class="col-md-4">
                    <span class="text-muted fw-semibold">
                       Coupon Error Message
                   </span>
            </div>
            <div class="col-md-8 ">
              <Field as="textarea" v-model="message_settings.error_msg" placeholder="Coupon error message"  class="form-control form-control-sm" rules="required" label="Coupon error msg" name="coupon_error_msg" id="coupon_error_msg" />
              <ErrorMessage name="coupon_error_msg" class="apbd-v-error"/>
              <div class="form-text">
                This message will be displayed when the invalid coupon is applied.
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-end">
              <button ref="submit-btn" class="btn btn-sm btn-theme" type="submit" v-translate>Save</button>
            </div>
          </div>
        </SettingsForm>
      </div>
    </div>
    <SchedulerTab />
    <UsageTab />
    <RoleTab />
  </div>


</template>

<script>
import {  Field, ErrorMessage,Form } from 'vee-validate';
import SettingsForm from "@/components/SettingsForm";
import {mapStores} from 'pinia';
import {useSettingStore} from "@/modules/settings/SettingStore";

import AppLoader from "@/components/AppLoader";
import MessageSettings from "@/model/MessageSettings";
import SchedulerTab from "@/components/SchedulerTab";
import UsageTab from "@/components/UsageTab";
import RoleTab from "@/components/RoleTab";
export default {
name: "MessageTab",
  components:{RoleTab, UsageTab, SchedulerTab, Form,ErrorMessage,Field,SettingsForm,AppLoader},
  data()
  {
    return{
      message_settings:{},
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
      const filterObj = new MessageSettings();
      for (const obj in filterObj) {
        if (this.message_settings.hasOwnProperty(obj) && filterObj.hasOwnProperty(obj)) {
          filterObj[obj] = this.message_settings[obj];
        }
      }
      let response = await this.settingStore.storeSettings(filterObj);
      if (response.status ) {
        this.message_settings = response.data;
        this.$appsbdUtls.ShowServerResponseNotification(response.msg,response.status,'5000',);
      }
      this.$emit('loading', false);
    },
    async getSettings() {
      this.isLoading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.isLoading = false;
        this.message_settings = {...resp};
      }
    },
  }
}
</script>

<style scoped>

</style>