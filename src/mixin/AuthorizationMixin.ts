import { Vue } from "vue-property-decorator";
import { Mixin } from "vue-mixin-decorator";

@Mixin
export class AuthorizationMixin extends Vue {
  authorized() {
    return !!this.$userStore.user;
  }
}
