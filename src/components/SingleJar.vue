<template>
  <div class="single-jar">
    <div class="button-container">
      <button @click="sendTip"><img alt="Vue logo" src="../assets/cash.png" width="75"></button>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { Tip } from "@/services/jarsService/Tip";
import { JarsService } from "@/services/jarsService/JarsService";

@Component
export default class SingleJar extends Vue {

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
    const tip: Tip = {from: {name: "User"}, to: {name: this.ownerName}, amount: 10, message: ""}
    JarsService.sendTip(tip);
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
</style>
