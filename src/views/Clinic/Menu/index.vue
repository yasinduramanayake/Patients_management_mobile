<template>
  <ion-list>
    <ion-item
      button
      v-for="item in menu"
      @click="() => router.push(item.routing)"
    >
      <ion-label>
        <h2>{{ item.heading }}</h2>
        <p>{{ item.paragraph }}</p>
      </ion-label>
      <ion-icon
        :icon="item.icon_name"
        style="color: #808080;"
        slot="start"
      ></ion-icon>
    </ion-item>
  </ion-list>
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
  },
  data: function() {
    return {
      Patients: [1, 2, 3, 4, 5, 6],
      menu: [
        {
          routing: `/clinicview/${this.$route.params.id}/genaral`,
          heading: "General",
          // paragraph: "This will explain the genaral details tab.",
          icon_name: person,
        },
        {
          routing: `/clinicview/${this.$route.params.id}/credits`,
          heading: "Credits",
          // paragraph: "This will explain the credits details tab.",
          icon_name: card,
        },
        {
          routing: `/clinicview/${this.$route.params.id}/items`,
          heading: "Items",
          // paragraph: "This will explain the Items details tab.",
          icon_name: options,
        },
        {
          routing: `/clinicview/${this.$route.params.id}/address`,
          heading: "Addresses",
          // paragraph: "This will explain the Address details tab.",
          icon_name: flag,
        },
        {
          routing: `/clinicview/${this.$route.params.id}/users`,
          heading: "Users",
          // paragraph: "This will explain the users details tab.",
          icon_name: people,
        },
        {
          routing: `/clinicview/${this.$route.params.id}/invite`,
          heading: "Invitations",
          // paragraph: "This will explain the invitations details tab.",
          icon_name: personAdd,
        },
      ],
      is_ios: isPlatform("ios"),
    };
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
