<template>
  <div id="jars-view">
    <div id="jars-list">
      <div v-if="jars.length < 1 && !downloadError && !downloading">No jars found, create account to start</div>
      <div v-if="downloadError">Failed to download jars
        <button @click="downloadJars">retry</button>
      </div>
      <div v-if="downloading" class="spinner"></div>
      <single-jar v-for="jar of jars" :key="jar.owner.name" :ownerName="jar.owner.name" :tips-given="jar.tipsGiven"
                  :tips-received="jar.tipsReceived" @refresh="updateJars"></single-jar>
    </div>
  </div>

</template>

<script lang="ts">
import SingleJar from "@/components/SingleJar.vue";
import { JarDto } from "@/services/jarsService/JarDto";
import { JarsService } from "@/services/jarsService/JarsService";
import { Component, Vue } from "vue-property-decorator";
import { Tip } from "@/services/jarsService/Tip";

@Component({
  components: {SingleJar}
})
export default class JarsView extends Vue {

  private jars: JarDto[] = [];
  private downloadError = false;
  private downloading = false;

  created() {
    this.downloadJars();
  }

  downloadJars() {
    this.downloading = true;
    this.downloadError = false;
    JarsService.getJars().then(jars => {
      this.jars = [];
      this.jars.push(...jars)
    }).catch(() => this.downloadError = true).finally(() => this.downloading = false);
  }

  updateJars(tip: Tip) {
    const fromJar = this.jars.find(jar => jar.owner.name === tip.from.name);
    const toJar = this.jars.find(jar => jar.owner.name === tip.to.name);
    console.log(fromJar, toJar);
    if (!fromJar || !toJar) {
      return this.downloadJars();
    }

    fromJar.tipsGiven.push(tip);
    toJar.tipsReceived.push(tip);
  }

}
</script>

<style>
.spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: s1 1s infinite;
  display: inline-block;
}

@keyframes s1 {
  to {
    transform: rotate(.5turn)
  }
}

</style>

