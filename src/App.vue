<template>
  <div id="app">
    <router-view></router-view>
    <image-dialog ref="imageDialog" :max="maxChooseImage"></image-dialog>
    <!-- <spec-dialog ref="specDialog"></spec-dialog> -->
  </div>
</template>

<script>
import imageDialog from '@/components/image/image-dialog'
// import specDialog from '@/components/goods/spec/spec-dialog'
export default {
  name: 'App',
  provide() {
    return {
      app: this,
    }
  },
  components: {
    imageDialog,
    // specDialog
  },
  data() {
    return {
      maxChooseImage: 9,
    }
  },
  methods: {
    chooseImage(callback, max = 9) {
      this.maxChooseImage = max
      this.$refs.imageDialog.showDialog(callback)
    },
    // chooseSpec(callback) {
    //   this.$refs.specDialog.showDialog(callback)
    // }
  },
}
</script>

<style>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.25);
  transition: color 0.2s ease;
}
</style>
