<template>
  <modal :modal-msg="msgs" modal-size="modal-md" ref="category_modal"  @onSubmit="submitForm($event)" @loading-status="loaderStatusChange" @cilck="this.$emit('close')">
    <template v-slot:header>
      <span> {{ this.category_id?this.$gettext('Edit Coupon Category'):this.$gettext('Add Coupon Category')}}</span>
    </template>
    <template v-slot:body>
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="title" class="form-label" v-translate >Category Title</label>
          <Field label="Title" type="text" class="form-control form-control-sm" :placeholder="this.$translateGettext('Enter Category')" id="title" name="title" rules="required" v-model="categories.title"></Field>
          <ErrorMessage name="title" class="apbd-v-error"/>
        </div>

      </div>
      <div class="row mb-3">
        <div class="col-md-12">
          <label for="description" class="form-label" v-translate >Description</label>
          <Field label="Description" type="text" class="form-control form-control-sm" :placeholder="this.$translateGettext('Enter Description')" id="description" name="description" v-model="categories.description"></Field>

        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-check form-switch">
            <input class="form-check-input" v-model="categories.status" true-value="" false-value="I" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label ms-3" for="flexSwitchCheckDefault" v-translate>Status</label>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="$emit('close')" v-translate>Cancel</button>
      <button type="submit" class="btn btn-sm btn-theme"  data-dismiss="modal" v-translate>{{ this.category_id?this.$gettext('Save Changes'):this.$gettext('Add')}}</button>
    </template>
  </modal>
</template>
<script>
import Modal from "@/components/Modal";
import {  Field, ErrorMessage } from 'vee-validate';
import {mapStores} from "pinia";
import ImageRadioInput from "@/components/ImageRadioInput";

import {useCategoryStore} from "@/modules/categories/CategoryStore";
export default {
  name:'AddCategory',

  props:{
    category_id:{
      default:null
    }
  },
  components: {Modal,Field, ErrorMessage,ImageRadioInput},
  data(){
    return{
      categories: {
        id:'',
        title:'',
        slug:'',
        description:'',
        status: 'A'
      },
      statusOpt: [{label: "Active", val: "A",}, {label: "Inactive", val: "I",}],
      msgs:null,
      oldData: {},
      isShowLoader:false,
    }
  },
  mounted() {
    this.showModal();

  },
  computed:{
    ...mapStores(useCategoryStore),
  },
  methods:{


    async showModal()
    {
      if (this.category_id!=null) {
        this.$refs.category_modal.showLoader(true, "Loading Category Details");
        let response = await this.categoryStore.showCategoryDetails({category_id:this.category_id});
        if (response.status) {
          this.categories= response.data;
          this.oldData= {...response.data};
        }
        this.$refs.category_modal.showLoader(false);
      }
    },

    loaderStatusChange(param) {
      this.isShowLoader = param;
    },
    get_form_data(){
      let form_params = {...this.categories};
      if(this.category_id!=null) {
        form_params=this.$appsbdUtls.changedFormData(this.categories,this.oldData);
      }

      return form_params;
    },
    async submitForm(){

      this.msgs={};
      if(this.category_id !=null)
      {
        this.$refs.category_modal.showLoader(true, "Updating Category");

        let response= await this.categoryStore.updateCategory(this.categories);
        this.msgs=response.msg;
        if (response.status)
        {
          this.$refs.category_modal.showMsgOnly(response.msg,response.status);

          this.$emit('reload');
        }else {
          this.$refs.category_modal.showMsgOnly(response.msg,response.status);
        }
        this.$refs.category_modal.showLoader(false);
      }else{
        this.$refs.category_modal.showLoader(true, "Adding Category");
        let response= await this.categoryStore.saveCategory(this.categories);
        this.msgs=response.msg;
        if (response.status)
        {
          this.$refs.category_modal.showMsgOnly(response.msgs,response.status);
          this.$emit('reload');
        }else {
          this.$refs.category_modal.showMsgOnly(response.msgs,response.status);
        }
        this.$refs.category_modal.showLoader(false);
      }


    },

  }
}
</script>
<style scoped lang="scss">

</style>