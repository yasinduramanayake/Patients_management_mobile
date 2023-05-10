<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Order Info</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle><h6>Items</h6></ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-row
            v-for="item in orderitems.items"
            :key="item.id"
            style="border-bottom: groove;"
          >
            <ion-item class="ion-no-padding">
              <ion-row @click="showItemList(index)">
                <ion-col size="2">
                  <img
                    v-if="!item.item_image_key"
                    height="50"
                    src="assets/draftded.png"
                    width="50"
                  />

                  <img
                    v-if="item.item_image_key"
                    :src="`${image_path}/${item.id}/image`"
                    class="mt-3 v-lazy-image v-lazy-image-loaded"
                    height="50"
                    width="50"
                  />
                </ion-col>
                <br />
                <ion-col size="7">
                  <h2 class="ion-text-wrap">
                    {{ item.name }}
                  </h2>
                  <br />
                </ion-col>
                <br />
                <ion-col size="3">
                  <ion-text v-if="!errors" color="medium">
                    <div class="ion-text-end ion-text-wrap">
                      <p>{{ getPrice(item.price) }}/{{ item.unit }}</p>
                      <p class="ion-text-wrap">
                        {{ item.pivot.quantity }}
                      </p>
                    </div>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-item>
          </ion-row>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { api_url } from "@/Constants/config";
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
  IonInput,
} from "@ionic/vue";
import { add, alarm, remove, trashBin } from "ionicons/icons";
import { useRouter } from "vue-router";
import orderItemsAPI from "@/APIs/order-items";
import getTotalAPI from "@/APIs/calculatedTotal";

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
    IonInput,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      orderitems: [],
      total: "",
      image_path: `${api_url}/admin/items`,
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
    await this.oderitemslist();
  },
  methods: {
    async oderitemslist() {
      let response = await orderItemsAPI.show(this.id);
      this.orderitems = response.data.data;
    },
  },

  beforeCreate() {

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
