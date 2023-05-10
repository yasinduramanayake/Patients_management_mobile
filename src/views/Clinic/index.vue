<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Clinics Settings</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="showmodal()">
            <ion-icon :icon="filter"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

      <ion-toolbar :class="is_ios ? 'ion-padding-top' : ''">
        <ion-searchbar
          v-on:keyup="search"
          @ionClear="search($event)"
          @ionChange="search($event)"
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
            <div v-if="filters.name">
              * Clinic display Name contains
              <b style="pading-left:10px;font-weight: 500;">
                {{ filters.name }}
              </b>
            </div>
            <br v-if="filters.state && filters.name" />
            <div v-if="filters.state">
              * Clinic display State contains
              <ion-text
                :color="getStatusWithColor(filters.state).color"
                style="pading-left:10px;font-weight: 500;"
              >
                {{ makeUpperCase(filters.state) }}
              </ion-text>
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
          button
          @click="() => router.push(`/clinics/${clinic.id}/view`)"
          v-for="clinic in clinics"
          :key="clinic.id"
        >
          <ion-label>
            <h2>
              {{ firstLetterUpperCase(clinic.name) }}
              <ion-badge
                :color="getStatusWithColor(clinic.state).color"
                style="font-size:8px !important"
              >
                {{ makeUpperCase(clinic.state) }}
              </ion-badge>
            </h2>
            <ion-text color="medium">
              <p>
                {{
                  firstLetterUpperCase(
                    clinic.owner.first_name + " " + clinic.owner.last_name
                  )
                }}
              </p>
              <p>Credit Limit - {{ getPrice(clinic.credit_limit) }}</p>
              <p>Receivables - {{ getPrice(clinic.receivables) }}</p>
            </ion-text>
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
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="primed" router-link="/clinic-create">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
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
  isPlatform,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
  modalController,
} from "@ionic/vue";
import { add, alarm, filter, closeOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import clinicAPI from "@/APIs/clinic";
import Modal from "@/views/Clinic/modals/filter.vue";

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
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonBackButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRefresher,
    IonRefresherContent,
  },
  data: function() {
    return {
      clinics: [],
      is_ios: isPlatform("ios"),
      timeout: null,
      filters: {},
      pagination: {
        per_page: 50,
        page: 1,
        total: 0,
        is_disabled: false,
      },
      show: false,
    };
  },
  setup() {
    const router = useRouter();
    return { router, add, alarm, filter, closeOutline };
  },

  beforeCreate() {},
  watch: {
    $route(value) {
      if (value && value.name === "clinic-create") this.list(true, true);
    },
  },
  async mounted() {
    await this.list(true, true);

    //this.selectedSegment = this.$route.params.segment.toString();
  },
  methods: {
    async list(loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.clinics = [];
      }
      let response = await clinicAPI.index(
        loading,
        this.pagination.page,
        this.pagination.per_page,
        this.filters
      );
      this.clinics = this.clinics.concat(response.data.data);
      this.pagination.total = response.data.meta.total;
    },
    // scroll end event
    async endScroll(event) {
      this.pagination.page++;
      await this.list(false);
      event.target.complete();
      if (this.clinics.length >= this.pagination.total) {
        // event.target.disabled = true;
      }
    },
    async doRefresh(event) {
      await this.list(false, true);
      event.target.complete();
    },
    // global search
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
      this.show = true;
      this.list(true, true);
    },
    onClose() {
      this.show = false;
      this.filters = "";
      this.list(true, true);
    },
    async showmodalprop() {
      let modal = await modalController.create({
        component: Modal,
        componentProps: {
          name: this.filters.name,
          state: this.filters.state,
        },
      });
      await modal.present();

      let formresponse = await modal.onDidDismiss();
      this.filters = formresponse.data.FormData;
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
.but {
  padding-right: 80px;
}
</style>
