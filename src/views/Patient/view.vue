<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/patients"></ion-back-button>
        </ion-buttons>
        <ion-title>Patient Details</ion-title>
        <ion-buttons slot="end">
          <ion-button
            v-if="selectedSegment === 'General'"
            @click="() => router.push(`/patientviewedit/${this.id}`)"
          >
            Edit
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
        <ion-segment-button value="General">General</ion-segment-button>
        <ion-segment-button value="Prescription"
          >Prescription</ion-segment-button
        >
      </ion-segment>
    </ion-header>
    <ion-content>
      <div v-if="selectedSegment == 'General'">
        <Genaral ref="refresh"></Genaral>
      </div>

      <div v-if="selectedSegment == 'Prescription'">
        <Prescription></Prescription>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonItem,
  IonLabel,
  IonList,
  IonFab,
  IonIcon,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonFabButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { create, add, pencil } from "ionicons/icons";
import Genaral from "@/views/Patient/PatientComponent/Genaral.vue";
import Prescription from "@/views/Patient/PatientComponent/Prescription.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonIcon,
    IonFab,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonBackButton,
    IonFabButton,
    Genaral,
    Prescription,
  },
  data() {
    return {
      id: this.$route.params.id,
      selectedSegment: "General",
    };
  },
  methods: {
    segmentChanged(e: CustomEvent) {
      this.selectedSegment = e.detail.value;
    },
  },
  async mounted() {
   // this.$refs.refresh.show(true, true);
  },
  beforeCreate() {

  },
  setup() {
    const router = useRouter();
    return { router, create, add, pencil };
  },
});
</script>
