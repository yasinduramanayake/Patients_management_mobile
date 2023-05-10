<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/clinics"></ion-back-button>
        </ion-buttons>
        <ion-title>Clinic</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <Menu></Menu>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/vue";
import {
  add,
  alarm,
  card,
  flag,
  options,
  people,
  person,
  personAdd,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import Menu from "@/views/Clinic/Menu/index.vue";

export default {
  name: "Folder",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBadge,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonFabButton,
    IonBackButton,
    Menu,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      is_ios: isPlatform("ios"),
    };
  },
  beforeCreate() {

  },
  setup() {
    const router = useRouter();
    return {
      router,
      add,
      alarm,
      person,
      card,
      options,
      flag,
      people,
      personAdd,
    };
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
