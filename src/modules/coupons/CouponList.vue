<template>
  <div class="card m-3">
    <div class="card-body p-3">
      <div class="row">
        <div class="col-12 col-lg-9">
          <apbd-filter-panel :is-single="true" @searchFilter="this.searchData" @reset="this.clearSearch"></apbd-filter-panel>
        </div>
        <div class="col-12 col-lg-3">
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary btn-sm" @click="openCouponModal">Add New Coupon</button>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="m-3 apbd-sd">
    <elite-grid
        :is-rounded="false"
        :is-group-separate-head="true"
         action-width="200px"
        :columns="data_column"
        :show-loader="isShowLoader"
        :show-header="false"
        :show-action-column="true"
        :grid-data="this.couponData"
        :is-show-row-index-column="true"
        @load-data="eliteGridLoadData"
    >
      <template v-slot:slot-loader >
        <APBDGridLoader msg="Coupon List Loading ..." />
      </template>
      <template v-slot:slot-no-record >
        {{this.$translateGettext('No %{type} found',{type:'Coupons'})}}
      </template>
      <template v-slot:slotstatus="{rowitem}" >
              <span :class="rowitem.status=='A'?'text-success':'text-danger'" style="cursor: pointer;" @click="changeStatus(rowitem.id,rowitem.status)" >
                {{getStatus(rowitem.status)}}
              </span>
      </template>
      <template v-slot:slotapply_to="{rowitem}" >
              <span>
                {{getSettingType(rowitem.apply_to)}}
              </span>
      </template>
      <template v-slot:slotend_date="{rowitem}" >
              <span  :class="rowitem.end_date=='No Expiry'?'text-danger':'text-success'" >
                {{(rowitem.end_date)}}
              </span>
      </template>
      <template  v-slot:slotvitepos_settings="{rowitem}" >
        <div v-if="rowitem.vitepos_settings.is_enable=='Y'">
              <span v-if="rowitem.vitepos_settings?.is_all_outlet=='Y' "  class="link-primary">
                All Outlets
              </span>
          <span v-else-if="rowitem.vitepos_settings?.outlet_data?.length>0"  class="link-success" v-for="(item,index) in rowitem.vitepos_settings?.outlet_id">
                <span v-if="rowitem.vitepos_settings?.outlet_data?.length==1">
                  {{item}}
                </span>
               <span v-else>
                 {{item}}{{index==rowitem.vitepos_settings?.outlet_data?.length?'':', '}}
               </span>
              </span>
             <span v-else-if="rowitem.vitepos_settings?.outlet_data && !rowitem.vitepos_settings?.outlet_data?.length>0" style="cursor:pointer;"  @click="addOutlet(rowitem.id)" class="link-success">
                 Select Outlets
              </span>
              <span v-else  style="cursor: pointer;" class="link-primary" @click="addOutlet(rowitem.id)" >
                 Select Outlets
              </span>
        </div>
        <div v-else  class="d-flex align-items-center">
          <span class="me-1 link-primary" style="cursor:pointer;" @click="openInfo()">Install Vitepos</span>
          <i  v-tooltip="'You do not have vitepos installed.'" class="vps vps-help-circle apbd-pointer"></i>
        </div>

      </template>
      <template v-slot:slotdiscount_type="{rowitem}" >
              <span>
                {{getDiscountType(rowitem.discount_type)}}
              </span>
      </template>
      <template v-slot:actionProperty="slotProps">
        <button  class="btn btn-grid-act btn-sm btn-theme me-2"  type="button" @click="editCoupon(slotProps.rowitem.id)"><i class="vps vps-edit"></i><span>Edit</span>  </button>
        <button  class="btn btn-grid-act btn-sm btn-danger "  type="button" @click="deleteCoupon(slotProps.rowitem.id)"> <i class=" vps vps-trash-2 "></i> <span>Delete</span></button>
      </template>
    </elite-grid >
  </div>
  <AddCoupon v-if="isShowModal" :coupon_id="coupon_id" @reload="getCoupons" @close="closeCouponModal" />
  <AddOutlet v-if="isShowOutlet"  :settings="all_settings.general_settings" :coupon_id="coupon_id" @reload="getCoupons" @close="closeOutlet" />
  <InfoModal v-if="isInfoModal"  @close="closeInfo" />

