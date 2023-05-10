<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button default-href="/patients"></ion-back-button>
        </ion-buttons>
        <ion-title>Order View</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle
            ><h6><b>Primary Details</b></h6></ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <ion-item class="ion-no-padding">
            <ion-label
              >Order Type
              <p>{{ presription.order_type }}</p>
            </ion-label>
          </ion-item>

          <ion-item class="ion-no-padding">
            <ion-label
              >Reference Num
              <p>{{ presription.reference_id }}</p>
            </ion-label>
          </ion-item>

          <ion-item class="ion-no-padding">
            <ion-label
              >Patient Name
              <p>
                {{ firstLetterUpperCase(patient.first_name) }}
                {{ firstLetterUpperCase(patient.last_name) }}
              </p>
            </ion-label>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-label
              >Patient Email
              <p>
                {{ patient.email }}
              </p>
            </ion-label>
          </ion-item>
          <ion-item class="ion-no-padding">
            <ion-label>
              Delivery Address
              <p>{{ firstLetterUpperCase(address.address_line_1) }},</p>
              <p>{{ firstLetterUpperCase(address.address_line_2) }}</p>
              <p>{{ firstLetterUpperCase(address.address_line_3) }}</p>
              <p>{{ firstLetterUpperCase(address.city) }}</p>
              <p>{{ firstLetterUpperCase(address.country) }}</p>
              <p>{{ firstLetterUpperCase(address.post_code) }}</p>
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
            v-for="item in presription.items"
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
      id: this.$route.params.id,
      presription: {},
      patient: {},
      address: {},
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
      this.presription = response.data.data;
      this.patient = response.data.data.patient;
      this.address = response.data.data.shipment.address;
    },
    goBack() {
      this.$router.push(`/patientviewedit/${this.id}`);
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
