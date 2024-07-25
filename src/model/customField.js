class CustomField{
    constructor(){
        this.id;
        this.label="";
        this.help_text="";
        this.show_where="";
        this.type='T';
        this.options=[];
        this.is_half_field="N";
        this.is_required="N";
        this.is_calculable="N";
        this.operator="";
        this.status="A";
    }
}
class Option{
    constructor() {
        this.val="";
        this.title="";
        this.is_selected="N"
    }
}
export {Option};
export default CustomField;