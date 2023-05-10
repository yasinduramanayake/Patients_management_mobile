<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button default-href="/" text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Create Order</ion-title>
        <ion-buttons slot="end">
          <ion-button
            :disabled="form.order_type === '' || form.address_id === ''"
            @click="showdeliverytypes()"
            >Create
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Primary Details</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-item class="ion-no-padding">
            <ion-label position="stacked" class="required"
              >Order Types</ion-label
            >
            <ion-select
              v-model="form.order_type"
              placeholder="Select Order Type"
              @ionChange="loadPatients($event)"
            >
              <ion-select-option value="prescription"
                >Prescription
              </ion-select-option>
              <ion-select-option value="sign">Sign</ion-select-option>
              <ion-select-option value="stock">Stock</ion-select-option>
            </ion-select>
          </ion-item>
          <div
            v-for="error in errors.order_type"
            :key="error"
            class="err"
            style="padding-left:0px"
          >
            {{ error }}
          </div>

          <div
            v-if="
              form.order_type === 'prescription' || form.order_type === 'stock'
            "
          >
            <ion-item class="ion-no-padding">
              <ion-label position="stacked" class="required"
                >{{
                  form.order_type === "prescription" ? "Patients" : "Customers"
                }}
              </ion-label>
              <ion-select
                v-model="form.patient_id"
                :placeholder="
                  `Select ${
                    form.order_type === 'prescription'
                      ? 'patients'
                      : 'customers'
                  }`
                "
                cancel-text="Dismiss"
                ok-text="Ok"
                @ionChange="loadAddressess()"
              >
                <ion-select-option
                  v-for="patient in patients"
                  :key="patient.id"
                  :value="patient.id"
                  >{{ getFullName(patient) }}
                </ion-select-option>
              </ion-select>
            </ion-item>
          </div>

          <ion-item class="ion-no-padding">
            <ion-label position="stacked" class="required">Address</ion-label>
            <ion-select
              v-model="form.address_id"
              :disabled="form.order_type === ''"
              cancel-text="Dismiss"
              ok-text="Ok"
              placeholder="Select Address"
              value="brown"
            >
              <ion-select-option
                v-for="address in clinicaddresses"
                :key="address.id"
                :value="address.id"
              >
                {{ buildSingleAddress(address) }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <div
            v-for="error in errors.address_id"
            :key="error"
            class="err"
            style="padding-left:0px"
          >
            {{ error }}
          </div>
        </ion-card-content>
      </ion-card>
      <ion-card v-if="form.order_type !== ''">
        <ion-card-header>
          <ion-card-subtitle>Items</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
        >
          <ion-item v-if="!item.id" class="ion-no-padding">
            <ion-label>Item</ion-label>
            <ion-button
              fill="outline"
              size="small"
              @click="showItemList(index)"
            >
              <ion-icon :icon="add"></ion-icon>
            </ion-button>
          </ion-item>

          <div v-if="item.id || errors">
            <ion-item class="ion-no-padding">
              <ion-row @click="showItemList(index)">
                <ion-col size="2">
                  <img
                    v-if="!item.item_image_key && !errors"
                    height="50"
                    src="assets/draftded.png"
                    width="50"
                  />

                  <img
                    v-if="item.item_image_key"
                    :src="`${image_path}/${item.id}/image`"
                    class="mt-3 v-lazy-image v-lazy-image-loaded"
                    height="40"
                    width="40"
                  />
                </ion-col>

                <ion-col size="7">
                  <h2 class="ion-text-wrap">
                    {{ item.name }}
                  </h2>
                </ion-col>

                <ion-col size="3">
                  <ion-text v-if="!errors" color="medium">
                    <div class="ion-text-end ion-text-wrap">
                      <p>{{ getPrice(item.price) }}/{{ item.unit }}</p>
                    </div>
                  </ion-text>
                </ion-col>
              </ion-row>
            </ion-item>
            <div
              v-for="error in getErrorMessages(errors, `items.${index}.id`)"
              :key="error"
              class="err"
              style="padding-left:0px"
            >
              {{ error }}
            </div>
            <ion-item v-if="item.id || errors" class="ion-no-padding">
              <ion-label class="required" position="stacked"
                >Quantity
              </ion-label>
              <ion-input
                v-model="item.quantity"
                placeholder="Enter Quantity"
                type="number"
                value="1"
              ></ion-input>

              <div
                v-for="error in getErrorMessages(
                  errors,
                  `items.${index}.quantity`
                )"
                :key="error"
                class="err"
                style="padding-left:0px"
              >
                {{ error }}
              </div>
            </ion-item>

            <ion-item
              v-if="items[index].itemdetails !== ''"
              class="ion-no-padding"
            >
              <ion-label position="stacked">Patient direction/notes</ion-label>
              <ion-textarea
                v-model="item.note"
                placeholder="Patient direction/notes"
                type="text"
              ></ion-textarea>
            </ion-item>

            <ion-button
              fill="clear"
              size="small"
              style="float: right"
              @click="removeSelectedItem(index)"
            >
              <ion-icon :icon="trashBin" color="danger"></ion-icon>
            </ion-button>
          </div>
          <!--                    <ion-item-divider v-if="items.length > 1"></ion-item-divider>-->
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-button
          :disabled="form.order_type === ''"
          color="primed"
          expand="block"
          fill="outline"
          size="default"
          @click="repeat()"
        >
          <ion-icon slot="start" :icon="add"></ion-icon>
          Add Product
        </ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
