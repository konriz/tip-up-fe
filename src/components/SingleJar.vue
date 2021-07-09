<template>
  <div class="single-jar">
    <div class="button-container">
      <button @click="sendTip" :disabled="!canTip(ownerName)" :class="canTip(ownerName) ? '' : 'button-disabled'"><img
          alt="Vue logo"
          src="../assets/cash.png"
          width="75"></button>
    </div>
    <div><img alt="Vue logo" src="../assets/jar.png" width="180"></div>
    <div class="user-label">{{ ownerName }}</div>
    <div>
      <div class="icon-cell"><em class="far fa-money-bill-alt big green"></em></div>
      <div class="money-cell">{{ receivedSum }}</div>
    </div>
    <div>
      <div class="icon-cell"><em class="far fa-money-bill-alt big red"></em></div>
      <div class="money-cell">{{ givenSum }}</div>
    </div>
    <div>
      <div class="icon-cell"><em class="fas fa-balance-scale big"></em></div>
      <div class="money-cell">{{ receivedSum - givenSum }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Tip } from "@/services/jarsService/Tip";
import { JarsService } from "@/services/jarsService/JarsService";
import { CanTipMixin } from "@/mixin/CanTipMixin";
import { Component, Mixins } from "vue-mixin-decorator";
import { Prop } from "vue-property-decorator";

@Component
export default class SingleJar extends Mixins<CanTipMixin>(CanTipMixin) {

  @Prop() ownerName!: string;
  @Prop() tipsReceived!: Tip[];
  @Prop() tipsGiven!: Tip[];

  get receivedSum() {
    return this.sumTipsArray(this.tipsReceived);
  }

  get givenSum() {
    return this.sumTipsArray(this.tipsGiven);
  }

  private sumTipsArray(array: Tip[]): number {
    return array.map(tip => tip.amount).reduce((previous, current) => previous + current, 0);
  }

  private sendTip() {
    if (!this.$userStore.user) {
      return alert("You must be logged in")
    }
    const tip: Tip = {
      from: {name: this.$userStore.user?.name, secret: this.$userStore.user?.secret},
      to: {name: this.ownerName},
      amount: 10,
      message: "Tip for you!"
    }
    JarsService.sendTip(tip).then(() => this.$emit("refresh", tip)).catch((error) => alert(error));
  }
}
</script>

<style>
.single-jar {
  display: inline-block;
  padding: 15px;
}

.button-container {
  padding: 5px;
}

.user-label {
  font-weight: bold;
  font-size: 36px;
}

.green {
  color: green;
}

.red {
  color: red;
}

.big {
  font-size: 36px;
}

.icon-cell {
  display: inline-block;
  padding: 5px;
}

.money-cell {
  display: inline-block;
  padding: 5px;
  font-size: 36px;
}

.button-disabled {
  filter: grayscale(100%);
}
</style>
