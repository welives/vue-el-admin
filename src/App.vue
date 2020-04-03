<template>
  <div id="app">
    <router-view></router-view>
    <choose-image ref="chooseImage" :max="maxChooseImage"></choose-image>
    <choose-spec ref="chooseSpec"></choose-spec>
  </div>
</template>

<script>
import chooseImage from '@/components/image/choose-image'
import chooseSpec from '@/components/shop/spec/choose-spec'
export default {
  name: 'App',
  provide() {
    return {
      $app: this,
    }
  },
  components: {
    chooseImage,
    chooseSpec,
  },
  data() {
    return {
      maxChooseImage: 9,
    }
  },
  methods: {
    chooseImage(callback, max = 9) {
      this.maxChooseImage = max
      this.$refs.chooseImage.showDialog(callback)
    },
    chooseSpec(callback) {
      this.$refs.chooseSpec.showDialog(callback)
    },
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
