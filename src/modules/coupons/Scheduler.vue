<template>
  <div class="card card-white">
    <div class="card-header " :class="is_scheduler_active['status'] == 'Y'?'rounded':''">
      <div class="form-check form-switch">
        <input class="form-check-input" v-model="is_scheduler_active['status']"  type="checkbox" true-value="Y" false-value="N"
                 role="switch" id="flexSwitchCheckDefault">
        <label class="form-check-label ms-3" for="flexSwitchCheckDefault">Scheduler</label>
      </div>
    </div>
    <div class="card-body"  v-if="getStatus">
      <div class="scheduler">
        <div class="row">
          <div class="col-md-6">
            <schedule-day class="mb-3" day-title="Sunday" day-name="sun" :settings="settings"/>
          </div>
          <div class="col-md-6">
            <schedule-day class="mb-3" day-title="Monday" day-name="mon" :settings="settings"/>
          </div>
          <div class="col-md-6">
            <schedule-day class="mb-3" day-title="Tuesday" day-name="tue" :settings="settings"/>
          </div>
          <div class="col-md-6">
            <schedule-day class="mb-3" day-title="Wednesday" day-name="wed" :settings="settings"/>
          </div>
          <div class="col-md-6">
            <schedule-day class="mb-3" day-title="Thursday" day-name="thu" :settings="settings"/>
          </div>
          <div class="col-md-6">
            <schedule-day class="mb-3" day-title="Friday" day-name="fri" :settings="settings"/>
          </div>
          <div class="col-md-6">
            <schedule-day  day-title="Saturday" day-name="sat" :settings="settings"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import {Calendar, DatePicker} from 'v-calendar';
import ScheduleDay from "@/modules/coupons/ScheduleDay";
export default {
  name: "Scheduler",
  components: {ScheduleDay, Calendar, DatePicker, Form, Field, ErrorMessage},
  props:{
    settings:{
      type:Object,
      default:{}
    },
   is_scheduler_active:{
      type:Object,
      default:{}
    }
  },
  mounted() {

  },
  data() {
    return {

    }
  },
  methods:{

  },
  computed:{
    getStatus()
    {
      return this.is_scheduler_active['status']=='Y';
    }
  }
}
</script>

<style scoped lang="scss">

//.vc-bordered,.vc-container{
//  border:none !important;
//  padding: 5px 7px !important;
//}
//
//
//
//.scheduler{
//
//  >div{
//    flex-wrap: wrap;
//  }
//  span{
//    width:100px;
//  }
//  .scheduler{
//    margin-bottom: 0 !important;
//  }
//
//}
</style>