import {createRouter, createWebHashHistory} from 'vue-router';
import AuthLayout from "@/components/AuthLayout";
import CouponList from "@/modules/coupons/CouponList";
import AllSettings from "@/modules/settings/AllSettings";
import AllCategory from "@/modules/categories/AllCategory";
import GeneralTab from "@/components/GeneralTab";
import SchedulerTab from "@/components/SchedulerTab";
import RoleTab from "@/components/RoleTab";
import UrlTab from "@/components/UrlTab";
import UsageTab from "@/components/UsageTab";
import MessageTab from "@/components/MessageTab";





const routes = [

    {
        path: '/',
        name: 'Coupon',
        redirect: '/coupons',
        component:AuthLayout,
        meta: { requireAuth:true },
        children: [
            {
                path:'/coupons',
                name:'Coupon',
                meta:{title: "Coupons"},
                component: CouponList
            } ,
            {
                path:'/categories',
                name:'Categories',
                meta:{title: "Categories"},
                component: AllCategory
            } ,
            {
                path:'/settings',
                name:'Settings',
                meta:{ requireAuth:true },
                redirect:'/settings/general-settings',
                component: AllSettings,
                children:[
                    {
                        path:'/settings/general-settings',
                        name:'General ',
                        meta:{title: "General Settings"},
                        component: GeneralTab
                    } ,
                    {
                        path:'/settings/message-settings',
                        name:' Message ',
                        meta:{title: "Message Settings"},
                        component: MessageTab
                    } ,
                    // {
                    //     path:'/settings/scheduler',
                    //     name:'Scheduler',
                    //     meta:{title: "Scheduler Settings"},
                    //     component: SchedulerTab
                    // } ,
                    // {
                    //     path:'/settings/usage-settings',
                    //     name:'UsageSettings',
                    //     meta:{title: "Usage Settings"},
                    //     component: UsageTab
                    // } ,
                    // {
                    //     path:'/settings/role',
                    //     name:'Role',
                    //     meta:{title: "Role Settings"},
                    //     component: RoleTab
                    // } ,
                    {
                        path:'/settings/url',
                        name:'Url',
                        meta:{title: "Url Settings"},
                        component: UrlTab
                    } ,
                ]
            } ,



        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: "apbd-active",
    linkExactActiveClass: "apbd-exact-active",
})

export default router
