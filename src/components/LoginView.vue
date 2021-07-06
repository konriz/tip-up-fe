<template>
  <div class="user-panel">
    <h3>User panel</h3>
    <div v-if="username">{{ username }}
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <div>
        <input type="checkbox" v-model="registerMode"> Register
      </div>
      <div v-if="registerMode">
        <input placeholder="Name" v-model="registerName">
        <input placeholder="Secret" type="password" v-model="registerSecret">
        <input placeholder="Repeat secret" type="password" v-model="registerSecretRepeat">
        <button @click="register">Register</button>
      </div>
      <div v-else>
        <input placeholder="Name" v-model="name">
        <input placeholder="Secret" type="password" v-model="secret">
        <button @click="loginUser">Login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { LoginService } from "@/services/loginService/LoginService";

@Component
export default class LoginView extends Vue {

  private name = "";
  private secret = "";
  private username = "";

  private registerMode = false;
  private registerName = "";
  private registerSecret = ""
  private registerSecretRepeat = "";

  @Watch("registerMode") clearForms() {
    this.clearLoginForm();
    this.clearRegisterForm();
  }

  private clearLoginForm() {
    this.name = "";
    this.secret = "";
  }

  private clearRegisterForm() {
    this.registerName = "";
    this.registerSecret = "";
    this.registerSecretRepeat = "";
  }

  private async loginUser() {
    LoginService.login({name: this.name, secret: this.secret})
        .then(() => {
          this.$userStore.user = {name: this.name, secret: this.secret};
          this.clearForms();
        })
        .catch(() => {
          alert("Login failed");
          this.$userStore.user = undefined;
        }).finally(() => {
      this.setUserName(this.$userStore.user?.name || "");
      this.$emit("login");
    });
  }

  private register() {
    LoginService.register({name: this.registerName, secret: this.registerSecret}).then(() => {
      this.registerMode = false;
      alert("Register success!");
    }).catch(() => alert("Failed to register"));
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
  width: 1000px;
}
</style>
