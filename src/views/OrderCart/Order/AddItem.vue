<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Add Item</ion-title>
        <ion-buttons slot="end">
          <!--                    <ion-button router-direction="back" @click="() => router.back()">Complete</ion-button>-->
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-content>
          <form>
            <ion-item class="ion-no-padding">
              <ion-label>Select Item*</ion-label>
              <ion-select value="brown" ok-text="Okay" cancel-text="Dismiss">
                <ion-select-option
                  v-for="item in items"
                  :key="item.id"
                  :value="item.id"
                  >{{ item.name }}</ion-select-option
                >
              </ion-select>
            </ion-item>
            <ion-item class="ion-no-padding">
              <ion-label position="floating">Quantity</ion-label>
              <ion-input></ion-input>
            </ion-item>
            <br />
            <ion-button
              expand="block"
              size="default"
              color="primed"
              fill="outline"
              @click="() => router.back()"
            >
              <ion-icon slot="start" :icon="add"></ion-icon>
              Add Item
            </ion-button>
          </form>
        </ion-card-content>
      </ion-card>
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
  IonFab,
  IonFabButton,
  IonFabList,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { add, alarm, remove, trashBin } from "ionicons/icons";
import { useRouter } from "vue-router";
import clinicItemsAPI from "@/APIs/clinic_items";

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
    IonSelect,
    IonSelectOption,
    IonFab,
    IonFabButton,
    IonFabList,
    IonFooter,
    IonIcon,
    IonBackButton,
    IonItem,
    IonItemDivider,
    IonLabel,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      items: [],
      products: [
        {
          id: 1,
          name: "",
          address_line_1: "",
          city: "",
          post_code: "",
          address_line_2: "",
          country: "",

          prevHeight: 0,
        },
      ],
      nextTodoId: 2,
    };
  },
  setup() {
    const router = useRouter();
    return {
      add,
      alarm,
      remove,
      trashBin,
      router,
    };
  },
  async mounted() {
    await this.show();
  },
  methods: {
    async show() {
      let response = await clinicItemsAPI.show(this.id);
      this.items = response.data.data;
    },
    repeat() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      });
    },
    remove(index) {
      this.items.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
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
