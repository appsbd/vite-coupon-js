<template>
  <div class="card card-white">
    <div class="card-header">
      Coupon Settings
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label" for="coupon_code">Coupon Code</label>
          <Field type="text" v-model="settings['coupon_code']" class="form-control form-control-sm" id="coupon_code"
                 label="Coupon_code" name="coupon_code" placeholder="Coupon code" rules="required"/>
          <ErrorMessage name="coupon_code" class="apbd-v-error"/>
        </div>
        <div class="col-md-6">
          <label class="form-label d-flex align-items-center justify-content-between me-2" for="category_id">Coupon
            Category
            <i class="vps " :class="(isShowLoader)?'vps-refresh-cw ani-spin ':''"></i>
          </label>
          <Field :disabled="isShowLoader" id="category_id" name="category_id" label="Category " as="select"
                 class="form-select form-select-sm"
                 v-model="settings['category_id']" rules="required">
            <option value='' disabled>Select</option>
            <option  :value="item.id" v-for="item in this.couponStore.datas?.data?.coupon_categories">{{ item.title }}</option>
          </Field>
          <ErrorMessage name="category_id" class="apbd-v-error"/>
        </div>

      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label d-block" for="start_date">Start Date</label>
          <Field v-model="settings['start_date']" class="form-control form-control-sm" rules="required"
                 id="start_date_h"
                 label="Start Date" name="start_date_h">

            <DatePicker data-popper-placement="top" format="YYYY-DD" v-model.string="settings['start_date']"
                        :input-debounce="500" id="start_date"
                        :masks='{ input:["YYYY-MM-DD","YYYY-MM-DD","YYYY-MM-DD"],modelValue:"YYYY-MM-DD" }'
                        :popover="{ placement: 'left'}"
                        :min-date='new Date()'

            >
              <template v-slot="{ inputValue, inputEvents }">
                <div class="">
                  <input
                      class="form-control form-control-sm"
                      v-on="inputEvents"
                      :value="inputValue"
                      placeholder="Choose Date"
                  />
                </div>

              </template>
            </DatePicker>
          </Field>
          <ErrorMessage name="start_date_h" class="apbd-v-error"/>
        </div>
        <div class="col-md-6">
          <label class="form-label d-flex align-items-center justify-content-between" for="no_expiry">End Date
            <div class="form-check form-switch apbd-cp" v-tooltip="'No End date'">
              <input class="form-check-input" v-model="settings['no_expiry']" type="checkbox"
                     true-value="Y"
                     false-value="N"
                     role="switch" id="no_expiry">
            </div>
          </label>
          <div v-if="settings['no_expiry']=='N'">
            <Field  v-model="settings['end_date']"   :rules="settings['no_expiry']=='N'?'required':''" class="form-control form-control-sm"  id="end_date_h"
                    label="End Date" name="end_date_h">
              <DatePicker data-popper-placement="top" format="YYYY-DD" v-model.string="settings['end_date']"
                          :input-debounce="500" id="end_date"

                          :masks='{ input:["YYYY-MM-DD","YYYY-MM-DD","YYYY-MM-DD",],modelValue:"YYYY-MM-DD" }'
                          :popover="{ placement: 'left'}"
                          :min-date="settings['start_date']"

              >
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="">
                    <input

                        class="form-control form-control-sm"
                        v-on="inputEvents"
                        :value="inputValue"
                        placeholder="Choose Date"
                    />
                  </div>

                </template>
              </DatePicker>
            </Field>
            <ErrorMessage name="end_date_h" class="apbd-v-error"/>
          </div>
          <div v-else>
            <input type="text" class="form-control form-control-sm" disabled placeholder="No End date">
          </div>

        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label d-block" for="start_date">Apply To</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="settings['apply_to']" value="O" type="radio" name="apply_to"
                   id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
              Online Sale
            </label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="settings['apply_to']" value="V" type="radio" name="apply_to"
                   id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
              Vitepos
            </label>
            <a class="link-underline-opacity-50 link-underline-opacity-100-hover ms-1" href="https://vitepos.com/"
               target="_blank">(details)</a>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" v-model="settings['apply_to']" value="B" type="radio" name="apply_to"
                   id="flexRadioDefault3">
            <label class="form-check-label" for="flexRadioDefault3">
              Both
            </label>
          </div>
          <ErrorMessage name="apply_to" class="apbd-v-error"/>
        </div>
        <div class="col-md-6">
          <label class="form-label d-flex align-items-center justify-content-between" for="outlet_id">Outlets
            <div class="form-check form-switch apbd-cp" v-tooltip="'Select all outlets'">
              <input class="form-check-input" v-model="settings['vitepos_settings']['is_all_outlet']" type="checkbox"
                     true-value="Y"
                     false-value="N"
                     role="switch" id="flexSwitchCheckDefault">
            </div>
          </label>
          <div class="input-group input-group-sm multiselect-sm">
            <Field id="outlet_id" :disabled="settings['vitepos_settings']['is_all_outlet']=='Y'" class="form-select-sm "
                   name="outlet_data" label="Outlet"
                   v-model="settings['vitepos_settings']['outlet_data']">
              <multiselect v-model="settings['vitepos_settings']['outlet_data']"
                           :disabled="settings['vitepos_settings']['is_all_outlet']=='Y'"
                           mode="tags"
                           label="name"
                           :multiple="true"
                           placeholder="Select Outlet"
                           valueProp="id"
                           :searchable="false"
                           @search-change="getOutlets"
                           :clearOnSelect="true"
                           :loading="searchingOutlet"
                           :close-on-select="true"
                           :options="getOutlets">

              </multiselect>
            </Field>
          </div>

        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="form-label" for="discount_type">Discount type</label>
          <Field id="discount_type" name="discount_type" label="discount_type" as="select"
                 class="form-select form-select-sm"
                 v-model="settings['discount_type']" rules="required">
            <option value='' disabled>Select</option>
            <option :value="item.val" v-for="item in discountOptions">{{ item.title }}</option>
          </Field>
          <ErrorMessage name="discount_type" class="apbd-v-error"/>
        </div>
        <div class="col-md-6" v-if="settings['discount_type']=='FA' ">
          <label class="form-label" for="discount_amount">
            Discount Amount
          </label>
          <Field type="text" v-model="settings['discount_amount']" class="form-control form-control-sm "
                 id="discount_amount"
                 label="Discount Amount" name="discount_amount"
                 :placeholder="settings['discount_type']=='PA'?'Percentage(%)':'Amount'" rules="required"/>
          <ErrorMessage name="discount_amount" class="apbd-v-error"/>
        </div>
        <div class="col-md-6" v-if="settings['discount_type']=='PA' ">
          <label class="form-label" for="percentage_amount">
            Percentage Amount(%)
          </label>
          <div class="input-group input-group-sm mb-3">
            <Field type="text" v-model="settings['discount_amount']" class="form-control"
                   id="percentage_amount"
                   label="Percentage Amount" name="discount_amount"
                   rules="required"/>
            <span class="input-group-text">% Upto</span>
            <Field type="text" v-model="settings['percentage_upto']" class="form-control"
                   id="percentage_upto"
                   label="Percentage Upto" name="percentage_upto"
                   placeholder="200"
                   rules="required"/>
            <span class="input-group-text">
            {{this.$app_symbol?.admin_data()?.price_format.symbol}}
            </span>
          </div>
        </div>
        <div class="col-md-6" v-if="settings['discount_type']=='PD'">
          <label class="form-label" for="product_id">Products</label>
          <div class="input-group input-group-sm multiselect-sm">
            <Field id="product_id" class="form-select-sm " name="product_id" label="Product"
                   v-model="settings['product_id']" rules="required">
              <multiselect v-model="settings['product_id']"
                           mode="tags"
                           label="name"
                           :multiple="true"
                           placeholder="Select Product"
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
          <ErrorMessage name="product_id" class="apbd-v-error"/>
        </div>
        <div class="col-md-6" v-if="settings['discount_type']=='PS'">
          <label class="form-label" for="percentage_shipping">Percentage(%)</label>
          <Field type="text" v-model="settings['percentage_shipping']" class="form-control form-control-sm"
                 id="percentage_shipping"
                 label="Percentage shipping" name="percentage_shipping" placeholder="percentage"
                 rules="required"/>
          <ErrorMessage name="percentage_shipping" class="apbd-v-error"/>

        </div>
      </div>


    </div>
  </div>

