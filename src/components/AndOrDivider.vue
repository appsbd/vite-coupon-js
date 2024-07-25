<template>
  <div class="add-or-divider d-flex justify-content-center" :style="`--apbd-add-or-bg: ${bgColor}; --apbd-add-or-color: ${color};`">
   <span> <span v-translate>{{ text }}</span></span>
  </div>
</template>

<script>
export default {
name: "AndOrDivider",
  props:{
    text:{
      default:'OR'
    },
    bgColor:{
      default:'#eaeaea'
    },
    color:{
      default:'#000'
    }
  }
}
</script>

<style scoped lang="scss">
.add-or-divider{

  padding: 10px;
  >span{
    display: flex;
    position: relative;
    justify-content: center;

    >span{
      background: var(--apbd-add-or-bg);
      width: 30px;
      height: 30px;
      text-align: center;
      font-size: 10px;
      font-weight: bold;
      border-radius: 50%;
      line-height: 30px;
      z-index: 5;
      color:var(--apbd-add-or-color);
    }
    &::before{
      content: "";
      background: var(--apbd-add-or-bg);
      height: 11px;
      width: 10px;
      position: absolute;
      top: -10px;
      left: 50%;
      margin-left: -5px;
      z-index:2;
    }
    &::after{
      content: "";
      background: var(--apbd-add-or-bg);
      height: 11px;
      width: 10px;
      position: absolute;
      bottom: -10px;
      left: 50%;
      margin-left: -5px;
      z-index:2;
    }

  }
}
</style>