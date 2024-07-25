<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="icon-menu-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </symbol>
  </svg>
  <div class="container-fluid mt-3">
    <app-loader v-if="isLoading"></app-loader>
    <AppContainer v-else :is-min="isMinMenu" app-unique-id="vtpos">
      <template v-slot:app-logo>
        <router-link to="/" class=" link-dark text-decoration-none">
          <i class="vps vps-vite-pos"></i>
          <span class="apbd-app-title">
            <i class="vps vps-vt-pos"></i>
          </span>
        </router-link>

      </template>

      <template v-slot:main-menu>
        <ul class="apbd-main-menu" @click="">
          <li>
            <router-link to="/coupons" class="">
              <i class="vps  vps-user-o"></i>
              <span class="apbd-menu-title">All Coupons</span>
            </router-link>
          </li>
          <li>
            <router-link to="/categories" class="">
              <i class="vps  vps-user-o"></i>
              <span class="apbd-menu-title">Categories</span>
            </router-link>
          </li>
          <li>
            <router-link to="/settings" class="">
              <i class="vps  vps-user-o"></i>
              <span class="apbd-menu-title">Settings</span>
            </router-link>
          </li>
        </ul>
      </template>
      <template v-slot:menu-footer>

      </template>
      <template v-slot:app-content-header>
        <a href="/" class="d-flex align-items-center link-dark text-decoration-none">
                <span class="fs-4 apbd-menu-title">
                  {{ this.$translateGettext($route.meta.title) }}
                </span>
        </a>

      </template>
      <template v-slot:app-body>
        <router-view/>
        <modal v-if="view_help" modal-size="modal-xl" :hide-form="true" body-class="p-0" @close="view_help=false">
          <template v-slot:header>
            <i class="vps vps-help-circle me-1"></i>
            <translate>Help</translate>
          </template>
          <template v-slot:body>
            <help-module/>
          </template>
          <template v-slot:footer="{close}">
            <button type="button" class="btn btn-sm btn-secondary" @click="close" data-dismiss="modal" v-translate>
              Close
            </button>
          </template>
        </modal>
      </template>

    </AppContainer>
  </div>
</template>
<script>



import AppLoader from "@/components/AppLoader";
import AppContainer from "@/components/AppContainer";


export default {
  name: 'AuthLayout',
  components: {
    AppLoader,
    AppContainer
  },
  data() {
    return {
      isLoading: true,
      view_help: false,
      isMinMenu: false
    }
  },
  computed: {

  },
  async mounted() {
    this.isLoading = false;
  },
  methods: {

  }
}
</script>
