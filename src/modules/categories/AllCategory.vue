<template>
  <div class="card m-3">
    <div class="card-body p-3">
      <div class="row">
        <div class="col-12 col-lg-9">
          <apbd-filter-panel :is-single="true" @searchFilter="this.searchData"
                             @reset="this.clearSearch"></apbd-filter-panel>
        </div>
        <div class="col-12 col-lg-3">
          <div class="d-flex justify-content-end">
            <button class="btn btn-primary btn-sm" @click="openCategoryModal">Add Coupon Category</button>
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
        :grid-data="this.categoryData"
        :is-show-row-index-column="true"
        @load-data="eliteGridLoadData"
    >
      <template v-slot:slot-loader>
        <APBDGridLoader msg="Category List Loading ..."/>
      </template>
      <template v-slot:slotstatus="{rowitem}">
              <span :class="rowitem.status=='A'?'text-success':'text-danger'" style="cursor: pointer;"
                    @click="changeStatus(rowitem.id,rowitem.status)">
                {{ getStatus(rowitem.status) }}
              </span>

      </template>
      <template v-slot:slot-no-record>
        {{ this.$translateGettext('No %{type} found', {type: 'Coupon category'}) }}
      </template>
      <template v-slot:actionProperty="slotProps">
        <button class="btn  btn-grid-act btn-sm btn-theme me-2" type="button" @click="showDetails(slotProps.rowitem.id)"><i
            class="vps vps-edit"></i> <span>Edit</span></button>
        <button  class="btn btn-grid-act btn-sm btn-danger "  type="button" @click="deleteCategory(slotProps.rowitem.id)"> <i class=" vps vps-trash-2 "></i> <span>Delete</span></button>
      </template>
    </elite-grid>
  </div>
  <AddCategory v-if="showModal" :category_id="categoryId" @close="closeModal" @reload="getCategories"/>
</template>

<script>
import AddCategory from "@/modules/categories/AddCategory";
import ApbdFilterPanel from "@/components/ApbdFilterPanel";
import APBDGridLoader from "@/components/APBDGridLoader";
import EliteGrid from '@appsbd/vue3-elite-grid';
import {EliteColumnModel} from '@appsbd/vue3-elite-grid';
import {mapStores} from 'pinia';
import {useCategoryStore} from "@/modules/categories/CategoryStore";
import ResponseMsg from "@/components/ResponseMsg";
import APBDRequestParam from "@/libraries/APBDRequestParam";

export default {
  name: "AllCategory",
  components: {AddCategory, ApbdFilterPanel, APBDGridLoader, EliteGrid, EliteColumnModel, ResponseMsg},
  data() {
    return {
      isShowLoader: false,
      showModal: false,
      categoryId: null,
      msgs: null,
      filterProp: {
        searchKey: [],
        sort_prop: '',
        sort_ord: '',
      },
      categoryData: {
        data: null,
        page: 1,
        total: 1,
        records: 1,
        limit: 20,
        rowdata: []
      },
      data_column: [
        EliteColumnModel.getColumn({name: "title", title: "Title", is_sortable: true}),
        EliteColumnModel.getColumn({name: "slug", title: "Slug", is_sortable: true}),
        EliteColumnModel.getColumn({name: "description", title: "Description", is_sortable: false}),
        EliteColumnModel.getColumn({name: "status", title: "Status", is_sortable: false}),
      ],
    }
  },
  computed: {
    ...mapStores(useCategoryStore)
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getStatus(status) {
      switch (status) {
        case 'A':
          return 'Active';
        case 'I':
          return 'Inactive';
        default:
          return 'Unknown';
      }
    },
    searchData(data) {
      this.filterProp.searchKey = [];
      this.filterProp.searchKey = data;
      this.categoryData.page = 1;
      this.getCategories();
    },
    clearSearch() {
      this.filterProp.searchKey = [];
      this.getCategories();
    },
    async getCategories() {
      this.isShowLoader = true;
      let param = new APBDRequestParam();
      param.limit = this.categoryData.limit;
      param.page = this.categoryData.page;
      if (this.filterProp.searchKey.length > 0) {
        for (let i = 0; i < this.filterProp.searchKey.length; i++) {
          param.AddSrcItem(this.filterProp.searchKey[i].propName, this.filterProp.searchKey[i].value, this.filterProp.searchKey[i].operators);
        }
      }
      if (this.filterProp.sort_prop) {
        param.AddSortItem(this.sortProps.prop, this.sortProps.ord);
      }
      try {
        let response = await this.categoryStore.getCategoryList(param);
        if (response) {
          this.categoryData.records = response.records;
          this.categoryData.total = response.total;

          this.categoryData.rowdata = response.rowdata;

          this.isShowLoader = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
    eliteGridLoadData(gparam) {
      this.categoryData.limit = gparam.limit;
      this.categoryData.page = gparam.page;
      this.filterProp.sort_prop = gparam.sort_prop;
      this.filterProp.sort_ord = gparam.sort_ord;

      this.getCategories();
    },

    showDetails(id) {

      this.categoryId = id;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.categoryId = null;
    },
    openCategoryModal() {
      this.showModal = true;
    },
    async deleteCategory(id){
      let thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(thisObj.$translateGetMsg('Are you sure to delete this Coupon Category?'), async function () {
        let response= await thisObj.categoryStore.deleteCategory({category_id:id});
        if (response.status)
        {
          await thisObj.getCategories();
        }
        return response;
      }, {showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#dc3545',
        confirmButtonText: this.$gettext("Delete"),
        cancelButtonText: this.$gettext("No"),
        showLoaderOnConfirm: true,});

    },
    async changeStatus(id, status) {

      let thisObj = this;
      this.$appsbdUtls.ShowConfirmRequest(thisObj.$translateGetMsg('Are you sure to change the status?'), async function () {
        let response = await thisObj.categoryStore.changeStatus({category_id: id, status: status == 'A' ? 'I' : 'A'});
        if (response.status) {
          await thisObj.getCategories();
        }
        return response;
      }, {
        showCancelButton: true,
        confirmButtonColor: '#2563EB',
        cancelButtonColor: '#dc3545',
        confirmButtonText: this.$gettext("Yes"),
        cancelButtonText: this.$gettext("No"),
        showLoaderOnConfirm: true,
      });
    },

  },
}
</script>

<style scoped>

</style>