</template>

<script>
import {Form, Field, ErrorMessage} from "vee-validate";
import {Calendar, DatePicker} from 'v-calendar';
import 'v-calendar/style.css';
import Multiselect from '@vueform/multiselect';
import {mapStores} from 'pinia';
import {useCategoryStore} from "@/modules/categories/CategoryStore";
import AppLoader from "@/components/AppLoader";
import {useCouponStore} from "@/modules/coupons/CouponStore";
import APBDRequestParam from "@/libraries/APBDRequestParam";


export default {
  name: "GeneralSettings",
  components: {Form, Field, ErrorMessage, Calendar, DatePicker, Multiselect, AppLoader},
  props: {
    settings: {
      type: Object,
      default: {}
    },


  },
  data() {
    return {
      discountOptions: [
        {
          id: 1,
          val: 'FA',
          title: 'Fixed Amount'
        },
        {
          id: 2,
          val: 'PA',
          title: 'Percentage Amount'
        },
        {
          id: 3,
          val: 'PD',
          title: 'Products'
        },
        {
          id: 4,
          val: 'FS',
          title: 'Free Shipping'
        },
        {
          id: 5,
          val: 'PS',
          title: 'Percentage Shipping'
        },
      ],
      coupon_category: [],
      isShowLoader: false,
      filterProp:{
        searchKey:[],
        sort_prop: '',
        sort_ord: '',
      },
      app_product:{
        data:null,
        page:1,
        total:1,
        records:0,
        limit:20,
        rowdata:[]
      },
      timer_obj: null,
      outlets:[],
      searchingOutlet:false,
      searchingProduct:false,


    }
  },
  mounted() {
    this.loadProducts();
  },
  computed: {
    ...mapStores(useCategoryStore, useCouponStore),
    getOptions() {
      return this.app_product.rowdata;
    },
    getOutlets()
    {
      return this.couponStore.datas?.data?.outlets;
    }

  },
  methods: {
    loadProducts()
    {
      this.app_product.rowdata=this.couponStore.products;
    },

    async getProducts(query,id,isForce){
      this.searchingProduct=true;
      let param= new APBDRequestParam();
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

  }
}
</script>

<style scoped lang="scss">
.apbd-cp {
  &.form-check {
    font-size: 17px !important;
    min-height: unset !important;
    margin-bottom: unset !important;
  }
}
</style>