</template>

<script>
import EliteGrid from '@appsbd/vue3-elite-grid';
import {EliteColumnModel} from '@appsbd/vue3-elite-grid';
import APBDGridLoader from "@/components/APBDGridLoader";
import ApbdFilterPanel from "@/components/ApbdFilterPanel";
import Modal from "@/components/Modal";
import AddCoupon from "@/modules/coupons/AddCoupon";
import ResponseMsg from "@/components/ResponseMsg";
import APBDRequestParam from "@/libraries/APBDRequestParam";
import {mapStores} from 'pinia';
import {useCouponStore} from "@/modules/coupons/CouponStore";
import { VDropdown } from 'floating-vue';
import {Form, Field, ErrorMessage} from "vee-validate";
import Multiselect from '@vueform/multiselect';
import AddOutlet from "@/modules/coupons/AddOutlet";
import Outlet from "@/model/outlet";
import InfoModal from "@/modules/coupons/InfoModal";
import {Coupons} from "@/model/Rules";
export default {
  name: "CouponList",
  components:{
    InfoModal,
    Form,Field,ErrorMessage,AddOutlet,Multiselect,AddCoupon,VDropdown, EliteColumnModel,EliteGrid,APBDGridLoader,ApbdFilterPanel,Modal,ResponseMsg},
  data() {
    return {
      isShowLoader: false,
      isShowModal: false,
      msgs: null,
      all_settings:new Coupons(),

      coupon_id:null,

      isShowOutlet:false,
      isInfoModal:false,

      filterProp:{
        searchKey:[],
        sort_prop: '',
        sort_ord: '',
      },
      couponData: {
        data: null,
        page: 1,
        total: 2,
        records: 1,
        limit: 10,
        rowdata:[],
      },
      data_column: [

        EliteColumnModel.getColumn({name: "coupon_code", title: "Coupon code",  width: '200px', is_sortable: true}),
        EliteColumnModel.getColumn({name: "start_date", title: "Start date", width: '200px', is_sortable: false}),
        EliteColumnModel.getColumn({name: "end_date", title: "End date", width: '200px', is_sortable: false}),
        EliteColumnModel.getColumn({name: "discount_type", title: "Discount type", width: '200px', is_sortable: false}),
        EliteColumnModel.getColumn({name: "apply_to", title: "Apply To", width: '200px', is_sortable: false}),
        EliteColumnModel.getColumn({name: "vitepos_settings",  title: "Vitepos Outlets", width: '350px', is_sortable: false}),
        EliteColumnModel.getColumn({name: "status", title: "Status", width: '50px', is_sortable: false}),
      ],
    }
  },
  computed:{
    ...mapStores(useCouponStore),
    outletList()
    {
      return {...this.outletData};
    },

  },
  mounted() {
     this.getCoupons();
    // this.getOutlets();
  },
  methods:{
     async getCoupons()
    {
      this.isShowLoader=true;
      let param= new APBDRequestParam();
      param.limit = this.couponData.limit;
      param.page = this.couponData.page;
      if(this.filterProp.searchKey.length>0){
        for (let i=0;i<this.filterProp.searchKey.length;i++)
        {
          param.AddSrcItem(this.filterProp.searchKey[i].propName,this.filterProp.searchKey[i].value,this.filterProp.searchKey[i].operators);
        }
      }
      if(this.filterProp.sort_prop){
        param.AddSortItem(this.filterProp.sort_prop,this.filterProp.sort_ord);
      }
      try {
        let response =  await this.couponStore.getCouponList(param);

        if (response) {
          this.couponData.rowdata = response.rowdata;
          this.couponData.records =  response.records;
          this.couponData.total =  response.total;
          this.isShowLoader=false;
          // this.getOutlets();
        }
      }catch (e) {
        console.log(e.message);
      }
    },
    eliteGridLoadData(gparam){
      this.couponData.limit = gparam.limit;
      this.couponData.page = gparam.page;
      this.couponData.sort_prop=gparam.sort_prop;
      this.couponData.sort_ord=gparam.sort_ord;

      this.getCoupons();
    },
    searchData(data)
    {
      this.filterProp.searchKey=[];
      this.filterProp.searchKey=data;
      this.couponData.page=1;
      this.getCoupons();
    },
    clearSearch(){
      this.filterProp.searchKey=[];
      this.getCoupons();
    },
    openCouponModal() {
      this.isShowModal = true;
    },
    closeCouponModal()
    {
      this.isShowModal=false;
      this.coupon_id=null;
    },
    openInfo()
    {
      this.isInfoModal=true;
    },
    closeInfo()
    {
      this.isInfoModal=false;
    },
    editCoupon(id)
    {
      this.isShowModal=true;
      this.coupon_id=id;
    },
    async deleteCoupon(id){
      let thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(thisObj.$translateGetMsg('Are you sure to delete this coupon?'), async function () {
        let response= await thisObj.couponStore.deleteCoupon({coupon_id:id});
        if (response.status)
        {
          await thisObj.getCoupons();
        }
        return response;
      }, {showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#dc3545',
        confirmButtonText: this.$gettext("Delete"),
        cancelButtonText: this.$gettext("No"),
        showLoaderOnConfirm: true,});

    },
    async changeStatus(id,status)
    {
      var new_status = (status==='A'?'I':'A');
      let thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(thisObj.$translateGetMsg('Are you sure to change the status?'), async function () {
        let response= await thisObj.couponStore.changeStatus({coupon_id:id,status:new_status});
        if (response.status)
        {
          await thisObj.getCoupons();
        }
        return response;
      }, {showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#dc3545',
        confirmButtonText: this.$gettext("Yes"),
        cancelButtonText: this.$gettext("No"),
        showLoaderOnConfirm: true,});
    },
    async saveOutlet(outlet,coupon_id)
    {

      this.isShowLoader=true;
      try {
        let outlet_data={outlet:outlet,coupon_id:coupon_id};
        let response= await this.couponStore.saveOutlet(outlet_data);
        this.getCoupons();
        this.outletData=response.rowdata;
        this.isShowLoader=false;
      }catch (e)
      {
        console.log(e.message);
      }
    },
    async removeOutlet(outlet_id,coupon_id)
    {

      let thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(thisObj.$translateGetMsg('Are you sure to delete this outlet?'), async function () {
        let outlet_data={outlet_id:outlet_id,coupon_id:coupon_id};
        let response= await thisObj.couponStore.removeOutlet(outlet_data);
        if (response.status)
        {
          await thisObj.getCoupons();
        }
        return response;
      }, {showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#dc3545',
        confirmButtonText: this.$gettext("Delete"),
        cancelButtonText: this.$gettext("No"),
        showLoaderOnConfirm: true,});

    },
    addOutlet(coupon_id)
    {
      this.all_settings.general_settings.vitepos_settings = this.couponData.rowdata.find((p)=>p.id==coupon_id).vitepos_settings;
      this.isShowOutlet=true;
      this.coupon_id=coupon_id;
    },
    closeOutlet()
    {
      this.isShowOutlet=false;

      this.coupon_id=null;
    },
    getDiscountType(dis)
    {

      switch (dis) {
        case  'FA':
        return 'Fixed Amount'

        case 'PA':
        return 'Percentage Amount'
        case 'FS':
        return 'Free Shipping'
        case 'PS':
        return 'Percentage Shipping'
        case 'PD':
        return 'Product'
        default:
          return 'Unknown'

      }
    },
    getSettingType(dis)
    {

      switch (dis) {
        case  'V':
        return 'Vitepos'
        case 'O':
        return 'Online Sale'
        case 'B':
        return 'Both'
        default:
          return 'Not Enable'

      }
    },
    getStatus(sta)
    {
      if(sta === 'A')
      {
        return 'Active';
      }
      return 'Inactive';
    }

  }
}
</script>

<style lang="scss">
.menu-group {
  min-width: 180px !important;
}
</style>