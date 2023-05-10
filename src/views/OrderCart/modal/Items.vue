<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-button v-on:click.prevent="onClose()">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Add Items</ion-title>
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
      <ion-list>
        <ion-item v-for="product in products" :key="product.id">
          <ion-label>
            <ion-row @click="addItem(product)">
              <ion-col size="2">
                <img
                  v-if="product.item_image_key === null"
                  src="assets/draftded.png"
                  width="50"
                  height="50"
                />
                <img
                  v-if="product.item_image_key !== null"
                  :src="`${image_path}/${product.id}/image`"
                  class="mt-3 v-lazy-image v-lazy-image-loaded"
                  width="40"
                  height="40"
                />
              </ion-col>

              <ion-col size="7">
                <h2 class="ion-text-wrap">
                  {{ product.name }}
                </h2>
              </ion-col>

              <ion-col size="3">
                <ion-text color="medium">
                  <div class="ion-text-end ion-text-wrap">
                    <p>{{ getPrice(product.price) }}/{{ product.unit }}</p>
                  </div>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-label>
        </ion-item>
        <div v-if="pagination.total == 0">
          <div class="img">
            <img src="assets/undraw_Location_search_re_ttoj.svg" />
            <h4 class="para">No entries found.</h4>
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
    </ion-content>
  </ion-page>
</template>
<script>
import {
  isPlatform,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSelect,
  IonTitle,
  IonToolbar,
  modalController,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonButton,
  IonButtons,
} from "@ionic/vue";
import { add, alarm, close, filter, closeOutline } from "ionicons/icons";
import orderAPI from "@/APIs/orders";
import { useRouter } from "vue-router";
import clinicItemsAPI from "@/APIs/clinic_items";
import { toast } from "@/common/toast";
import { api_url } from "@/Constants/config";

export default {
  name: "Folder",
  components: {
    IonButtons,
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonSelect,
    IonTitle,
    IonToolbar,
  },
  data: function() {
    return {
      itemdetails: {},
      products: [],
      image_path: `${api_url}/admin/items`,
      is_ios: isPlatform("ios"),
      timeout: null,
      filters: {},
      pagination: {
        per_page: 150,
        page: 1,
        total: 0,
        is_disabled: false,
      },
    };
  },
  setup() {
    const router = useRouter();
    return { router, add, alarm, filter, close, closeOutline };
  },
  async mounted() {
    await this.showproducts(true);
  },
  methods: {
    async showproducts(loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.products = [];
      }
      let response = await clinicItemsAPI.show(
        "1",
        loading,
        this.pagination.page,
        this.pagination.per_page,
        this.filters
      );
      this.products = this.products.concat(response.data.data);
      this.pagination.total = response.data.meta.total;
    },
    addItem(product) {
      product.quantity = 1;
      let formResponse = {
        FormData: product,
      };
      modalController.dismiss(formResponse);
    },
    search: function(event) {
      // clear timeout variable
      clearTimeout(this.timeout);

      var self = this;
      this.timeout = setTimeout(function() {
        //   enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.filters.name = event.target.value;
        self.showproducts(true, true);
      }, 1000);
    },
    // scroll end event
    async endScroll(event) {
      this.pagination.page++;
      await this.showproducts(false);
      event.target.complete();
      if (this.products.length >= this.pagination.total) {
        // event.target.disabled = true;
      }
    },
    async doRefresh(event) {
      await this.showproducts(false, true);
      event.target.complete();
    },
    onClose() {
      modalController.dismiss();
    },
  },
};
</script>
<style scoped>
@import "../../../theme/custom.css";
</style>