var _ = require("lodash");
import {
  alertController,
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
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import { add, remove, trashBin } from "ionicons/icons";
import { useRouter } from "vue-router";
import patientAPI from "@/APIs/patient";
import AddressAPI from "@/APIs/addresses";
import getTotalAPI from "@/APIs/calculatedTotal";
import orderAPI from "@/APIs/orders";
import getSupportedDeliveryTypes from "@/APIs/getSuportedDeliveryTypes";
import ItemModal from "@/views/OrderCart/modal/Items.vue";
import { api_url } from "@/Constants/config";
import createModal from "@/views/OrderCart/modal/createModal.vue";
import { toast } from "@/common/toast";

export default {
  name: "Folder",
  components: {
    alertController,
    IonModal,
    ItemModal,
    IonTextarea,
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
      filterPatient: {
        clinic_id: this.$route.params.clinic_id,
      },
      image_path: `${api_url}/admin/items`,
      total: "",
      patients: [],
      addresses: [],
      clinicid: "",
      id: this.$route.params.id,
      shipments: [],
      orderitem: [],
      order_id: "",
      orders: [],
      itemdetails: "",
      errorsitems: "",
      clinicaddresses: [],
      patintaddress: null,
      form: {
        address_id: "",
        custom_reference_id: "",
        delivery_type_id: null,
        items: [],
        order_cart_id: this.$route.params.id,
        order_type: "",
        patient_id: "",
      },
      products: {},
      errors: "",
      items: [{}],
      nextTodoId: 2,
      is_cold_chain: "",
      delivery_types: [{}],
      selected_delivery_type: "",
    };
  },
  setup() {
    const router = useRouter();
    return {
      add,
      remove,
      trashBin,
    };
  },

  methods: {
    removeitem() {
      this.itemdetails = "";
    },

    loadPatients(e) {
      if (e.detail.value === "prescription" || e.detail.value === "stock") {
        this.list();
        this.showclnicaddresses();
      }
      if (e.detail.value === "sign") {
        this.showclnicaddresses();
      }
      this.form.address_id = "";
      this.form.patient_id = "";
    },
    loadAddressess() {
      if (this.patients.length !== 0) {
        this.showpatientaddress();
      }
      this.form.address_id = "";
    },
    enableAddress() {
      this.disable = false;
    },
    async list() {
      let response = await patientAPI.index(true, 1, 50, this.filterPatient);
      this.patients = response.data.data;
    },
    async showclnicaddresses() {
      let response = await AddressAPI.show(this.filterPatient.clinic_id);
      this.clinicaddresses = response.data.data;
    },
    async showpatientaddress() {
      if (this.patintaddress) {
        this.clinicaddresses.pop();
      }
      let response = await patientAPI.show(this.form.patient_id);
      this.patintaddress = response.data.data.address;

      this.clinicaddresses.push(this.patintaddress);
    },
    async suportedDeliveryTypes() {
      let payload = {
        address_id: this.form.address_id,
        order_cart_id: parseInt(this.form.order_cart_id),
        is_cold_chain: _.some(this.items, { is_cold_chain: 1 }),
      };
      let response = await getSupportedDeliveryTypes.store(payload);
      this.delivery_types = response.data.data.delivery_types;
      this.selected_delivery_type = response.data.data.selected_delivery_type;
    },
    async showItemList(index) {
      let modal = await modalController.create({
        component: ItemModal,
        componentProps: {
          propsData: {
            timeStamp: new Date(),
          },
        },
      });
      await modal.present();
      this.items[index] = (await modal.onDidDismiss()).data.FormData;
      this.show = true;
      this.list(true, true);
    },
    async showdeliverytypes() {
      await this.suportedDeliveryTypes();
      if (this.selected_delivery_type !== null) {
        this.createorder();
      } else {
        let modal = await modalController.create({
          component: createModal,
          componentProps: {
            address_id: this.form.address_id,
            custom_reference_id: this.form.custom_reference_id,
            order_cart_id: this.form.order_cart_id,
            order_type: this.form.order_type,
            patient_id: this.form.patient_id,
            items: this.items,
            delivery_types: this.delivery_types,
          },
        });
        await modal.present();
        this.errors = (await modal.onDidDismiss()).data.FormData;
      }
    },
    async createorder() {
      if (this.order_type === "sign") {
        const payload = {
          address_id: this.form.address_id,
          custom_reference_id: this.form.custom_reference_id,
          items: this.items.map((x) => ({
            id: x.id,
            quantity: x.quantity,
            note: x.note ? x.note : "",
          })),
          delivery_type_id: this.selected_delivery_type.id,
          order_cart_id: parseInt(this.form.order_cart_id),
          order_type: this.form.order_type,
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
            }
          });
      }
      // this.form.items = this.items;
      else {
        const payload = {
          address_id: this.form.address_id,
          custom_reference_id: this.form.custom_reference_id,
          items: this.items.map((x) => ({
            id: x.id,
            quantity: x.quantity,
            note: x.note ? x.note : "",
          })),
          order_cart_id: parseInt(this.form.order_cart_id),
          delivery_type_id: this.selected_delivery_type.id,
          order_type: this.form.order_type,
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
    repeat() {
      this.items.push({});
    },
    removeSelectedItem(index) {
      this.items.splice(index, 1);
    },

    async getTotal() {
      let response = await getTotalAPI.show(this.id);
      this.total = response.data.data;
    },
  },
  beforeCreate() {
    this.form = {
      address_id: "",
      custom_reference_id: "",
      delivery_type_id: null,
      items: [],
      order_cart_id: this.$route.params.id,
      order_type: "",
      patient_id: "",
    };
    this.items = [{}];
  },
};
</script>

<style scoped>
@import "../../../theme/custom.css";
</style>
