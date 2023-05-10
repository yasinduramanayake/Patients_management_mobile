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
        <ion-title>Clinic Items</ion-title>
      </ion-toolbar>
      <ion-toolbar :class="is_ios ? 'ion-padding-top' : ''" color="primed">
        <ion-searchbar
          v-on:keyup="search"
          @ionClear="search($event)"
          @ionChange="search($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="items-page">
        <ion-list>
          <ion-item v-for="item in items" :key="item.id">
            <ion-label>
              <ion-row>
                <ion-col size="2">
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
                    width="40"
                    height="40"
                  />
                </ion-col>

                <ion-col size="7">
                  <h2 class="ion-text-wrap">
                    {{ item.name }}
                  </h2>
                  <div class="badge">
                    <ion-badge :color="getStatusWithColor(item.status).color">
                      {{ makeUpperCase(item.status) }}
                    </ion-badge>
                  </div>
                </ion-col>

                <ion-col size="3">
                  <ion-text color="medium">
                    <div class="ion-text-end ion-text-wrap">
                      <p>{{ getPrice(item.price) }}/{{ item.unit }}</p>
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
      </div>
      <br />
      <br />
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-infinite-scroll
        v-if="pagination.total !== 0"
        @ionInfinite="endScroll($event)"
        threshold="100px"
        id="infinite-scroll"
        :disabled="pagination.is_disabled"
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

<script lang="ts">
import { api_url } from "@/Constants/config";
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
import clinicItemsAPI from "@/APIs/clinic_items";

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
      items: [],
      filters: {},
      pagination: {
        per_page: 50,
        page: 1,
        total: 0,
        is_disabled: false,
      },
      image_path: `${api_url}/admin/items`,
    };
  },
  async mounted() {
    await this.show();
  },
  methods: {
    async show(loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.items = [];
      }
      let response = await clinicItemsAPI.show(
        this.id,
        loading,
        this.pagination.page,
        this.pagination.per_page,
        this.filters
      );
      this.items = response.data.data;
      this.pagination.total = response.data.meta.total;
    },
    search: function(event) {
      // clear timeout variable
      clearTimeout(this.timeout);

      var self = this;
      this.timeout = setTimeout(function() {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.filters.name = event.target.value;
        self.show(false, true);
      }, 1000);
    },
    // scroll end event
    async endScroll(event) {
      this.pagination.page++;
      await this.show(false);
      event.target.complete();
      if (this.orders.length >= this.pagination.total) {
        // event.target.disabled = true;
      }
    },
    async doRefresh(event) {
      await this.show(false, true);
      event.target.complete();
    },
  },
  beforeCreate() {

  },
  setup() {
    const router = useRouter();
    return { router, add };
  },
});
</script>

<style scoped>
@import "../../../../theme/custom.css";
</style>
