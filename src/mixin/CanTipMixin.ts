import { Vue } from "vue-property-decorator";
import { Mixin } from "vue-mixin-decorator";

@Mixin
export class CanTipMixin extends Vue {
  canTip(username: string): boolean {
    return username !== this.$userStore.user?.name;
  }
}
