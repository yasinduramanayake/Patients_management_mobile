<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button
            text=""
            default-href="/pending-orders/1964/view"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>Ordered Items</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle><h6>Primary Details</h6></ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-item class="ion-no-padding">
            <ion-label
              >Order type
              <p>{{ firstLetterUpperCase(orderitem.order_type) }}</p>
            </ion-label>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-label
              >Patient

              <p>
                {{ firstLetterUpperCase(first_name) }}
                {{ firstLetterUpperCase(last_name) }}
              </p>
            </ion-label>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-label
              >Address
              <p v-if="delivery_address_line_1 !== null">
                {{ firstLetterUpperCase(delivery_address_line_1) }},
              </p>
              <p v-if="delivery_address_line_2 !== null">
                {{ firstLetterUpperCase(delivery_address_line_2) }},
              </p>
              <p v-if="delivery_address_line_3 !== null">
                {{ firstLetterUpperCase(delivery_address_line_3) }}
              </p>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <h6><b>ITEMS</b></h6>
        </ion-card-header>
        <ion-card-content>
          <ion-row>
            <ion-col> </ion-col>
            <ion-col>
              <ion-label>Item</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>Amount</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>Quantity</ion-label>
            </ion-col>
          </ion-row>
          <ion-row
            v-for="item in orderitem.items"
            :key="item.id"
            style="border-bottom: groove;"
          >
            <ion-col>
              <img
                v-if="item.item_image_key === null"
                src="assets/draftded.png"
                width="50"
                height="50"
              />
              <img
                v-if="item.item_image_key !== null"
                :src="`${image_path}/${item.id}/image`"
                class="mt-3 v-lazy-image v-lazy-image-loaded"
                width="50"
                height="50"
              />
            </ion-col>
            <ion-col>
              <ion-label> {{ item.name }}<br /> </ion-label>
            </ion-col>
            <ion-col>
              <ion-label> {{ getPrice(item.price) }}</ion-label>
            </ion-col>
            <ion-col>
              <ion-label>{{ item.pivot.quantity }}</ion-label>
            </ion-col>
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
} from "@ionic/vue";
import { add, alarm, remove, trashBin } from "ionicons/icons";
import { useRouter } from "vue-router";
import shipmentsAPI from "@/APIs/shipments";
import orderItemsAPI from "@/APIs/order-items";

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
      routeid: this.$route.params.id,
      shipments: [],
      orderitem: [],
      order_id: "",
      orders: [],
      id: "",
      image_path: `${api_url}/admin/items`,
      first_name: "",
      last_name: "",
      delivery_address_line_1: "",
      delivery_address_line_2: "",
      delivery_address_line_3: "",
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
  beforeCreate() {

  },
  methods: {
    async oderitemslist() {
      let response = await orderItemsAPI.show(this.routeid);
      this.orderitem = response.data.data;
      this.first_name = this.orderitem.patient.first_name;
      this.last_name = this.orderitem.patient.last_name;
      this.delivery_address_line_1 = this.orderitem.shipment.delivery_address_line_1;
      this.delivery_address_line_2 = this.orderitem.shipment.delivery_address_line_2;
      this.delivery_address_line_3 = this.orderitem.shipment.delivery_address_line_3;
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
