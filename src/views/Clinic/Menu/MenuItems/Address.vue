<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/clinics"></ion-back-button>
        </ion-buttons>
        <ion-title>Addresses</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div>
        <ion-list>
          <ion-item v-for="address in addresses" :key="address.id">
            <ion-label>
              <h2 v-if="address.name !== null">
                {{ firstLetterUpperCase(address.name) }},
              </h2>
              <p v-if="address.address_line_1 !== null">
                {{ firstLetterUpperCase(address.address_line_1) }},
              </p>
              <p v-if="address.address_line_2 !== null">
                {{ firstLetterUpperCase(address.address_line_2) }},
              </p>
              <p v-if="address.address_line_3 !== null">
                {{ firstLetterUpperCase(address.address_line_3) }},
              </p>
              <p v-if="address.city !== null">
                {{ firstLetterUpperCase(address.city) }},
              </p>
              <p v-if="address.country !== null">
                {{ firstLetterUpperCase(address.country) }},
              </p>
              <p v-if="address.post_code !== null">
                {{ firstLetterUpperCase(address.post_code) }}
              </p>
            </ion-label>
          </ion-item>
        </ion-list>
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
  IonFabButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { add } from "ionicons/icons";
import clinicAddressesAPI from "@/APIs/clinic_addresses";

export default defineComponent({
  name: "Home",
  components: {
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
    IonFabButton,
  },
  data() {
    return {
      id: this.$route.params.id,
      addresses: [],
    };
  },
  async mounted() {
    await this.show();
  },
  methods: {
    async show() {
      let response = await clinicAddressesAPI.show(this.id);
      this.addresses = response.data.data;
    },
  },
  setup() {
    const router = useRouter();
    return { router, add };
  },
  beforeCreate() {

  },
});
</script>
