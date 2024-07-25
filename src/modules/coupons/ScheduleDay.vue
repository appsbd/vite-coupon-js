<template>
  <div class="input-group input-group-sm apbd-sch-input" v-if="settings[dayName]">
    <span class="input-group-text apbd-sch-day">{{ dayTitle }}</span>
    <div class="input-group-text" >
      <div class="form-check from-check-inline">
        <input class="form-check-input mt-0" type="checkbox" v-model="settings[dayName]['all_day']"
               :id="dayName+'all_day'">
        <label class="form-check-label" :for="dayName+'all_day'">
          All Day
        </label>
      </div>
    </div>
    <div class="form-control has-vc-container">
      <DatePicker :style="settings[dayName]['all_day']?'pointerEvents:none;':''" v-model.string="settings[dayName]['start_time']"  :masks='{ modelValue:"YYYY-MM-DD h:mm:ss A" }' mode="time" hide-time-header />
      <ErrorMessage name="sunday_start_time" class="apbd-v-error"/>
    </div>
    <div class="input-group-text" >
      -
    </div>
    <div class="form-control has-vc-container">
      <DatePicker :style="settings[dayName]['all_day']?'pointerEvents:none;':''"  v-model.string="settings[dayName]['end_time']" mode="time" :masks='{ modelValue:"YYYY-MM-DD h:mm:ss A" }' hide-time-header />
      <ErrorMessage name="sunday_end_time" class="apbd-v-error"/>
    </div>
  </div>
</template>

<script>
import {Calendar, DatePicker} from 'v-calendar';
import {ErrorMessage, Field, Form} from "vee-validate";
export default {
  name: "ScheduleDay",
  components: {Calendar, DatePicker, Form, Field, ErrorMessage},
  props:{
    dayTitle:{
      default:'Unknown'
    },
    dayName:{
      default:'unknown_day'
    },
    settings:{
      default:{}
    }
  },
  mounted() {
    if(!this.settings[this.dayName]){
      this.settings[this.dayName]={all_day: false,start_time: new Date(),end_time: new Date()}
    }
  },
  computed()
  {

  }
}
</script>

<style scoped lang="scss">
.apbd-sch-input{
  height:31px;
  .input-group-text{
    height: inherit;
  }
  .form-control{
    height:inherit;
  }
}
.apbd-sch-day{
  width:90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

</style>