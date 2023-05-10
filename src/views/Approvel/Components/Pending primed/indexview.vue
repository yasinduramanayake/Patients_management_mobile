<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/approvel"></ion-back-button>
        </ion-buttons>
        <ion-title>Pending Primed Orders</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-row style="background-color: #7464ff; color: white">
        <ion-col class="ion-margin-start ion-padding-bottom">
          <h5>
            {{ removeLeadingZeorsFromReferences(order.reference_id) }}
            <ion-badge
              v-if="order.state"
              :color="getStatusWithColor(order.state).color"
              style="font-size:12px !important"
            >
              {{ makeUpperCase(order.state) }}
            </ion-badge>
          </h5>
          <ion-text color="light-white">
            {{ getPrice(total.total) || "N/A" }}
            <span class="small-text"> TOTAL </span>
          </ion-text>
          <br />
          <ion-text color="light-white">
            {{ momentFormat(order.created_at, "ddd DD MMMM YYYY hh:mm:ss") }}
            <span class="small-text"> CREATED </span>
          </ion-text>

          <div v-if="order.submitted_time !== null">
            <ion-text v-if="order.state !== 'draft'" color="light-white">
              {{
                order.submitted_time
                  ? momentConvertToUTCAndReturn(
                      order.submitted_time,
                      "ddd DD MMMM YYYY hh:mm:ss"
                    )
                  : "N/A"
              }}
              <span class="small-text"> SUBMITTED </span>
            </ion-text>
          </div>

          <ion-text
            v-if="order.custom_reference_id !== null"
            color="light-white"
          >
            {{ order.custom_reference_id || "N/A" }}
            <span class="small-text"> REFERENCE </span>
          </ion-text>

          <ion-text color="light-white">
            {{ firstLetterUpperCase(name) }}
            <span class="small-text"> CLINIC </span>
          </ion-text>
          <br />
          <ion-text color="light-white">
            {{ firstLetterUpperCase(order.payment_state) }}
            <span class="small-text"> PAYMENT </span>
          </ion-text>
        </ion-col>
      </ion-row>

      <ion-card v-if="shipments.length === 0">
        <ion-card-content>
          <div class="img">
            <ion-icon
              slot="start"
              :icon="cart"
              color="red"
              style="font-size: 40px;"
            ></ion-icon>
            <br />
            <h2><b>There are no orders.</b></h2>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card v-for="shipment in shipments" :key="shipment.id">
        <ion-card-content>
          <b>Delivery Address</b>
          <br />
          <p v-if="shipment.address.name !== null">
            {{ firstLetterUpperCase(shipment.address.name) }},
          </p>

          <p v-if="shipment.address.address_line_1 !== null">
            {{ firstLetterUpperCase(shipment.address.address_line_1) }} ,
          </p>
          <p v-if="shipment.address.address_line_2 !== null">
            {{ firstLetterUpperCase(shipment.address.address_line_2) }},
          </p>
          <p v-if="shipment.address.address_line_3 !== null">
            {{ firstLetterUpperCase(shipment.address.address_line_3) }}
          </p>
          <p v-if="shipment.address.city !== null">
            {{ firstLetterUpperCase(shipment.address.city) }},
          </p>
          <p v-if="shipment.address.post_code !== null">
            {{ shipment.address.post_code }}
          </p>
          <ion-item class="ion-no-padding">
            <ion-label>Delivery Type</ion-label>
            <p>{{ shipment.delivery_type.name }}</p>
          </ion-item>
          <ion-list>
            <ion-list-header class="ion-no-padding"
              ><h2>Packages</h2></ion-list-header
            >
            <ion-item
              v-for="order in shipment.orders"
              :key="order.id"
              button
              class="ion-no-padding"
              @click="() => router.push(`/orderinfo/${order.id}/view`)"
            >
              <ion-label>
                <h4>
                  {{ removeLeadingZeorsFromReferences(order.reference_id) }}
                </h4>
                <p>{{ order.order_type }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonBackButton,
  IonLabel,
  IonItem,
  IonListHeader,
  IonList,
} from "@ionic/vue";
import { add, alarm } from "ionicons/icons";
import { useRouter } from "vue-router";
import orderAPI from "@/APIs/orders";
import shipmentsAPI from "@/APIs/shipments";
import delivery_typesAPI from "@/APIs/delivery_types";
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
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonBackButton,
    IonLabel,
    IonCardContent,
    IonItem,
    IonListHeader,
    IonList,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      order: {},
      name: "",
      shipments: [],
      options: {},
      total: "",
    };
  },
  setup() {
    const router = useRouter();
    return {
      add,
      alarm,
      router,
    };
  },
  async mounted() {
    await this.orderlist();
    await this.getTotal();
    await this.shipmentslist();
  },
  methods: {
    async orderlist() {
      let response = await orderAPI.show(this.id);
      this.order = response.data.data;
      this.name = response.data.data.clinic.name;
    },
    async shipmentslist() {
      let response = await shipmentsAPI.show(this.id);
      this.shipments = response.data.data;
      this.orders = response.data.data.orders;
      console.log(this.orders);
    },
    async getTotal() {
      let response = await getTotalAPI.show(this.id);
      this.total = response.data.data;
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
.small-text {
  font-size: 10px;
}
</style>
