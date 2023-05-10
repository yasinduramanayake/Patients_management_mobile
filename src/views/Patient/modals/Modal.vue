<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-title></ion-title>
        <ion-buttons slot="start">
          <ion-button v-on:click.prevent="onClose()">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button v-on:click.prevent="onSearch">
            <ion-icon :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label position="stacked" style=" font-size: 15px;"
            >Clinic</ion-label
          >
          <ion-select
            v-model="clinic_type"
            ok-text="Okay"
            cancel-text="Dismiss"
            placeholder=" Select Clinic"
          >
            <ion-select-option
              v-for="clinic in clinics"
              :key="clinic"
              :value="clinic"
              >{{ firstLetterUpperCase(clinic.name) }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">Full Name</ion-label>
          <ion-input
            type="text"
            v-model="filters.first_name"
            placeholder="Enter Full Name"
            :value="filters.first_name"
          ></ion-input>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">Email</ion-label>
          <ion-input
            type="email"
            v-model="filters.email"
            placeholder="Enter Email"
            :value="filters.email"
          ></ion-input>
        </ion-item>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import clinicAPI from "@/APIs/clinic";
import { closeOutline, search } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: ["name", "email", "clinicdetails"],
  data() {
    return {
      content: "Content",
      filters: {},
      clinics: {},
      show: false,
      clinic_type: {},
    };
  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonLabel,
    modalController,
    IonPage,
    IonIcon,
  },
  async mounted() {
    await this.getClinics();
    this.filters.email = this.email;
    this.filters.first_name = this.name;
    this.clinic_type = this.clinicdetails;
  },
  methods: {
    async getClinics() {
      let response = await clinicAPI.index(false);
      this.clinics = response.data.data;
    },
    onSearch(saveFormData) {
      this.filters.clinic_id = this.clinic_type.id;

      if (this.filters.email === undefined) {
        this.filters.email = "";
      }
      if (this.filters.first_name === undefined) {
        this.filters.first_name = "";
      }
      if (this.filters.clinic_id === undefined) {
        this.filters.clinic_id = "";
      }
      let formResponse = {
        FormData: saveFormData ? this.filters : null,
        FormData1: saveFormData ? this.clinic_type : null,
      };
      modalController.dismiss(formResponse);
      //   this.$parent.$emit("search", this.filters);
      //   this.close();
    },
    onClose() {
      modalController.dismiss();
    },
  },
  setup() {
    const router = useRouter();
    return { router, closeOutline, search };
  },
});
</script>
