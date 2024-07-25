<template>
  <div class="card card-white">
    <div class="card-header">
      Usage Settings
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <label class="form-label " for="coupon_usage_limit">Coupon Usage Limit</label>
          <Field type="text" v-model="settings['coupon_usage_limit']" class="form-control form-control-sm" id="coupon_usage_limit"
                 label="Coupon Usage Limit" name="coupon_usage_limit"  rules="required"/>
          <ErrorMessage name="coupon_usage_limit" class="apbd-v-error"/>
        </div>
        <div class="col-md-6">
          <label class="form-label col-md-6" for="user_usage_limit">User Usage Limit</label>
          <Field type="text" v-model="settings['user_usage_limit']" class="form-control form-control-sm" id="user_usage_limit"
                 label="User Usage Limit" name="user_usage_limit"  rules="required"/>
          <ErrorMessage name="user_usage_limit" class="apbd-v-error"/>
        </div>
      </div>
      </div>
  </div>

</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";

export default {
  name: "UsageSettings",
  components: {Form, Field, ErrorMessage},
  props:{
    settings:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      usage_settings: {
        coupon_usage_limit: 0,
        user_usage_limit: 0,
      }
    }
  },
}
</script>

<style scoped>

</style>