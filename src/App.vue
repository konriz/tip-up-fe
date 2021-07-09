<template>
  <div id="app">
    <login-view @login="updateAuthorized"/>
    <div id="unauthorized-message" v-if="!isAuthorized">You need to login first</div>
    <jars-view ref="jarsView" v-else/>
  </div>
</template>

<script lang="ts">
import JarsView from "@/components/JarsView.vue";
import LoginView from "@/components/LoginView.vue";
import { Component, Mixins } from "vue-mixin-decorator";
import { AuthorizationMixin } from "@/mixin/AuthorizationMixin";
import { APIURL } from "@/main";
import { Watch } from "vue-property-decorator";
import { Tip } from "@/services/jarsService/Tip";

@Component({
  components: {
    LoginView, JarsView,
  },
})
export default class App extends Mixins<AuthorizationMixin>(AuthorizationMixin) {

  private isAuthorized = false;
  private eventSource?: EventSource;

  private updateAuthorized() {
    this.isAuthorized = this.authorized();
  }

  @Watch("isAuthorized")
  private registerSse() {
    if (this.isAuthorized) {
      this.attachSseHandler();
    } else {
      this.eventSource?.close();
      console.log("Event source closed");
    }
  }

  attachSseHandler() {
    if (!this.eventSource) {
      this.eventSource = new EventSource(APIURL + "/events");
    }
    this.eventSource.onopen = () => console.log("Event source opened");
    this.eventSource.onerror = (error) => console.log("Event source error : " + error);
    this.eventSource.onmessage = (message: MessageEvent) => {
      const eventData: Tip = JSON.parse(message.data);
      console.log(eventData);
      if (eventData.from.name !== this.$userStore.user?.name) {
        console.log("Jars update");
        (this.$refs.jarsView as JarsView).updateJars(eventData);
      }
    };
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
