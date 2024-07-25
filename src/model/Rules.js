class Rules{
    constructor() {
        this.id;
        this.fields=[];
        this.rule_group=[];
    }
}
class Coupons{
    constructor()
    {
         this.id='';
         this.general_settings={
             coupon_code:'',
             category_id:'',
             apply_to:'V',
             vitepos_settings: {
                 is_enable:'N',
                 is_all_outlet: 'N',
                 outlet_data:[]
             },
             start_date:'',
             no_expiry:'N',
             end_date:'',
             discount_type:'',
             percentage_upto:0,

             discount_amount: 0,
             product_id: [],
             percentage_shipping: 0
        };
         this.usage_settings={
            coupon_usage_limit:0,
            user_usage_limit:0
        };
         this.is_scheduler_active={
            status:'N'
        };
         this.scheduler={
            sun:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
            mon:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
            tue:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
            wed:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
            thu:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
            fri:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
            sat:{all_day: false,start_time: new Date().setHours(9,0,0),end_time: new Date().setHours(6,0,0)},
        };
         this.condition= new Rules();
    };


}


class RuleGroup{
    constructor() {
        this.id;
        this.status=''; //A=Active,I=Inactive
        this.rules=[]; // All rules will be "And" logic
    }
}
class AddonRule{
    constructor() {
        this.id;
        this.prop='P';
        this.val='';
        this.cond='eq'; //Equal, Not Equal;
    }
}


export {Coupons,Rules,RuleGroup,AddonRule};

