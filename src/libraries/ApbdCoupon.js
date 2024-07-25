const apbd_coupon_version={
    is_responsive: function () {
         return true;
        //return window?.apbd_coupon?.ajax_nōnce?true:false;
    },
    admin_data: function()
    {
        return window.apbd_coupon;
    }

}
const ApbdCoupon={
    install(Vue){
        Vue.config.globalProperties.$app_symbol=apbd_coupon_version;
    }
}
export {apbd_coupon_version};
export default ApbdCoupon;