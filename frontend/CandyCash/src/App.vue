<template>
  <div id="app">
    <Header />
    <div class="homepage">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Header,
  },
};
</script>

<style scoped>
.homepage {
  margin-top: 20px;
  text-align: center;
}

p {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 40px;
}
</style>
