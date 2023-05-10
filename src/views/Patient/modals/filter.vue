<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="dark">
        <ion-title></ion-title>
        <ion-buttons slot="start">
          <ion-button v-on:click.prevent="closepopup()">Close</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button v-on:click.prevent="searchonclick()">Search</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label>Selcet Clinic</ion-label>
          <ion-select
            value="brown"
            v-model="form.clinic_id"
            ok-text="Okay"
            cancel-text="Dismiss"
          >
            <ion-select-option
              v-for="option in options"
              :key="option.id"
              :value="option.id"
              >{{ option.name }}</ion-select-option
            >
          </ion-select>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">First Name</ion-label>
          <ion-input
            type="text"
            v-model="form.fullname"
            placeholder="Enter First Name"
          ></ion-input>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">E-mail</ion-label>
          <ion-input
            type="email"
            v-model="form.email"
            placeholder="Enter email"
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
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonLabel,
  modalController,
  IonPage,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import clinicAPI from "@/APIs/clinic";

export default defineComponent({
  name: "Modal",
  props: {
    title: { type: String, default: "Super Modal" },
    close: { type: Function },
  },
  data() {
    return {
      content: "Content",
      form: {
        email: "",
        fullname: "",
        clinic_id: "",
      },
      options: {},
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
  },
  async mounted() {
    await this.showclinic();
  },
  methods: {
    async showclinic() {
      let response = await clinicAPI.index(false);
      this.options = response.data.data;
    },
    closepopup() {
      setOpen(false);
    },
    searchonclick() {
      this.$emit("search", this.form);
      console.log(this.form);
    },
  },
  setup() {
    const router = useRouter();

    return { router };
  },
});
</script>
