<template>
  <div>
    <input placeholder="Login" v-model="login">
    <input placeholder="Secret" type="password" v-model="secret">
    <button @click="loginUser">Login</button>
    <button @click="register">Register</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoginService } from "@/services/loginService/LoginService";

@Component
export default class LoginView extends Vue {

  private login = "";
  private secret = "";

  private loginUser() {
    LoginService.login(this.login, this.secret);
  }

  private register() {
    LoginService.register(this.login, this.secret);
  }

  private logout() {
    LoginService.logout();
  }

}
</script>
