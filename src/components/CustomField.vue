<template>
  <div class="mt-2 mb-2" v-for="(field,index) in fieldInputs" :key="index">


    <!--Text -->
    <div class="text-start " v-if="field.type == 'T'" >
      <div class="mb-3">
        <label class="form-label" v-if="field.label" :for="field.id">{{field.label}}</label>
        <Field type="text" :label="field.label" :rules="field.is_required=='Y'?'required':''" v-model="customProps[field.id]" class="form-control vtu-form-control" :id="field.id" :name="field.id" :placeholder="field.help_text"/>
        <ErrorMessage :name="field.id" class="apbd-v-error"/>
      </div>
    </div>

    <!--Number -->
    <div class="text-start " v-if="field.type == 'N'" >
      <div class="mb-3">
        <label class="form-label" v-if="field.label" :for="field.id">{{field.label}}</label>
        <Field type="number" :label="field.label" :rules="field.is_required=='Y'?'required':''" v-model="customProps[field.id]" class="form-control vtu-form-control" :id="field.id" :name="field.id" :placeholder="field.help_text"/>
        <ErrorMessage :name="field.id" class="apbd-v-error"/>
      </div>
    </div>

    <!--Hidden -->
    <div class="text-start " v-if="field.type == 'H'" >
      <div class="mb-3">
        <label class="form-label" v-if="field.label" :for="field.id">{{field.label}}</label>
        <Field type="hidden" :label="field.label" :rules="field.is_required=='Y'?'required':''" v-model="customProps[field.id]" class="form-control vtu-form-control" :id="field.id" :name="field.id" :placeholder="field.help_text"/>
        <ErrorMessage :name="field.id" class="apbd-v-error"/>
      </div>
    </div>

    <!--URL -->
    <div class="text-start" v-if="field.type == 'U'" >
      <div class="mb-3">
        <label class="form-label" v-if="field.label" :for="field.id">{{field.label}}</label>
        <Field type="url" :label="field.label" :rules="field.is_required=='Y'?'url':''" required v-model="customProps[field.id]" class="form-control vtu-form-control" :id="field.id" :name="field.id" :placeholder="field.help_text"/>
        <ErrorMessage :name="field.id" class="apbd-v-error"/>
      </div>
    </div>

    <!--Date -->
    <div class="text-start " v-if="field.type == 'D'" >
      <div class="mb-3">
        <label class="form-label" v-if="field.label" :for="field.id">{{field.label}}</label>
        <Field type="date" :label="field.label" :rules="field.is_required=='Y'?'required':''" v-model="customProps[field.id]" class="form-control vtu-form-control" :id="field.id" :name="field.id" :placeholder="field.help_text"/>
        <ErrorMessage :name="field.id" class="apbd-v-error"/>
      </div>
    </div>

    <!--Radio -->
    <div class="text-start" v-if="field.type=='R'">
      <div class="d-flex mb-2 justify-content-between align-items-center ">
        <div class="text-start">
          <span :class="field.is_required=='Y'?'ht_tks_required_fld':''">{{field.label}}</span>
        </div>
      </div>

      <div class="d-flex align-items-center" >
        <div class="form-check form-check-inline" v-for="item in field.options">
          <Field class="form-check-input" type="radio" name="test" :id="item.index" :checked="item.is_selected=='Y'" :value="item.id" v-model="customProps[field.id]"/>
          <label class="form-check-label" :for="item.index">{{item.val}}</label>
        </div>
      </div>
    </div>

    <!-- Checkbox-->
    <div class="text-start me-3" v-if="field.type == 'C'">
      <div class="d-flex mb-2 justify-content-between align-items-center">
        <div class="text-start">
          <span :class="field.is_required=='Y'?'ht_tks_required_fld':''">{{field.label}}</span>
        </div>
      </div>
      <div  class="d-flex  align-items-center"  >
        <div class="form-check form-check-inline" v-for="check in field.options" :key="check.index">
          <Field class="form-check-input" :id="field.id" :label="field.label" type="checkbox" :disabled="field.opt_limit>0 && this.customProps[field.id]?.length>=field.opt_limit && !this.customProps[field.id].includes(check.id)" :rules="field.is_required=='Y'?'required':''"  :name="field.id" v-model="this.customProps[field.id]"  :value="check.id" />
          <label class="form-check-label" :for="field.id">
            {{ check.val }}
          </label>
        </div>
      </div>
      <ErrorMessage :name="field.id"  class="apbd-v-error"/>
    </div>

    <!--Drop Down -->
    <div v-if="field.type == 'W'" >
      <div class="mb-3">
        <select class="form-select vtu-form-control" v-model="customProps[field.id]">
          <option :value="item.id" v-for="item in field.options" :selected="item.is_selected == 'Y'">{{item.val}}</option>
        </select>
      </div>
    </div>

    <!--Text Area -->
    <div class=" text-start " v-if="field.type == 'E'">
      <div class="mb-3">
        <Field as="textarea" class="form-control" :placeholder="field.help_text" type="text" :label="field.label" :name="field.id" :id='field.id' v-model="customProps[field.id]" :rules="field.is_required=='Y'?'required':''"   />
        <ErrorMessage :name="field.id"  class="apbd-v-error"/>
      </div>
    </div>

    <!-- Toggle-->
    <div class="text-start" v-if="field.type == 'S'">
      <div class="form-check form-switch mb-3">
        <!--        <input class="form-check-input" type="checkbox" role="switch" :id="field.id" :checked="options.true_val == 'Y'"  v-model="customProps[field.id]">-->
        <input class="form-check-input" type="checkbox" role="switch" :id="field.id"   v-model="customProps[field.id]">
        <label class="form-check-label ms-2" :for="field.id">{{field.label}}</label>
      </div>
    </div>

    <!-- Instruction-->
    <div class="text-start" v-if="field.type == 'I'">
      <div :class="field.label">
        {{field.des}}
      </div>
    </div>


  </div>
</template>

<script>
import { Field,ErrorMessage,Form  } from "vee-validate";
import Multiselect from "@vueform/multiselect";
export default {
  name: "CustomField",
  components: {
    Field,
    ErrorMessage,
    Multiselect
  },
  props:{
    fieldInputs:{
      type:Array,
      default:[]
    },
    customProps:{
      type:Object,
      default: {}
    }
  },
  data(){
    return{

    }
  },
  mounted() {
    this.getSelected();
  },
  methods:{
    getSelected() {
      for(const field of this.fieldInputs){
        if(field.type == 'R' || field.type == 'W'){
          if(field.options.length>0){
            for(const option of field.options){
              if(option?.is_selected == 'Y'){
                this.customProps[field.id] = option.id;
              }
            }
          }
        }
        // if(field.type == 'S' && options.true_val == 'Y'){
        //   this.customProps[field.id] = true;
        // }
        // if(field.type == 'S' && options.false_val == 'N'){
        //   this.customProps[field.id] = false;
        // }
        if (field.type=='C'){
          this.customProps[field.id]=[];
          if (field.options.length>0){
            for(const option of field.options){
              if(option.is_selected == 'Y'){
                this.customProps[field.id].push(option.id);
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ht_tks_required_fld:after{content:"*";color:#ff6e30;margin-left:5px}
</style>