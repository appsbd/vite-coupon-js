<template>
  <div class="row g-3">
    <div class="col-sm-12">
      <GeneralSettings :settings="all_settings.general_settings"/>
    </div>
    <div class="col-sm-4">
      <UsageSettings/>
    </div>
    <div class="col-sm-8">
      <Scheduler/>
    </div>
    <div class="col-sm-12">
      <AddAddonModal/>
    </div>

  </div>
</template>

<script>
import GeneralSettings from "@/modules/coupons/GeneralSettings";
import UsageSettings from "@/modules/coupons/UsageSettings";
import Scheduler from "@/modules/coupons/Scheduler";
import RuleModule from "@/modules/coupons/RuleModule";

export default {
  name: "CouponForm",
  components: {RuleModule, Scheduler, UsageSettings, GeneralSettings},
  data() {
    return {
      all_settings:{
        general_settings:{},
        user_settings:{},
        scheduler:{}
      }
    }
  },
}
</script>

<style scoped>

</style>