<template>
  <div class="card m-3">
    <div class="card-header">
      Role Restriction
    </div>
    <div class="card-body p-3">
      <AppLoader v-if="isLoading" />
      <SettingsForm @invalid="$emit('loading',false)" ref="rs-form" v-else  :on-submit="storeSettings" class="needs-validation ">
        <div class="row">

          <div class="col-md-4 ">
                   <span class="text-muted fw-semibold">
                        Role error message
                   </span>

          </div>
          <div class="col-md-8 ">
            <Field as="textarea" placeholder="You are not allowed to use this coupon" v-model="role_settings.invalid_role"  class="form-control" rules="required" label="Invalid role" name="invalid_role" id="invalid_role" />
            <ErrorMessage name="invalid_role" class="apbd-v-error"/>
            <div class="form-text">
              This message will be shown when the coupon is deemed invalid for the specified role.
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
import AppLoader from "@/components/AppLoader";
import {mapStores} from 'pinia';
import {useSettingStore} from "@/modules/settings/SettingStore";
import RoleSettings from "@/model/RoleSettings";
export default {
name: "RoleTab",
  components:{Form,ErrorMessage,Field,SettingsForm,AppLoader},
  data()
  {
    return{
      role_settings:{},
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
      const filterObj = new RoleSettings();
      for (const obj in filterObj) {
        if (this.role_settings.hasOwnProperty(obj) && filterObj.hasOwnProperty(obj)) {
          filterObj[obj] = this.role_settings[obj];
        }
      }
      let response = await this.settingStore.storeSettings(filterObj);
      if (response.status ) {
        this.role_settings = response.data;
        this.$appsbdUtls.ShowServerResponseNotification(response.msg,response.status,'5000',);
      }
      this.$emit('loading', false);
    },
    async getSettings() {
      this.isLoading = true;
      let resp = await this.settingStore.loadSettings();
      if (resp) {
        this.isLoading = false;
        this.role_settings = {...resp};
      }
    },
  }
}
</script>

<style scoped>

</style>