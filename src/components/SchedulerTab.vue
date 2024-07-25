<template>
  <div class="card m-3">
    <div class="card-header">
      Scheduler Settings
    </div>
    <div class="card-body p-3">

      <SettingsForm @invalid="$emit('loading',false)"  ref="ss-form"  :on-submit="storeSettings" class="needs-validation ">
       <div class="row">

      <div class="col-md-4 mb-3">
                   <span class="text-muted fw-semibold">
                        Scheduler Start Time Error Message
                   </span>

      </div>
      <div class="col-md-8 mb-3">
        <Field as="textarea" v-model="scheduler_settings.start_error_msg" placeholder="This coupon has not started yet"  class="form-control form-control-sm" rules="required" label="Start error msg" name="start_error_msg" id="start_error_msg" />
        <ErrorMessage name="start_error_msg" class="apbd-v-error"/>
        <div class="form-text">
          This Message will appear if the applied coupon has not yet become active.
        </div>
      </div>

      <div class="col-md-4">
                    <span class="text-muted fw-semibold">
                       Scheduler End Time Error Message
                   </span>
      </div>
      <div class="col-md-8 ">
        <Field as="textarea" v-model="scheduler_settings.expire_error_msg" placeholder="This coupon has expired"  class="form-control form-control-sm" rules="required" label="Expire error msg" name="expire_error_msg" id="expire_error_msg" />
        <ErrorMessage name="expire_error_msg" class="apbd-v-error"/>
        <div class="form-text">
          This message will show up when attempting to apply a coupon that has already passed its expiration date.
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
import SchedulerSettings from "@/model/SchedulerSettings";
import AppLoader from "@/components/AppLoader";


export default {
name: "SchedulerTab",
  components:{Form,ErrorMessage,Field,SettingsForm,AppLoader},
  data()
  {
    return{
      scheduler_settings:{},
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
      const filterObj = new SchedulerSettings();
      for (const obj in filterObj) {
        if (this.scheduler_settings.hasOwnProperty(obj) && filterObj.hasOwnProperty(obj)) {
          filterObj[obj] = this.scheduler_settings[obj];
        }
      }
      let response = await this.settingStore.storeSettings(filterObj);
      if (response.status ) {
        this.scheduler_settings = response.data;
        this.$appsbdUtls.ShowServerResponseNotification(response.msg,response.status,'5000',);
      }
      this.$emit('loading', false);
    },
    async getSettings() {
      this.isLoading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.isLoading = false;
        this.scheduler_settings = {...resp};
      }
    },
  }
}
</script>

<style scoped>

</style>