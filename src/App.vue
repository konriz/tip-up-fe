<template>
  <div id="app">
    <login-view @login="updateAuthorized"/>
    <div id="unauthorized-message" v-if="!isAuthorized">You need to login first</div>
    <jars-view v-else/>
  </div>
</template>

<script lang="ts">
import JarsView from "@/components/JarsView.vue";
import LoginView from "@/components/LoginView.vue";
import { Component, Mixins } from "vue-mixin-decorator";
import { AuthorizationMixin } from "@/mixin/AuthorizationMixin";

@Component({
  components: {
    LoginView, JarsView,
  },
})
export default class App extends Mixins<AuthorizationMixin>(AuthorizationMixin) {

  private isAuthorized = false;

  private updateAuthorized() {
    this.isAuthorized = this.authorized();
  }
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
