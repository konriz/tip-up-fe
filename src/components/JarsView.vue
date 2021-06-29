<template>
  <div id="jars-list">
    <single-jar v-for="jar of jars" :key="jar.owner.name" :ownerName="jar.owner.name" :tips-given="jar.tipsGiven"
                :tips-received="jar.tipsReceived"></single-jar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SingleJar from "@/components/SingleJar.vue";
import { JarDto } from "@/services/jarsService/JarDto";
import { JarsService } from "@/services/jarsService/JarsService";

@Component({
  components: {SingleJar}
})
export default class JarsView extends Vue {

  private jars: JarDto[] = [];

  created() {
    this.downloadJars();
  }

  private downloadJars() {
    this.jars = [];
    JarsService.getJars().then(jars => this.jars.push(...jars)).catch(error => console.log(error));
  }
}
</script>


