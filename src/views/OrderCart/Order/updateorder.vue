<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button default-href="/" text=""></ion-back-button>
        </ion-buttons>
        <ion-title>Update Order</ion-title>
        <ion-buttons slot="end">
          <ion-button
            :disabled="form.order_type === '' || form.address_id === ''"
            @click="showdeliverytypes()"
            >Update
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
              @ionChange="LoadPatients($event)"
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
                :value="form.patient_id"
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
        <div class="err1" v-if="items.length <= 0">
          You must add at least one item
        </div>
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

            <ion-item v-if="item.id" class="ion-no-padding">
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
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import { add, alarm, remove, trashBin } from "ionicons/icons";
import { useRouter } from "vue-router";
import patientAPI from "@/APIs/patient";
import orderItemsAPI from "@/APIs/order-items";
import getTotalAPI from "@/APIs/calculatedTotal";
import { toast } from "@/common/toast";
import ItemModal from "@/views/OrderCart/modal/Items.vue";
import AddressAPI from "@/APIs/addresses";
import getSupportedDeliveryTypes from "@/APIs/getSuportedDeliveryTypes";
import { api_url } from "@/Constants/config";
import updateModal from "@/views/OrderCart/modal/UpdateModal.vue";

export default {
  name: "Folder",
  components: {
    alertController,
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
      delivery_types: [],
      form: {
        address_id: "",
        custom_reference_id: "",
        delivery_type_id: 5,
        items: [],
        order_cart_id: this.$route.params.id,
        order_type: "",
        patient_id: "",
      },
      products: {},

      errors: "",
      items: [{}],
      nextTodoId: 2,
      order: "",
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

  async ionViewWillEnter() {
    await this.oderItemsList(this.$route.params.order_id, true);
  },
  methods: {
    async oderItemsList(id) {
      this.order = (await orderItemsAPI.show(id)).data.data;
      await this.showClinicAddresses();
      if (
        this.order.order_type === "prescription" ||
        this.order.order_type === "stock"
      ) {
        await this.list();
        // this.form.patient_id = _.find(this.patients, {id: this.form.patient_id})
        await this.showPatientAddress();
      }

      this.form.order_type = this.order.order_type;
      this.form.patient_id = this.order.patient_id;
      this.form.address_id = this.order.address_id;
      this.items = this.order.items;

      for (let i = 0; i <= this.order.items.length; i++) {
        this.items[i].quantity = this.order.items[i].pivot.quantity;
        this.items[i].note = this.order.items[i].pivot.note;
      }
    },
    LoadPatients(e) {
      /* if (e.detail.value === "prescription" || e.detail.value === "stock") {
        this.list();
        this.showClnicaddresses();
      }
      if (e.detail.value === "sign") {
        this.showClnicaddresses();
      }
      this.form.address_id = "";
      this.form.patient_id = "";*/
    },
    loadAddressess() {
      if (this.patients.length !== 0) {
        this.showPatientAddress();
      }
      this.form.address_id = "";
    },
    enableAddress() {
      this.disable = false;
    },

    async list() {
      this.patients = (
        await patientAPI.index(true, 1, 50, this.filterPatient)
      ).data.data;
    },
    // async ItemView() {
    //   let modal = await modalController.create({
    //     component: Modal,
    //     componentProps: {
    //       propsData: {
    //         timeStamp: new Date(),
    //       },
    //     },
    //   });
    //   await modal.present();
    // },
    async showClinicAddresses() {
      this.clinicaddresses = (
        await AddressAPI.show(this.filterPatient.clinic_id)
      ).data.data;
    },
    async showPatientAddress() {
      if (this.patintaddress) {
        this.clinicaddresses.pop();
      }

      this.patintaddress = (
        await patientAPI.show(this.order.patient_id)
      ).data.data.address;
      this.clinicaddresses.push(this.patintaddress);
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
    async showdeliverytypes() {
      await this.suportedDeliveryTypes();
      if (this.selected_delivery_type !== null) {
        this.updateorder();
      } else {
        let modal = await modalController.create({
          component: updateModal,
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
    async updateorder() {
      if (this.form.order_type === "sign") {
        const payload = {
          address_id: this.form.address_id,
          custom_reference_id: this.form.custom_reference_id,
          items: this.items.map((x) => ({
            id: x.id,
            quantity: x.quantity,
            note: x.note ? x.note : "",
          })),
          order_cart_id: parseInt(this.form.order_cart_id),
          order_type: this.form.order_type,
          delivery_type_id: this.selected_delivery_type.id,
        };

        await orderItemsAPI
          .update(this.$route.params.order_id, payload)
          .then((res) => {
            toast("Order updated successfully", "success");
            this.$router.go(-1);
          })
          .catch(({ response }) => {
            this.errors = response.data.errors;
            if (response.status === 404) {
              toast("This order unable to update", "danger");
            }
            // this.errors = response.data.errors;
          });
      } else {
        const payload = {
          address_id: this.form.address_id,
          custom_reference_id: this.form.custom_reference_id,
          items: this.items.map((x) => ({
            id: x.id,
            quantity: x.quantity,
            note: x.note ? x.note : "",
          })),
          order_cart_id: parseInt(this.form.order_cart_id),
          order_type: this.form.order_type,
          patient_id: this.form.patient_id,
          delivery_type_id: this.selected_delivery_type.id,
        };

        await orderItemsAPI
          .update(this.$route.params.order_id, payload)
          .then((res) => {
            toast("Order updated successfully", "success");
            this.$router.go(-1);
          })
          .catch(({ response }) => {
            this.errors = response.data.errors;
            if (response.status === 404) {
              toast("This order unable to update", "danger");
            }
            // this.errors = response.data.errors;
          });
      }
    },
    async OrderItems(id) {
      this.order = (await orderItemsAPI.show(id)).data.data;
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
  beforeCreate() {},
};
</script>

<style scoped>
.err {
  color: red;
}
.err1 {
  color: red;
  padding-left: 70px;
  padding-bottom: 10px;
}

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

.required:after {
  content: " *";
  color: red;
}

#container a {
  text-decoration: none;
}
</style>
