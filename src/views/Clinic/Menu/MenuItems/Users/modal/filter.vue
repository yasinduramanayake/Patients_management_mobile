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
          <ion-button v-on:click.prevent="onSearch">Search</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label position="stacked">Clinician Name</ion-label>
          <ion-input
            type="text"
            v-model="filters.first_name"
            placeholder="Enter Clinician Name"
            :value="filters.first_name"
          ></ion-input>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">E-mail</ion-label>
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
import { closeOutline } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: ["name", "email"],
  data() {
    return {
      content: "Content",
      filters: {},
      clinics: {},
      show: false,
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
    this.filters.first_name = this.name;
    this.filters.email = this.email;
  },
  methods: {
    async getClinics() {
      let response = await clinicAPI.index(false);
      this.clinics = response.data.data;
    },
    onSearch(saveFormData) {
      if (this.filters.first_name === undefined) {
        this.filters.first_name = "";
      }

      if (this.filters.email === undefined) {
        this.filters.email = "";
      }
      let formResponse = {
        FormData: saveFormData ? this.filters : null,
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
    return { router, closeOutline };
  },
});
</script>
