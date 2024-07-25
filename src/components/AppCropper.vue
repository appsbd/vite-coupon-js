<template>
  <div class="d-flex align-items-center justify-content-center flex-column">
    <div style="max-width: 400px;max-height: 300px; overflow: hidden;">
      <vue-cropper v-show="imgSrc"
                   ref="cropper"
                   :src="imgSrc"
                   :aspectRatio="40/21"

                   @crop="crop"

      >
      </vue-cropper>
    </div>
    <button @click="saveImage" class="btn btn-primary mt-3">Crop</button>
  </div>

</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
  name: "AppCropper",
  components: {VueCropper},
  props: {
    mime_type: '',
    imgSrc: {
      default: '',
    }
  },
  emits: ['image_cropped'],
  methods: {
    crop(params) {
      // console.log(params);
    },

    saveImage() {
      const userId = this.$route.params.user_id
      this.$refs.cropper.getCroppedCanvas({
        maxWidth: 530,
        maxHeight: 225,
      });
      this.cropedImage = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        this.$emit("image_cropped", {blob: blob, url: this.$refs.cropper.getCroppedCanvas().toDataURL()});
      }, this.mime_type)
    },
  }
}
</script>

<style type="text/css" lang="scss">

</style>