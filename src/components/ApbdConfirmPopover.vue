<template>
  <VDropdown>
    <slot>
      <button type="button" class="btn btn-grid-act btn-sm btn-danger" >
        <i class="vps vps-trash-2 "></i> <span v-translate>Remove</span>
      </button>
    </slot>
    <template #popper>
      <div class="p-3" :class="isLoading?'apbd-loading-parent':''">
        <div>{{this.$translateGettext(msg)}}</div>
        <slot name="desc"></slot>
        <div class="d-flex justify-content-center align-items-center mt-3">
          <slot name="actionButtons" :removeConfirmed="removeConfirmed">
          <button ref="remove" class="btn btn-sm btn-danger apbd-loading-btn" @click="removeConfirmed()">
            <translate class="apbd-loading-hide">Yes</translate>
          </button>
          <button v-close-popper.all class="ms-2 btn btn-sm btn-success apbd-loading-hide" v-translate>No</button>
          </slot>
        </div>
      </div>
    </template>
  </VDropdown>
</template>

<script>
import { hideAllPoppers } from 'floating-vue'
export default {
  name: "ApbdConfirmPopover",
  props:{
    msg:{
      default:'Are you sure?'
    },
    itemData:{
      default:null
    }
  },
  data(){
    return{
      isLoading:false
    }
  },
  methods:{
    closePopover(){
      hideAllPoppers();
    },
    showLoader(status){
      this.isLoading=status;
    },
    removeConfirmed(){
      this.$emit("onConfirmed",{showLoader:this.showLoader,itemData:this.itemData,closePopover:this.closePopover});
    }
  }
}
</script>

<style scoped>

</style>
