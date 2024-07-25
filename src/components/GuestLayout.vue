<template>
  <div class="main-container d-flex justify-content-center">
    <div class="align-self-center">
      <div class="d-flex vh-100 p-3">
        <div class="card align-self-center form-bg user-card shadow-sm">
          <div class="card-body p-0">
            <div class="form-panel align-self-center">
              <router-view></router-view>
            </div>
            <div class="login-img text-center">
              <img :src="this.$appsbdUtls.getAssetUrl('assets/img/sale.png')" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuestLayout"
}
</script>

<style scoped lang="scss">
@import "../assets/scss/component/mixing";
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
.user-card{
  .card-body {
    min-height: 60vh;
    min-height: 60 dvh;
    .align-self-center{
      padding:25px;
    }
    >div{
      width:50%;
      min-width: 400px;
    }
    display: flex;
    .login-img{
      background: linear-gradient(-45deg, #02c9b6, #fff, #cad9de, #03a3c8);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      display: flex;
      overflow: hidden;
      justify-content: center;
      flex-direction: column;
      img{
        align-self: center;
      }
      border-top-right-radius: var(--bs-border-radius) !important;
      border-bottom-right-radius: var(--bs-border-radius) !important;
    }
  }
}
@include upto_small_device {
  .main-container {
    > .align-self-center{
      align-self: start !important;
    }
    .user-card {
      > .card-body {
        flex-direction: column-reverse;
        width: 90vw;
        width: 90dvw;

        > div {
          min-width: unset;
          width: 100%;
        }

        .login-img {
          min-height: 200px;
          align-items: center;
          justify-content: center;

          img {
            max-height: 150px;
          }
        }
      }
    }
  }
}
</style>