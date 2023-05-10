<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Orders</ion-title>
        <ion-buttons
          v-if="order.state !== 'waiting for primed approval'"
          slot="end"
        >
          <ion-button
            @click="
              () => router.push(`/order-cart/${id}/order/create/${clinic_id}`)
            "
            >Add To Order
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-row style="background-color: #7464ff; color: white">
        <ion-col class="ion-margin-start ion-padding-bottom or-cart">
          <h3>
            {{ removeLeadingZeorsFromReferences(order.reference_id) }}
            <ion-badge v-if="order.state" class="order-badge">
              {{ makeUpperCase(order.state) }}
            </ion-badge>
            <!-- :color="getStatusWithColor(order.state).color" -->
          </h3>
          <hr />

          <ion-text>
            <p>
              <span>Created Date:</span>
              {{ momentFormat(order.created_at, "ddd DD MMMM YYYY hh:mm:ss") }}
            </p>
          </ion-text>

          <br v-if="order.state !== 'draft'" />
          <ion-text v-if="order.state !== 'draft'">
            <p>
              <span>Submitted:</span>
              {{
                order.submitted_time
                  ? momentConvertToUTCAndReturn(
                      order.submitted_time,
                      "ddd DD MMMM YYYY hh:mm:ss"
                    )
                  : "N/A"
              }}
            </p>
          </ion-text>

          <ion-text>
            <p>
              <span>Reference:</span>
              {{ order.custom_reference_id || "N/A" }}
            </p>
          </ion-text>

          <ion-text>
            <p>
              <span>Clinic:</span>
              {{ firstLetterUpperCase(order.clinic.name) }}
            </p>
          </ion-text>

          <ion-text>
            <p>
              <span>Payment:</span>
              {{ firstLetterUpperCase(order.payment_state) }}
            </p>
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
              style="font-size: 40px"
            ></ion-icon>
            <br />
            <h2><b>There are no orders.</b></h2>
            <p>Click add to orders to add more orders</p>
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
          <ion-list>
            <ion-list-header class="ion-no-padding"
              ><h2>Packages</h2></ion-list-header
            >
            <ion-item
              v-for="order in shipment.orders"
              :key="order.id"
              class="ion-no-padding"
            >
              <ion-label>
                <h4>{{ order.reference_id }}</h4>
                <p>{{ order.order_type }}</p>
              </ion-label>
              <br />
              <ion-buttons>
                <ion-button
                  color="primed"
                  expand="block"
                  size="default"
                  @click="
                    () =>
                      router.push(
                        `/order-cart/${id}/order/edit/${clinic_id}/${order.id}`
                      )
                  "
                >
                  <ion-icon :icon="create" color="primed"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-buttons>
                <ion-button @click="DeleteOrder(order.id)">
                  <ion-icon :icon="trashBin" color="danger"></ion-icon>
                </ion-button>
              </ion-buttons>

              <ion-buttons>
                <ion-button
                  @click="() => router.push(`/orderdetails-info/${order.id}`)"
                >
                  <ion-icon :icon="eyeOutline" color="primed"></ion-icon>
                </ion-button>
              </ion-buttons>

              <br />
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-content>
          <ion-grid>
            <ion-row>
              <ion-col>
                <h6><b>Item Total</b></h6>
              </ion-col>
              <ion-col>
                <p>{{ getPrice(total.item_total) }}</p>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <h6><b>Delivery Total</b></h6>
              </ion-col>
              <ion-col>
                <p>{{ getPrice(total.delivery_total) }}</p>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <h6><b>Tax</b></h6>
              </ion-col>
              <ion-col>
                <p>{{ getPrice(total.item_tax) }}</p>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <h6><b>Total</b></h6>
              </ion-col>
              <ion-col>
                <p>{{ getPrice(total.total) }}</p>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-content>
          <ion-row>
            <ion-col>
              <ion-button
                v-if="order.state !== 'waiting for primed approval'"
                color="danger"
                expand="block"
                fill="outline"
                size="default"
                @click="DeleteCart()"
              >
                <ion-icon slot="start" :icon="trashBin"></ion-icon>
                Delete
              </ion-button>
            </ion-col>
            <ion-col>
              <ion-button
                v-if="order.state !== 'waiting for primed approval'"
                color="success"
                expand="block"
                fill="outline"
                @click="() => router.push(`/order-cart`)"
                size="default"
              >
                <ion-icon slot="start" :icon="trashBin"></ion-icon>
                Draft
              </ion-button>
            </ion-col>
          </ion-row>

          <ion-button
            v-if="order.state !== 'waiting for primed approval'"
            color="primed"
            expand="block"
            @click="Complete()"
          >
            <ion-icon slot="start" :icon="checkmark"></ion-icon>
            Pay With Credit
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  alertController,
} from "@ionic/vue";
import {
  add,
  alarm,
  cart,
  checkmark,
  create,
  trashBin,
  eyeOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import orderAPI from "@/APIs/orders";
import shipmentsAPI from "@/APIs/shipments";
import delivery_typesAPI from "@/APIs/delivery_types";
import deleteCartAPI from "@/APIs/order-cart";
import getTotalAPI from "@/APIs/calculatedTotal";
import completeCartAPI from "@/APIs/complete_cart";
import getAssigneesAPI from "@/APIs/getAssignees";
import { toast } from "@/common/toast";

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
    alertController,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      order: {
        clinic: {
          name: "",
        },
      },
      name: "",
      shipments: [],
      options: {},
      show: false,
      total: "",
      assignees: {},
      assigned_to: {
        assigned_to: "",
      },
      error: "",
      clinic_id: "",
    };
  },
  setup() {
    const router = useRouter();
    return {
      add,
      alarm,
      router,
      trashBin,
      create,
      checkmark,
      cart,
      eyeOutline,
    };
  },
  async beforeCreate() {},
  /*async mounted() {
    await this.shipmentslist(true, true);
  },*/

  async ionViewWillEnter() {
    await this.orderlist();
    await this.shipmentslist(true, true);
    await this.showdeliverytypes();
    await this.getTotal();
    await this.getAssignees();
  },

  methods: {
    async orderlist(reset = false) {
      if (reset) {
        this.order = {};
      }
      let response = await orderAPI.show(this.id);
      this.order = response.data.data;
      this.name = response.data.data.clinic.name;
      this.clinic_id = response.data.data.clinic_id;
    },
    async shipmentslist(loading = true, reset = false) {
      if (reset) {
        this.shipments = [];
      }
      let response = await shipmentsAPI.show(this.id, loading);
      this.shipments = response.data.data;

      if (this.shipments.length == 0) {
        this.show = true;
      }
    },
    async showdeliverytypes() {
      let response = await delivery_typesAPI.index();
      this.options = response.data.data;
    },
    async getAssignees() {
      let response = await getAssigneesAPI.show(this.id, true);
      this.assignees = response.data.data;
    },
    async getTotal() {
      let response = await getTotalAPI.show(this.id);
      this.total = response.data.data;
    },
    async completeCart() {
      await completeCartAPI
        .complete_cart(this.id, this.assigned_to)
        .then((res) => {
          toast("Cart completed successfully", "success");
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          this.error = response.data.error;
          if (response.status === 500) {
            toast(this.error, "danger");
          }
        });
    },
    async DeleteOrder(id) {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure To Delete This Order?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
          {
            text: "Yes",
            handler: () => {
              this.deleteorder(id);
            },
          },
        ],
      });
      alert.present();
    },
    async Complete() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are you sure to complete this order?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
          {
            text: "Yes",
            handler: () => {
              this.completeCart();
            },
          },
        ],
      });
      alert.present();
    },
    async DeleteCart() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure To Delete This Cart?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
          {
            text: "Yes",
            handler: () => {
              this.deleteCart();
            },
          },
        ],
      });
      alert.present();
    },
    async deleteCart() {
      await deleteCartAPI
        .delete(this.id)
        .then((res) => {
          toast("Cart deleted successfully", "success");
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          this.error = response.data.error;
          if (response.status === 500) {
            toast(this.error, "danger");
          }
        });
    },
    async deleteorder(id) {
      await orderAPI
        .delete(id)
        .then((res) => {
          toast("Order deleted successfully", "success");
          // this.orderlist(true);
          this.shipmentslist(true, true);
          this.getTotal();
        })
        .catch(({ response }) => {
          this.error = response.data.error;
          if (response.status === 500) {
            toast(this.error, "danger");
          }
        });
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

#apr {
  -moz-animation: cssAnimation 0s ease-in 5s forwards;
  /* Firefox */
  -webkit-animation: cssAnimation 0s ease-in 5s forwards;
  /* Safari and Chrome */
  -o-animation: cssAnimation 0s ease-in 5s forwards;
  /* Opera */
  animation: cssAnimation 0s ease-in 5s forwards;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

.small-text {
  font-size: 10px;
}
.img {
  margin-top: 2%;
  padding-left: 80px;
  padding-right: 60px;
}
</style>
