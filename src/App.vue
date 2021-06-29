<template>
  <div id="app">
    <jars-view/>
    <login-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JarsView from "@/components/JarsView.vue";
import LoginView from "@/components/LoginView.vue";

@Component({
  components: {
    LoginView, JarsView,
  },
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
