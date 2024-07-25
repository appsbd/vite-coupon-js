import {defineStore} from 'pinia'
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
import {apssbd_admin_url} from "@/libraries/AppsbdURL";
const module_id = "Coupon_Category";
export const useCategoryStore = defineStore({
    id: 'category',
    state: () => ({
        firstLoaded: false,
        categories:[],
    }),

    getters: {

    },
    actions: {
        loadCategories: async function () {
            if (this.firstLoaded) {
                return this.categories;
            }
            return (await AxiosHelper.get(apssbd_admin_url.get_module_url(module_id, "get-categories"))
                .then(response => {
                    if (response.status) {
                        try {
                            this.firstLoaded = true;
                            this.categories = response.data;
                        } catch (e) {

                        }
                    }
                    return this.categories;
                })
                .catch(error => {
                    return null;
                }));
        },
        async saveCategory(params) {

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "add-category"),params)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async updateCategory(param) {

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "update-category"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async getCategoryList(param){
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-categories"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async deleteCategory(param)
        {
            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "delete-category"),param)
                .then((resp) => {
                    return resp.data;
                }).catch((e) => {
                    return e.response.data;
                });
        },
        async showCategoryDetails(param)
        {

            return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "get-category"),param)
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
        }

    },


})