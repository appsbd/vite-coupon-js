<template>
    <label v-if="!noLabel" class="form-check-label" :class="labelClass" :for="'sw-'+switch_id">
      <slot name="label">
        {{ this.$translateGettext(label)}}
      </slot>
    </label>
    <div  :class="this.containerClass">
      <input class="form-check-input" :id="switch_id" v-model="this.$attrs.modelValue"  v-bind="$attrs"
             :true-value=trueValue
             :false-value=falseValue
             type="checkbox">
    </div>
</template>

<script>
var apbdSwitchID=1;
export default {
name: "ApbdSwitchButton",
  inheritAttrs: false,
  props:{
    label:{
      default:"Label"
    },
    trueValue:{
      default:"Y"
    },
    falseValue:{
      default:"N"
    },
    containerClass:{
      default:'form-switch form-switch-md'
    },
    labelClass:{
      default:''
    },
    noLabel:{
      default:false
    },
  },
  data(){
    return {
      switch_id:0
    }
  },
  created() {
    if(this.$attrs.id){
      this.switch_id =this.$attrs.id;
    }else {
      this.switch_id = 'sw' + apbdSwitchID;
      apbdSwitchID++
    }
  },
  computed:{
  }
}
</script>

<style scoped>

</style>
