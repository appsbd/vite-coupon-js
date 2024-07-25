<template>
  <div class="card m-3 card-white">

    <div class="card-body p-3">
      <div class="d-flex justify-content-end">
        <ul class="nav apbd-tab-nav w-100">
          <li class="nav-item">
            <router-link to="/settings/general-settings" class="apbd-tab-btn" >
              <i class=""></i> <translate>General Settings</translate>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/settings/message-settings" class="apbd-tab-btn" >
              <i class=""></i> <translate>Message Settings</translate>
            </router-link>
          </li>
<!--          <li class="nav-item">-->
<!--            <router-link to="/settings/usage-settings" class="apbd-tab-btn" >-->
<!--              <i class=""></i> <translate>Usage Settings</translate>-->
<!--            </router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/settings/scheduler" class="apbd-tab-btn" >-->
<!--              <i class=""></i> <translate>Scheduler Settings</translate>-->
<!--            </router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link to="/settings/role" class="apbd-tab-btn" >-->
<!--              <i class=""></i> <translate>Role Settings</translate>-->
<!--            </router-link>-->
<!--          </li>-->
          <li class="nav-item">
            <router-link to="/settings/url" class="apbd-tab-btn" >
              <i class=""></i> <translate>URL Coupons</translate>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
       <div>
         <RouterView></RouterView>
       </div>
</template>

<script>
import {  Field, ErrorMessage,Form } from 'vee-validate';

import GeneralTab from "@/components/GeneralTab";
import SchedulerTab from "@/components/SchedulerTab";
import RoleTab from "@/components/RoleTab";
import UrlTab from "@/components/UrlTab";
export default {
name: "AllSettings",
  components:{UrlTab, RoleTab, SchedulerTab, GeneralTab,  Field,ErrorMessage,Form}
}
</script>

<style scoped>

</style>