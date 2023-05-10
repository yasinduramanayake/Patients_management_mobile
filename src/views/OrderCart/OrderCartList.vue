<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Order Carts</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showmodal()">
            <ion-icon :icon="filter"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-toolbar :class="is_ios ? 'ion-padding-top' : ''">
        <ion-searchbar
          @ionChange="search($event)"
          @ionClear="search($event)"
          v-on:keyup="search"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="show">
        <div class="filter" style=" padding-top:5%;background-color:#e9e5f6 ">
          <div style="float:right;">
            <ion-buttons>
              <ion-button v-on:click.prevent="onClose()">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </div>
          <b class="para1">Search Criteria</b>
          <br />
          <br />

          <div class="para2">
            <div v-if="filters.state">
              * Order display State contains
              <ion-text
                style="pading-left:10px;font-weight: 500;"
                :color="getStatusWithColor(filters.state).color"
              >
                {{ makeUpperCase(filters.state) }}
              </ion-text>
            </div>
            <br v-if="filters.payment_state && filters.state" />
            <div v-if="filters.payment_state">
              * Order display Payment State contains

              <ion-text
                style="pading-left:10px;font-weight: 500;"
                :color="getStatusWithColor(filters.payment_state).color"
              >
                {{ makeUpperCase(filters.payment_state) }}
              </ion-text>
            </div>
            <br v-if="clinic_type.name && filters.payment_state" />
            <div v-if="clinic_type.name">
              * Order display Clinic contains
              <b
                class="ion-text-wrap"
                style="pading-left:8px;font-weight: 500;"
              >
                {{ clinic_type.name }}
              </b>
            </div>
            <br />
            <ion-row>
              <a
                class="link"
                expand="block"
                v-on:click.prevent="showmodalprop()"
              >
                Change Criteria</a
              >
            </ion-row>
          </div>
          <br />
        </div>
      </div>

      <ion-list>
        <ion-item
          v-for="order in orders"
          :key="order.id"
          button
          @click="() => router.push(`/order-cart/${order.id}/view`)"
        >
          <ion-label>
            <ion-row>
              <ion-col>
                <h2>
                  {{ removeLeadingZeorsFromReferences(order.reference_id) }}
                  <ion-badge
                    :color="getStatusWithColor(order.state).color"
                    style="font-size:8px !important"
                  >
                    {{ makeUpperCase(order.state) }}
                  </ion-badge>
                </h2>
                <ion-text color="medium">
                  <p>
                    Created :
                    {{
                      momentFormat(
                        order.created_at,
                        "ddd DD MMMM YYYY hh:mm:ss"
                      )
                    }}
                  </p>
                  <p v-if="order.state !== 'draft'">
                    Submitted :
                    {{
                      order.submitted_time
                        ? momentConvertToUTCAndReturn(
                            order.submitted_time,
                            "ddd DD MMMM YYYY hh:mm:ss"
                          )
                        : "N/A"
                    }}
                  </p>
                  <p>
                    {{ order.custom_reference_id || "N/A"
                    }}<span class="small-text"> REFERENCE </span>
                  </p>
                  <p>Clinic - {{ firstLetterUpperCase(order.clinic.name) }}</p>
                  <p>
                    Payment - {{ firstLetterUpperCase(order.payment_state) }}
                  </p>
                </ion-text>
              </ion-col>
              <ion-col
                class="ion-float-right"
                item-end
                style="text-align: right"
              >
              </ion-col>
            </ion-row>
          </ion-label>
        </ion-item>
        <div v-if="pagination.total == 0">
          <div class="img">
            <img src="assets/undraw_Location_search_re_ttoj.svg" />
            <h6 class="para">No entries found.</h6>
          </div>
        </div>
      </ion-list>
      <br />
      <br />
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-infinite-scroll
        v-if="pagination.total !== 0"
        id="infinite-scroll"
        :disabled="pagination.is_disabled"
        threshold="100px"
        @ionInfinite="endScroll($event)"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data..."
        >
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>

      <ion-fab slot="fixed" horizontal="end" vertical="bottom">
        <ion-fab-button color="primed" @click="clinicModal()">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  alertController,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
  modalController,
} from "@ionic/vue";
import { add, alarm, closeOutline, filter } from "ionicons/icons";
import { useRouter } from "vue-router";
import orderAPI from "@/APIs/orders";
import Modal from "@/views/OrderCart/modal/filter.vue";
import ClinicModal from "@/views/OrderCart/modal/clinic_dropdown.vue";

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
    IonIcon,
    IonFabButton,
    alertController,
  },
  data: function() {
    return {
      clinic_type: "",
      orders: [],
      is_ios: isPlatform("ios"),
      timeout: null,
      filters: {},
      show: false,
      pagination: {
        per_page: 50,
        page: 1,
        total: 0,
        is_disabled: false,
      },
    };
  },
  setup() {
    const router = useRouter();
    return { router, add, alarm, filter, closeOutline };
  },

  async ionViewWillEnter() {
    await this.list(true, true);
  },
  watch: {
    $route(value) {
      if (value && value.name === "cart-view") this.list(true, true);
    },
  },
  beforeCreate() {},

  methods: {
    async list(loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.orders = [];
      }
      let response = await orderAPI.index(
        loading,
        this.pagination.page,
        this.pagination.per_page,
        this.filters
      );
      this.orders = this.orders.concat(response.data.data);
      this.pagination.total = response.data.meta.total;
    },
    search: function(event) {
      // clear timeout variable
      clearTimeout(this.timeout);

      var self = this;
      this.timeout = setTimeout(function() {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.filters.search = event.target.value;
        self.list(false, true);
      }, 1000);
    },
    // scroll end event
    async endScroll(event) {
      this.pagination.page++;
      await this.list(false);
      event.target.complete();
      if (this.orders.length >= this.pagination.total) {
        // event.target.disabled = true;
      }
    },
    async doRefresh(event) {
      await this.list(false, true);
      event.target.complete();
    },
    async showmodal() {
      let modal = await modalController.create({
        component: Modal,
        componentProps: {
          propsData: {
            timeStamp: new Date(),
          },
        },
      });
      await modal.present();

      let formresponse = await modal.onDidDismiss();
      this.filters = formresponse.data.FormData;
      this.clinic_type = formresponse.data.FormData1;
      this.show = true;
      this.list(true, true);
    },
    onClose() {
      this.show = false;
      this.filters = "";
      this.list(true, true);
    },
    async clinicModal() {
      let modal = await modalController.create({
        component: ClinicModal,
        componentProps: {
          propsData: {
            timeStamp: new Date(),
          },
        },
      });
      await modal.present();
    },
    async showmodalprop() {
      let modal = await modalController.create({
        component: Modal,
        componentProps: {
          state: this.filters.state,
          payment_state: this.filters.payment_state,
          clinic_id: this.filters.clinic_id,
        },
      });
      await modal.present();

      let formresponse = await modal.onDidDismiss();
      this.filters = formresponse.data.FormData;
      this.clinic_type = formresponse.data.FormData1;
      this.show = true;
      this.list(true, true);
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

.img {
  margin-top: 40%;
  padding-left: 80px;
  padding-right: 60px;
}

.para {
  padding-left: 50px;
}

.img1 {
  margin-top: 0%;
  padding-left: 250px;
  padding-right: 60px;
  margin-bottom: 0%;
}

.but {
}

.para1 {
  margin-top: 2%;
  padding-left: 15px;
  padding-right: 80px;
  margin-bottom: 5%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.para2 {
  margin-top: 0%;
  padding-left: 15px;
  margin-bottom: 5%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.row {
  padding-left: 5px;
}
.required:after {
  content: " *";
  color: red;
}

.but {
  padding-right: 80px;
}

.small-text {
  font-size: 10px;
}
</style>
