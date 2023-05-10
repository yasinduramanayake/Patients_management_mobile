<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>My Profile</ion-title>
      </ion-toolbar>

      <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
        <ion-segment-button value="General">General</ion-segment-button>
        <ion-segment-button value="Addressess">Addresses</ion-segment-button>
        <ion-segment-button value="ChangePassword"
          >Change Password</ion-segment-button
        >
      </ion-segment>
    </ion-header>
    <ion-content>
      <div v-if="selectedSegment == 'General'">
        <Genaral></Genaral>
      </div>
      <div v-if="selectedSegment == 'Addressess'">
        <Addresses></Addresses>
      </div>
      <div v-if="selectedSegment == 'ChangePassword'">
        <ChangePassword></ChangePassword>
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
  isPlatform,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { document, person } from "ionicons/icons";
import profileAPI from "@/APIs/userprofile";
import Genaral from "@/views/Profile/Profile.vue";
import Addresses from "@/views/Profile/Addresses.vue";
import ChangePassword from "@/views/Profile/Forms/ResetPassword.vue";

export default defineComponent({
  name: "Home",
  components: {
    ChangePassword,
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
      profile_data: {},
      show: false,
      selectedSegment: "General",
    };
  },

  beforeMount() {
    this.profile();
  },

  methods: {
    segmentChanged(e: CustomEvent) {
      this.selectedSegment = e.detail.value;
    },
    async profile() {
      let response = await profileAPI.show();
      this.profile_data = response.data.data;
      console.log(this.profile_data.job_role.name);
      this.show = true;
    },
  },
  setup() {
    const router = useRouter();
    return { router, document, person };
  },
});
</script>
