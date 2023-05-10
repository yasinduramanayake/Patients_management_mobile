<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button
            text=""
            default-href="/clinics/25/view"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>Credits</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>
        <ion-list>
          <ion-item>
            <ion-label>
              <h2>Credit Limit</h2>
              <p>${{ this.clinic.credit_limit }}.00</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <h2>Raceivable</h2>
              <p>${{ this.clinic.receivables }}.00</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <h2>Unusable Credit</h2>
              <p>${{ this.clinic.unused_credits }}.00</p>
            </ion-label>
          </ion-item>
        </ion-list>
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
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonFabButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { add } from "ionicons/icons";
import clinicAPI from "@/APIs/clinic";

export default defineComponent({
  name: "Home",
  components: {
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
  },
  data() {
    return {
      id: this.$route.params.id,
      clinic: {},
    };
  },
  async mounted() {
    await this.show();
  },
  methods: {
    async show() {
      let response = await clinicAPI.show(this.id);
      this.clinic = response.data.data;
    },
  },
  setup() {
    const router = useRouter();
    return { router, add };
  },
  beforeCreate() {

  },
});
</script>
