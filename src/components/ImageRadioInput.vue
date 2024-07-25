<template>
  <div class="apbd-img-input-ctrn" :style="`
  --apbd-imgr-in-label-w:${width};
  --apbd-imgr-in-label-mw:${maxWidth};
  --apbd-imgr-in-label-h:${height};
  --apbd-imgr-in-label-p:${padding};
  --apbd-imgr-in-border-radius:${borderRadius};
  --apbd-imgr-in-max-img-w:${maxImgWidth};
  --apbd-imgr-in-margin:${margin};
  --apbd-imgr-icon-size:${iconSize}`">
  <Field v-for="(option,key) in options" :key="key"  v-model="this.$attrs.modelValue" :name="field_name" :type="this.$attrs?.type?this.$attrs.type:'radio'" :value="option.val" >
    <input :id="field_name+key" :type="this.$attrs?.type?this.$attrs.type:'radio'" :name="field_name" v-model="this.$attrs.modelValue"   v-bind="$attrs" :value="option.val"/>
    <label :for="field_name+key" :class="(isInline?'apbd-imgr-inline ':'') + optionClass">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke-width="2" class="ai ai-CircleCheckFill">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6z"/>
      </svg>
        <div class="apbd-imgr-input-icon" v-if="option?.icon"><i :class="option.icon"></i></div>
        <div class="apbd-imgr-container" v-if="!option?.icon && option?.img_src"><img class="img-fluid" :src="option.img_src"/></div>
        <slot name="label" :option="option">
          <slot :name="'label-'+option.val" :option="option">
            <translate v-if="option?.label">{{ option.label }}</translate>
          </slot>
        </slot>
    </label>
  </Field>
  </div>
</template>

<script>
import {Field} from "vee-validate";
export default {
  name: "ImageRadioInput",
  inheritAttrs: false,
  components: {
    Field,
  },
  props: {
    width:{
      default: 'auto'
    },
    height:{
      default: 'auto'
    },
    maxWidth: {
      default: 'inherit'
    },
    maxImgWidth: {
      default: '50%'
    },
    borderRadius: {
      default: '5px'
    },
    margin:{
      default: '0 15px 15px 0'
    },
    padding:{
      default: '10px'
    },
    iconSize:{
      default: 'inherit;'
    },
    options:{
      default: []
    },
    isInline:{
      default: false
    },
    optionClass:{
      default: 'p-15'
    }

  },
  data(){
    return{
      field_name:'fld'
    }
  },
  mounted() {
    if(this.$attrs?.name) {
      this.field_name = this.$attrs.name;
    }
  }
}
</script>

<style scoped lang="scss">
.apbd-img-input-ctrn {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;

  input {
    visibility: hidden;
    position: absolute;
  }
  label {
    max-width:var(--apbd-imgr-in-label-mw, inherit);
    width:var(--apbd-imgr-in-label-w, auto);
    height:var(--apbd-imgr-in-label-h, auto);
    padding:var(--apbd-imgr-in-label-p,10px);
    align-items: center;
    display: inline-block;
    overflow: hidden;
    border: 1px solid transparent;
    box-shadow: 0 0 5px 0px #ccc;
    border-radius: var(--apbd-imgr-in-border-radius, 5px);
    margin: var(--apbd-imgr-in-margin,0 15px 15px 0);
    display: flex;
    flex-direction: column;
    justify-content: end;
    text-align: center;
    position: relative;
    transition: all 0.5s ease;
    cursor: pointer;
    .apbd-imgr-input-icon{
      font-size: var(--apbd-imgr-icon-size,inherit);
    }
    .apbd-imgr-container {
      max-width: var(--apbd-imgr-in-max-img-w, auto);
      overflow: hidden;
    }
    &.apbd-imgr-inline-2{
      display: flex;
      justify-content: center;
      align-items: center;
      svg{
        top:unset !important;
      }
    }
    &.apbd-imgr-inline{
      flex-direction: unset !important;
      justify-content: start !important;
      align-items: center !important;
      svg{
        top: unset !important;
        left: unset !important;
        position: unset;
        max-height:1rem;
        display:none;
        margin-right:2px;
      }
      .apbd-imgr-input-icon{
        margin:0 10px;
      }
      .apbd-imgr-container {
        >img {
          max-height: 1rem;
          margin:0 10px;
        }
      }

    }

    svg {
      width: 15px;
      position: absolute;
      top: -5px;
      left: 5px;

      color: var(--apbd-btn-bg-color,green);
      border-color: var(--apbd-btn-bg-color,green);
      transition: all 0.5s ease;
      opacity: 0;

    }
  }
  input:checked + label {
    color: var(--apbd-btn-bg-color,green);
    border-color: transparent;
    box-shadow: 0 0 5px 0px var(--apbd-btn-bg-color,green);;
    & svg{

      opacity: 0.8;
    }
  }

  input:checked + label.apbd-imgr-inline {
    & svg{
      opacity: 1;
      display:block;
    }

  }
}
</style>