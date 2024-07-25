import {defineStore} from 'pinia'
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
import {apssbd_admin_url} from "@/libraries/AppsbdURL";
const module_id = "Coupon_Plugin";
export const useCouponStore = defineStore({
    id: 'coupon',
    state: () => ({
        loginStatus:null,
        isDataLoaded:false,
        isProductLoaded:false,
        products:[],
        datas:[],



    }),
    persist:{
        storage:sessionStorage,
        paths:['products','datas'],
    },
    getters: {

    },
    actions: {
        async loadInitialDatas() {
            if (this.isDataLoaded) {
                return this.datas;
            }
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-initial-data"))
                .then((resp) => {
                    this.isDataLoaded=true;
                    this.datas=resp.data;
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async loadOutlets() {
            if (this.isOutletLoaded) {
                return this.outlets;
            }
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-outlets"))
                .then((resp) => {
                    this.isOutletLoaded=true;
                    this.outlets=resp.data;
                    return resp;
                }).catch((e) => {
                    return e.response.data;
                });
        },

        async saveCoupon(params) {

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "add-coupon"),params)
                .then((resp) => {

                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async updateCoupon(param) {
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "update-coupon"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async getCouponList(param){
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-coupons"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
            },
        async getOutlets(){
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-outlets"))
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
            },
        async saveOutlet(param){
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "save-outlet"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
            },
        async removeOutlet(param){
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "remove-outlet"),param)
                .then((resp) => {

                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
            },
        async deleteCoupon(param)
        {
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "delete-coupon"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async showCouponDetails(param)
        {

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-details"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async changeStatus(param)
        {

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "change-status"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async loadProducts(param)
        {
            // if (this.isProductLoaded)
            // {
            //       return this.products;
            // }

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-products"),param)
                .then((resp) => {
                    this.isProductLoaded=true;
                    this.products=resp.data.rowdata.products;
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async loadProductCategories(param)
        {
            if (this.isCategoryLoaded)
            {
                return this.categories;
            }
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-product-categories"))
                .then((resp) => {
                    this.isCategoryLoaded=true;
                    this.categories=resp.data.rowdata;
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },

    },


})