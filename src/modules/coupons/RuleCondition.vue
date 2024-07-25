<template>
  <div class="card mb-3 card-white">
    <div class="card-body p-4">
      <div class="row align-items-center">
        <div class="col-md-3 pe-0">
          <div class="input-group input-group-sm multiselect-sm">
            <Field label="Property" v-model="condition.prop"
                   rules="" :id="'prop'+ruleIndex+'_'+conditionIndex" :name="'prop'+ruleIndex+'_'+conditionIndex">
              <multiselect v-model="condition.prop" label="name" valueProp="value"
                           :options="[
                                   {value:'P',name:this.$gettext('Product')},
                                   {value:'C',name:this.$gettext('Category')},
                                   {value:'T',name:this.$gettext('Grand Cart Total')},
                                   {value:'S',name:this.$gettext('Subtotal')},
                                   {value:'I',name:this.$gettext('Cart Items')},
                                   ]">

              </multiselect>
            </Field>
          </div>
          <ErrorMessage :name="'prop'+ruleIndex+'_'+conditionIndex" class="apbd-v-error"/>
        </div>
        <div class="col-md-3 pe-0">
          <div class="input-group input-group-sm multiselect-sm">
            <Field label="Condition" v-model="condition.cond"
                   rules="" :id="'con'+ruleIndex+'_'+conditionIndex" :name="'con'+ruleIndex+'_'+conditionIndex">
              <multiselect v-model="condition.cond" label="name" valueProp="value"
                           :options="validOption">

              </multiselect>
            </Field>
          </div>
          <ErrorMessage :name="'con'+ruleIndex+'_'+conditionIndex" class="apbd-v-error"/>
        </div>
        <div class="col-md-5  pe-0 position-relative">
          <div class="input-group input-group-sm multiselect-sm" v-if="condition.prop=='C' || condition.prop=='P'">
            <Field label="Value"  v-model="condition.val"
                   rules="required" :id="'val'+ruleIndex+'_'+conditionIndex" :name="'val'+ruleIndex+'_'+conditionIndex">
              <multiselect v-if="condition.prop=='C'" v-model="condition.val" label="name" valueProp="id"
                           :options="getOptions">

              </multiselect>
              <multiselect v-if="condition.prop=='P'"
                           v-model="condition.val"
                           label="name"
                           valueProp="id"
                           :searchable="true"
                            @search-change="getProducts"
                           :clearOnSelect="true"
                           :loading="searchingProduct"
                           :close-on-select="true"
                           :options="getOptions">

              </multiselect>
            </Field>
          </div>
          <div v-if="condition.prop=='T'">
            <Field type="text" v-model="condition.val" class="form-control form-control-sm" label="Value" :name="'val'+ruleIndex+'_'+conditionIndex" placeholder="Grand Cart Total" rules="required"/>
          </div>
          <div v-if="condition.prop=='I'">
            <Field type="text" v-model="condition.val" class="form-control form-control-sm" label="Value" :name="'val'+ruleIndex+'_'+conditionIndex" placeholder="Cart Items" rules="required"/>
          </div>
          <div v-if="condition.prop=='S'">
            <Field type="text" v-model="condition.val" class="form-control form-control-sm" label="Value" :name="'val'+ruleIndex+'_'+conditionIndex" placeholder="Subtotal" rules="required"/>
          </div>
          <ErrorMessage :name="'val'+ruleIndex+'_'+conditionIndex" class="apbd-v-error position-absolute"/>
        </div>
        <div class="col-md-1 text-center">
          <div class="mb-2 mb-md-0">
            <apbd-confirm-popover msg="Are you sure to remove it?" :item-data="{conditionIndex:conditionIndex,ruleIndex:ruleIndex}" @onConfirmed="removeCondition">
              <i class="vps vps-trash-2" v-tooltip="this.$translateGettext('Remove')"></i>
            </apbd-confirm-popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApbdConfirmPopover from "@/components/ApbdConfirmPopover";
import { Field,ErrorMessage  } from "vee-validate";
import Multiselect from '@vueform/multiselect';
import {mapStores} from 'pinia';
import {useCouponStore} from "@/modules/coupons/CouponStore";
import APBDRequestParam from "@/libraries/APBDRequestParam";

export default {
  name: "RuleCondition",
  props:{
    conditionIndex:{
      default:''
    },
    ruleIndex:{
      default:''
    },
    condition:{
      type:Object,
      default:{}
    },
    settings:{
      type:Object,
      default: {}
    },
  },
  components: {ApbdConfirmPopover,Field,ErrorMessage,Multiselect},
  data(){
    return{
      app_product:{
        data:null,
        page:1,
        total:1,
        records:0,
        limit:10,
        rowdata:[]
      },
      searching:false,
      searchingProduct:false,
    }
  },
  mounted() {
    //this.getProducts('',null,true);
    this.loadProducts();
  },
  computed:{
   ...mapStores(useCouponStore),
    getOptions()
    {
      let option = [];
      if (this.condition.prop == 'C' )
      {
        option = this.couponStore.datas?.data?.product_categories;
      } else {
        option = this.app_product.rowdata;
      }
      return option;
    },
    validOption()
    {
      if(this.condition.prop =='C' || this.condition.prop =='P')
      {
        return [
          {value:'eq',name:this.$gettext('Equal to')},
          {value:'ne',name:this.$gettext('Not equal to')},
        ];
      }else{
        return [
          {value:'eq',name:this.$gettext('Equal to')},
          {value:'lt',name:this.$gettext('Less Than')},
          {value:'Gt',name:this.$gettext('Greater Than')},
        ];
      }
    }
  },
  methods:{
    loadProducts()
    {
      this.app_product.rowdata=this.couponStore.products;
    },
    async getProducts(query,id,isForce){
      this.searchingProduct=true;
      let param= new APBDRequestParam();
      console.log(query);
      let key = query.trim();
      param.limit = this.app_product.limit;
      param.page = this.app_product.page;
      if (key!=undefined && key!='')
      {
        param.AddSrcItem('*',key,'like');
      }
      if (isForce && (key!=undefined && key!=''))
      {
        this.searchingProduct=true;
      }
      try {
        clearTimeout(this.timer_obj);
        this.timer_obj = setTimeout (async () => {
          let response =  await this.couponStore.loadProducts(param);
          if (response) {
            this.app_product.rowdata = response.rowdata.products;
            this.app_product.records =  response.records;
            this.app_product.total =  response.total;
          }
          this.searchingProduct=false;
        }, 1000);
      }catch (e) {
        console.log(e);
      }
    },
    removeCondition(param){
      this.$emit('onRemove',param);
    },
  }
}
</script>

<style scoped lang="scss">
#appsbd-app > .card .card-body {
  overflow: unset;
}
.card:last-child{
  margin-bottom: 0px !important;
}
.input-group{
  &.multiselect-sm{
    flex-wrap: nowrap;
  }
}

</style>
