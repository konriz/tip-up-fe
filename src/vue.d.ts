import { UserStore } from "@/store/UserStorePlugin";

declare module "vue-property-decorator" {
  interface Vue {
    $userStore: UserStore;
  }
}
