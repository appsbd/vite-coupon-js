import {defineStore} from 'pinia'
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";
import {apssbd_admin_url} from "@/libraries/AppsbdURL";
const module_id = "Coupon_Settings";
export const useSettingStore = defineStore({
    id: 'setting',
    state: () => ({
        firstLoaded: false,
        settings: {},
    }),

    getters: {

    },
    actions: {
        loadSettings: async function () {
            if (this.firstLoaded) {
                return this.settings;
            }
            return (await AxiosHelper.get(apssbd_admin_url.get_module_url(module_id, "get-option"))
                .then(response => {
                    if (response.status) {
                        try {
                            this.firstLoaded = true;
                            this.settings = response.data?.data;
                        } catch (e) {

                        }
                    }
                    return this.settings;
                })
                .catch(error => {
                    return null;
                }));
        },
         async storeSettings(params) {
             return await AxiosHelper.post(apssbd_admin_url.get_module_url(module_id, "option"),params)
                 .then((resp) => {

                     return resp.data;
                 }).catch((e) => {
                     return e.response.data;
                 });
             },



    },


})