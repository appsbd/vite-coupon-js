<template>
  <div class="vt-addon-form-body">
        <div class="mb-3">
          <div class="card card-white">
            <div class="card-header">
              <div class="p-1">
                <translate>Rules</translate>
                <button class="ms-3 btn btn-xs btn-theme" type="button" @click="addRulesGroup" v-translate>Add Rules Group</button>
                <!--<button class="ms-3 btn btn-cr btn-xs btn-theme"><i class="vps vps-plus"></i></button>-->
              </div>
            </div>
            <div class="card-body rule-group-container">
              <template :key="ruleIndex" v-if="this.rules.rule_group?.length>0" v-for="(rule,ruleIndex) in this.rules.rule_group">
                <and-or-divider bg-color="#ccc" v-if="ruleIndex>0" />
                <apbd-accrodion>
                  <template v-slot:header-full >
                    <div class="w-100">
                      <div class="p-1  d-flex justify-content-between">
                        <div>
                          {{this.$translateGettext('Rule Group')+'# '+(ruleIndex+1)}}
                          <button type="button" class="btn btn-xs btn-theme" @click="addRules($event,ruleIndex)" v-translate>Add Rules</button>
                        </div>
                        <apbd-confirm-popover :msg="this.$gettext('Are you sure to remove it?')" @click="stopEvent($event)" :item-data="ruleIndex" @onConfirmed="deleteRulesGroup">
                          <button class="ms-3 btn btn-cr btn-xs btn-danger" v-tooltip="this.$translateGettext('Remove')"><i class="vps vps-trash-o"></i></button>
                        </apbd-confirm-popover>
                      </div>
                    </div>
                  </template>
                  <template v-slot:body>
                    <div v-if="rule?.rules.length>0">
                      <template v-for="(condition,ruleInd) in rule.rules" :key="ruleInd">
                        <and-or-divider bg-color="var(--apbd-theme-color,#1c94ff)" color="var(--vtpos-theme-btn-font-color)" text="AND" v-if="ruleInd>0" />
                        <RuleCondition   :condition="condition" :condition-index="ruleInd" :ruleIndex="ruleIndex" @onRemove="removeRule" />
                      </template>
                    </div>
                    <div v-else class="text-danger text-center" v-translate>
                      No Rules Added
                    </div>
                  </template>
                </apbd-accrodion>
              </template>
              <div v-else class="text-danger text-center" v-translate>
                No Rules Group Added
              </div>
            </div>
          </div>
        </div>
      </div>


</template>

<script>
import Modal from "@/components/Modal";

import { Field,ErrorMessage  } from "vee-validate";

import Multiselect from '@vueform/multiselect'
import FileUploader from "@/components/FileUploader";
import APBDRequestParam from "@/model/APBDRequestParam";
import ResponseMsg from "@/components/ResponseMsg";
import { AddonRule, RuleGroup} from "@/model/Rules";
import ApbdAccrodion from "@/components/ApbdAccrodion";
import RuleCondition from "@/modules/coupons/RuleCondition"
import ApbdConfirmPopover from "@/components/ApbdConfirmPopover";
import AndOrDivider from "@/components/AndOrDivider";
import ApbdAccrodionItem from "@/components/ApbdAccrodionItem";
export default {
  name: 'RuleModule',
  data() {
    return {
      isAddFormShow: false,
      attachedFiles:[],

    }
  },
  props: {
    msg: {
      type:String,
    },
    addonId:{
      default:''
    },
    settings:{
      type:Object,
      default:{}
    },
    rules:{
      type:Object,
      default:{}
    }

  },
computed: {},
emits:['reloadData'],
mounted() {
  this.loadAddon();
},
components: {
  ApbdAccrodionItem,
  AndOrDivider,
  ApbdConfirmPopover,
  RuleCondition,
  ApbdAccrodion,
  ResponseMsg,
  Modal,
  FileUploader,
  Multiselect,
  Field,
  ErrorMessage
},

  methods: {
    loadAddon(){

    },
    addon_detail_callback(status,msg,data){
        if (status){
          this.rules = data;
        }
      this.$refs.addon_modal.showLoader(false);
    },
    createAddon(e){

    },
    create_callback(status,msg,data){
      if (status){
        this.$emit('loadData');
      }
      this.$refs.addon_modal.showMsgOnly(msg,status);
      this.$refs.addon_modal.showLoader(false);
    },
    removeRule({showLoader,itemData,closePopover})
    {
      this.rules.rule_group[itemData.ruleIndex].rules.splice(itemData.conditionIndex,1);
      closePopover();
    },
    deleteField({showLoader,itemData,closePopover}){
      this.rules.fields.splice(itemData,1);
      closePopover();
    },
    stopEvent(e,id){
      e.preventDefault();
      e.stopPropagation();
    },
    deleteRulesGroup({showLoader,itemData,closePopover}){
      this.rules.rule_group.splice(itemData,1);
      closePopover();
    },

    addRulesGroup(e){
      let ruleGroup = new RuleGroup();
      this.rules.rule_group.push(ruleGroup);
    },
    addRules(e,id){
      e.preventDefault();
      e.stopPropagation();
      for (let i=0; i<this.rules.rule_group.length;i++)
      {
        if (i==id)
        {
          let rule = new AddonRule();
          this.rules.rule_group[id].rules.push(rule)
        }
      }
    },
    closeModal() {
      this.$emit('close');
    },

  }
}
</script>

<style lang="scss">
#appsbd-app > .card .card-body {
   overflow: unset !important;
}
.vt-addon-form-body{
  .accordion {
    .accordion-item {
      box-shadow: 0 0 14px -7px #ccc;
    }
  }

}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rule-group-container{
  .accordion {
    --bs-accordion-bg: rgba(248, 248, 248, 0.37);
  }
}

.card.mb-3+.add-or-divider{
    margin-top:-1rem;
}
.variation-title {
  font-weight: bold;
  display: block;
  text-align: left;
  &.text-center{
    text-align: center;
  }
}
.variation-con {

}
.modal {
  &.show {
    display: block;
    background: rgba(0, 0, 0, 0.47);
  }
}
.card-img-top {
  height: 18vh;
  object-fit: cover;
}


</style>
