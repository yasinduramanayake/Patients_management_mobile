<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button
            text=""
            default-href="/clinics/25/view"
          ></ion-back-button>
        </ion-buttons>
        <ion-title>General</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-list>
          <ion-item button @click="presentAlertPrompt()" lines="full">
            <ion-label>
              <ion-row>
                <ion-col>
                  <h2>Name</h2>
                  <ion-text color="medium">
                    <p>{{ firstLetterUpperCase(this.clinic.name) }}</p>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-label>
          </ion-item>
        </ion-list>
        <br />
        <ion-item>
          <ion-label>
            <h3>Allow multiple Order Carts?</h3>
            <p>This will be allows you to add multiple orders</p>
          </ion-label>
          <ion-toggle
            @click="is_multiple_order_carts()"
            v-model="is_multiple_order_carts_toogle"
            color="primed"
          ></ion-toggle>
        </ion-item>
        <ion-item>
          <ion-label>
            <h3>Allow multiple Orders in one cart?</h3>
            <p>This will be allows you to add multiple orders in one cart</p>
          </ion-label>

          <ion-toggle
            @click="is_multiple_orders()"
            v-model="is_multiple_orders_toogle"
            color="primed"
            :value="this.form.is_multiple_order_carts"
          ></ion-toggle>
        </ion-item>
      </form>
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
  alertController,
  IonInput,
  IonToggle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { add } from "ionicons/icons";
import clinicAPI from "@/APIs/clinic";
import { toast } from "@/common/toast";

export default defineComponent({
  name: "Home",
  components: {
    IonToggle,
    IonInput,
    IonContent,
    alertController,
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

      clinic: {},
      form: {
        name: "",
        is_multiple_order_carts: "",
        is_multiple_orders: "",
      },
      is_multiple_orders_toogle: false,
      is_multiple_order_carts_toogle: false,
    };
  },
  methods: {
    async show() {
      let response = await clinicAPI.show(this.id);
      this.clinic = response.data.data;
      this.is_multiple_order_carts_toogle = this.clinic.is_multiple_order_carts;
      this.is_multiple_orders_toogle = this.clinic.is_multiple_orders;
    },
    async update(payload) {
      let response = await clinicAPI.update(this.id, payload);
      this.clinic = response.data.data;
    },
    updateclinic(alertData) {
      this.form.name = alertData.name2;
      this.form.is_multiple_order_carts = this.clinic.is_multiple_order_carts;
      this.form.is_multiple_orders = this.clinic.is_multiple_orders;
      this.update(this.form);
    },
    async presentAlertPrompt() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Edit Name",
        inputs: [
          {
            name: "name2",
            id: "name2-id",
            value: this.clinic.name,

            placeholder: this.clinic.name,
          },
          // input date with min & max
        ],
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              console.log("Confirm Cancel");
            },
          },
          {
            text: "Ok",
            handler: (alertData) => {
              if (alertData.name2 === "") {
                toast("Enter valid name", "danger");
                return false;
              }
              this.updateclinic(alertData);
            },
          },
        ],
      });
      return alert.present();
    },

    is_multiple_orders() {
      if (this.is_multiple_orders_toogle === true) {
        this.form.is_multiple_orders = false;
      } else {
        this.form.is_multiple_orders = true;
      }
      this.form.name = this.clinic.name;
      this.form.is_multiple_order_carts = this.clinic.is_multiple_order_carts;
      this.update(this.form);
    },
    is_multiple_order_carts() {
      if (this.is_multiple_order_carts_toogle === true) {
        this.form.is_multiple_order_carts = false;
      } else {
        this.form.is_multiple_order_carts = true;
      }
      this.form.name = this.clinic.name;
      this.form.is_multiple_orders = this.clinic.is_multiple_orders;
      this.update(this.form);
    },
  },
  async mounted() {
    await this.show();
  },
  setup() {
    const router = useRouter();
    return { router, add };
  },
  beforeCreate() {},
});
</script>
<style scoped></style>
