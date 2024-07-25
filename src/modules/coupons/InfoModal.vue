<template>
  <modal :modal-msg="msgs" modal-size="modal-lg" ref="product_modal" @close="$emit('close')">
    <template v-slot:header>
      <span class="fw-bold link-primary">Vitepos</span>
    </template>
    <template v-slot:body>
      <div class="row g-3">
        <div class="col-md-12">
          <span class="text-primary">Use your online store as local store with Vitepos. A Powerful Point of Sale (POS) for Restaurant Point of sale (POS) plugin for Wordpress & Woocommerce.</span>
        </div>
        <div class="col-md-3">
          <div class="card  h-100 card-white">
            <div class="card-body text-center">
             <h6 class="">Easy Setup</h6>
              Easy to setup with your woocommerce. Add your products and sell easily.
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-white h-100">
            <div class="card-body text-center">
             <h6 class="">Safe & Secure System</h6>
              It’s a secure, high-end, user-friendly platform with no bloatware. We promise that your data is safe and that you’re in control.
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-white h-100">
            <div class="card-body text-center">
             <h6 class="">All in One App</h6>
              A great software that lets you manage your whole store and track inventory in the shortest time.
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card card-white h-100">
            <div class="card-body text-center">
             <h6 class="">Premium Support</h6>
              We are always available 24/7 to offer support for your business needs. Appsbd has more than 5 years of experience.
            </div>
          </div>
        </div>

      </div>
    </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal" @click="$emit('close')" >Cancel</button>
      <a class="btn btn-sm btn-primary" href="https://vitepos.com/pricing/" target="_blank">Install Now</a>

    </template>
  </modal>
</template>

<script>
import Modal from "@/components/Modal";


export default {
  name: "InfoModal",
  components: {Modal},

  data() {
    return {


    }
  },
  mounted() {

  },
  computed: {

  },
  methods: {



  },

}
</script>

<style scoped>

</style>