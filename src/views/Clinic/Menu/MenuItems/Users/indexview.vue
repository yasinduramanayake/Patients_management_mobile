<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button
            text=""
            default-href="/clinicview/25/users"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>Clinician</ion-title>
      </ion-toolbar>
      <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
        <ion-segment-button value="Genaral">Genaral</ion-segment-button>
        <ion-segment-button value="Address">Addresses </ion-segment-button>
        <ion-segment-button value="Documents">Documents</ion-segment-button>
      </ion-segment>
    </ion-header>
    <ion-content :fullscreen="true">
      <div style="text-align: center; margin-top: 15px">
        <div v-if="selectedSegment == 'Genaral'">
          <Genaral></Genaral>
        </div>

        <div v-if="selectedSegment == 'Address'">
          <Addresses></Addresses>
        </div>
      </div>

      <div v-if="selectedSegment == 'Documents'">
        <Documents></Documents>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { document } from "ionicons/icons";
import clinicianAPI from "@/APIs/clinicians";
import Genaral from "@/views/Clinic/Menu/MenuItems/Users/Components/Genaral.vue";
import Addresses from "@/views/Clinic/Menu/MenuItems/Users/Components/Address.vue";
import Documents from "@/views/Clinic/Menu/MenuItems/Users/Components/Documents.vue";

export default defineComponent({
  name: "Home",
  components: {
    Documents,
    Addresses,
    Genaral,
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
  },
  data() {
    return {
      id: this.$route.params.id,
      clinician_data: {},
      job_role: {},
      selectedSegment: "Genaral",
      cliic_attributes: [
        {
          label: "Title",
          value: "miss",
        },
        {
          label: "Proffetion",
          value: "Architecter",
        },
        {
          label: "First Name",
          value: "Yasindu",
        },
        {
          label: "Last Name",
          value: "Ramanayake",
        },
        {
          label: "Genader",
          value: "male",
        },
        {
          label: "DOB",
          value: "01.02.2021",
        },
        {
          label: "E-mail",
          value: "yasinduramanayake123@gmail.com",
        },
        {
          label: "Landline Number",
          value: "+34567567676",
        },
        {
          label: "Reg No",
          value: "357667",
        },
      ],
      cliic_attributes2: [
        {
          label: "Building Name",
          value: "MissXavierSchaden",
        },
        {
          label: "Street 1",
          value: "3923 Alessia Plaza",
        },
        {
          label: "Stret 2",
          value: "759 Hamill Green",
        },
        {
          label: "Country",
          value: "Hilpertton",
        },
        {
          label: "City",
          value: "male",
        },
        {
          label: "Postal Code",
          value: "L1 8JQ",
        },
      ],
    };
  },
  methods: {
    segmentChanged(e: CustomEvent) {
      this.selectedSegment = e.detail.value;
    },
    async clinician() {
      let response = await clinicianAPI.clinician_show(this.id);
      this.clinician_data = response.data.data;
      this.job_role = response.data.data.job_role;
      console.log(this.clinician_data);
    },
  },
  async mounted() {
    this.selectedSegment = "Genaral";
    await this.clinician();
  },
  setup() {
    const router = useRouter();
    return { router, document };
  },
  beforeCreate() {

  },
});
</script>
