<template>
  <ion-content :fullscreen="true">
    <ion-list>
      <ion-item>
        <ion-label>
          <h1>ID document</h1>
        </ion-label>
        <ion-icon
          :icon="document"
          style="color: #808080;"
          slot="start"
        ></ion-icon>
      </ion-item>

      <ion-item>
        <ion-label>
          <h1>Copy of utility bill</h1>
        </ion-label>
        <ion-icon
          :icon="document"
          style="color: #808080;"
          slot="start"
        ></ion-icon>
      </ion-item>

      <ion-item>
        <ion-label>
          <h1>Qualification Certificate</h1>
        </ion-label>
        <ion-icon
          :icon="document"
          style="color: #808080;"
          slot="start"
        ></ion-icon>
      </ion-item>

      <ion-item>
        <ion-label>
          <h1>Insurance Certificate</h1>
        </ion-label>
        <ion-icon
          :icon="document"
          style="color: #808080;"
          slot="start"
        ></ion-icon>
      </ion-item>
    </ion-list>
  </ion-content>
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
