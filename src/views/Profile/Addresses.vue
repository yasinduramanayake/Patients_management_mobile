<template>
  <ion-page>
    <ion-header :translucent="true"> </ion-header>
    <ion-content>
      <ion-list>
        <ion-item v-for="address in addresses" :key="address.id">
          <ion-label>
            <ion-row>
              <ion-col>
                <h2>{{ address.name }}</h2>
                <ion-text color="medium">
                  <p>{{ address.address_line_1 }},</p>
                  <p>{{ address.address_line_2 }},</p>
                  <p>{{ address.address_line_3 }},</p>
                  <p>{{ address.city }},</p>
                  <p>{{ address.country }},</p>
                  <p>{{ address.post_code }}</p>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-label>
        </ion-item>
      </ion-list>
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
import profileAPI from "@/APIs/userprofile";

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
  },
  data() {
    return {
      is_ios: isPlatform("ios"),
      addresses: [],
      Addresses: [
        {
          attention: "MissXavierSchaden",
          street_1: "123/5",
          street_2: "567/8",
          city: "kalutara",
          country: "srilanka",
          post_code: 3454544,
        },
        {
          attention: "MissXavierSchaden",
          street_1: "123/5",
          street_2: "567/8",
          city: "kalutara",
          country: "srilanka",
          post_code: 3454544,
        },
        {
          attention: "MissXavierSchaden",
          street_1: "123/5",
          street_2: "567/8",
          city: "kalutara",
          country: "srilanka",
          post_code: 3454544,
        },
        {
          attention: "MissXavierSchaden",
          street_1: "123/5",
          street_2: "567/8",
          city: "kalutara",
          country: "srilanka",
          post_code: 3454544,
        },
        {
          attention: "MissXavierSchaden",
          street_1: "123/5",
          street_2: "567/8",
          city: "kalutara",
          country: "srilanka",
          post_code: 3454544,
        },
        {
          attention: "MissXavierSchaden",
          street_1: "123/5",
          street_2: "567/8",
          city: "kalutara",
          country: "srilanka",
          post_code: 3454544,
        },
      ],
    };
  },
  methods: {
    async addresses_list() {
      let response = await profileAPI.show();
      this.addresses = response.data.data.addresses;
    },
  },
  async mounted() {
    await this.addresses_list();
  },
  setup() {
    const router = useRouter();
    return { router, document };
  },
});
</script>
