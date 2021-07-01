<template>
  <div class="user-panel">
    <h3>User panel</h3>
    <div>{{ username }}</div>
    <div>
      <input placeholder="Name" v-model="name">
      <input placeholder="Secret" type="password" v-model="secret">
      <button @click="loginUser">Login</button>
      <button @click="register">Register</button>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoginService } from "@/services/loginService/LoginService";

@Component
export default class LoginView extends Vue {

  private name = "";
  private secret = "";
  private username = "";

  private async loginUser() {
    this.$userStore.user = await LoginService.login({name: this.name, secret: this.secret})
        .then(credentials => credentials)
        .catch(() => {
          alert("Login failed");
          return undefined;
        });
    this.setUserName(this.$userStore.user?.name || "");
    this.$emit("login");
  }

  private register() {
    LoginService.register({name: this.name, secret: this.secret});
  }

  private logout() {
    LoginService.logout().then(() => {
      this.$userStore.user = undefined;
      this.setUserName("");
      this.$emit("login");

    });

  }

  private setUserName(username: string) {
    this.username = username;
  }

}
</script>

<style>
.user-panel {
  border: black solid 1px;
  border-radius: 10px;
  padding: 10px;
  display: inline-block;
}
</style>
