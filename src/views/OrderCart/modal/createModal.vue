<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-title></ion-title>
        <ion-buttons slot="start">
          <ion-button v-on:click.prevent="onClose()">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="createorder()" :disabled="id === ''"
            >Continue</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label position="stacked" class="required"
            >Delivery Type</ion-label
          >
          <ion-select
            v-model="id"
            cancel-text="Dismiss"
            ok-text="Ok"
            placeholder="Select Delivery Type"
            value="brown"
          >
            <ion-select-option
              v-for="deliverytype in delivery_types"
              :key="deliverytype.id"
              :value="deliverytype.id"
            >
              <div>
                {{ firstLetterUpperCase(deliverytype.name) }}
              </div>
            </ion-select-option>
          </ion-select>
        </ion-item>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonTitle,
  IonToolbar,
  modalController,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import dliverytypesAPI from "@/APIs/delivery_types";
import { closeOutline } from "ionicons/icons";
import orderAPI from "@/APIs/orders";
import { toast } from "@/common/toast";

export default defineComponent({
  name: "createModal",
  props: [
    "address_id",
    "custom_reference_id",
    "order_cart_id",
    "order_type",
    "patient_id",
    "items",
    "delivery_types",
  ],
  data() {
    return {
      id: "",
      show: false,
      clinic_id: "",
      error: "",
      errors: "",
    };
  },
  components: {
    alertController,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonLabel,
    modalController,
    IonPage,
    IonIcon,
  },

  methods: {
    async createorder() {
      if (this.order_type === "sign") {
        const payload = {
          address_id: this.address_id,
          custom_reference_id: this.custom_reference_id,
          delivery_type_id: this.id,
          items: this.items.map((x) => ({
            id: x.id,
            quantity: x.quantity,
            note: x.note ? x.note : "",
          })),
          order_cart_id: this.order_cart_id,
          order_type: this.order_type,
        };
        await orderAPI
          .store(payload)
          .then((res) => {
            toast("Order created successfully", "success");
            this.onClose();
            this.$router.go(-1);
          })
          .catch(({ response }) => {
            //this.errors = response.error;
            if (response.status === 500) {
              this.error = response.data.error;
              toast(this.error, "danger");
            }
            if (response.status === 422) {
              this.errors = response.data.errors;
              let formResponse = {
                FormData: this.errors,
              };
              toast("Given Data Invalid", "danger");
              modalController.dismiss(formResponse);
            }
          });
      }
      // this.form.items = this.items;
      else {
        const payload = {
          address_id: this.address_id,
          custom_reference_id: this.custom_reference_id,
          delivery_type_id: this.id,
          items: this.items.map((x) => ({
            id: x.id,
            quantity: x.quantity,
            note: x.note ? x.note : "",
          })),
          order_cart_id: this.order_cart_id,
          order_type: this.order_type,
          patient_id: this.patient_id,
        };
        await orderAPI
          .store(payload)
          .then((res) => {
            toast("Order created successfully", "success");
            this.onClose();
            this.$router.go(-1);
          })
          .catch(({ response }) => {
            if (response.status === 500) {
              this.error = response.data.error;
              toast(this.error, "danger");
            }
            if (response.status === 422) {
              this.errors = response.data.errors;
              let formResponse = {
                FormData: this.errors,
              };
              modalController.dismiss(formResponse);
            }
          });
      }
    },
    async presentAlertConfirm() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Yes",
            handler: () => {
              this.createorder();
            },
          },
        ],
      });
      return alert.present();
    },
    onClose() {
      modalController.dismiss();
    },
    // onSearch(saveFormData) {
    //   let formResponse = {
    //     FormData: saveFormData ? this.filters : null,
    //   };
    //   modalController.dismiss(formResponse);
    //   //   this.$parent.$emit("search", this.filters);
    //   //   this.close();
    // },
  },
  setup() {
    const router = useRouter();
    return { router, closeOutline };
  },
});
</script>

<style>
.err {
  color: red;
}
.required:after {
  content: " *";
  color: red;
}
</style>
