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
        <ion-title>Users</ion-title>
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
            <div v-if="filters.first_name">
              * User display Name contains
              <b style="pading-left:10px;font-weight: 500;">
                {{ filters.first_name }}
              </b>
            </div>
            <br v-if="filters.first_name && filters.email" />
            <div v-if="filters.email">
              * User display Email contains
              <b style="pading-left:10px;font-weight: 500;">
                {{ filters.email }}</b
              >
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
          @click="() => router.push(`/clinicusers/${clinician.id}/view`)"
          v-for="clinician in clinicians"
          :key="clinician.id"
        >
          <ion-label>
            <h2>
              {{
                firstLetterUpperCase(clinician.first_name + clinician.last_name)
              }}
              <ion-badge
                :color="getStatusWithColor(clinician.state).color"
                style="font-size:8px !important"
              >
                {{ makeUpperCase(clinician.state) }}
              </ion-badge>
            </h2>
            <p>{{ clinician.email }}</p>
            <p>{{ firstLetterUpperCase(clinician.job_role.name) }}</p>
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
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  isPlatform,
  modalController,
  IonSearchbar,
  IonToolbar,
  IonBackButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add, alarm, filter, closeOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import cliniciansAPI from "@/APIs/clinicians";
import Modal from "@/views/Clinic/Menu/MenuItems/Users/modal/filter.vue";

export default defineComponent({
  components: {
    IonBackButton,
    IonModal,
    IonButton,
    Modal,
    IonPage,
    IonContent,
    IonRow,
    IonCol,
    IonText,
    IonIcon,
    IonMenuButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonToolbar,
  },
  data() {
    return {
      id: this.$route.params.id,
      clinicians: [],
      show: false,
      modal: "",
      isOpen: false,
      filters: {},
      patients: [],
      is_ios: isPlatform("ios"),
      timeout: null,
      pagination: {
        per_page: 50,
        page: 1,
        total: 0,
        is_disabled: false,
      },
    };
  },
  async mounted() {
    await this.list();
  },
  beforeCreate() {},

  methods: {
    // list all patients
    async list(loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.clinicians = [];
      }
      let response = await cliniciansAPI.show(
        this.id,
        loading,
        this.pagination.page,
        this.pagination.per_page,
        this.filters
      );
      this.clinicians = this.clinicians.concat(response.data.data);
      this.pagination.total = response.data.meta.total;
    },
    // scroll end event
    async endScroll(event) {
      this.pagination.page++;
      await this.list(false);
      event.target.complete();
      if (this.clinicians.length >= this.pagination.total) {
        // event.target.disabled = true;
      }
    },
    // pull down refresh event
    async doRefresh(event) {
      await this.list(false, true);
      event.target.complete();
      console.log(this.pagination);
    },
    // global search
    search: function(event) {
      // clear timeout variable
      clearTimeout(this.timeout);

      var self = this;
      this.timeout = setTimeout(function() {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.filters.first_name = event.target.value;
        self.list(false, true);
      }, 1000);
    },
    //filter
    async filter(filters) {
      console.log(filters);
      this.filters = { ...this.filters, ...filters };
      await this.list(true, true);
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
          name: this.filters.first_name,
          email: this.filters.email,
        },
      });
      await modal.present();

      let formresponse = await modal.onDidDismiss();
      this.filters = formresponse.data.FormData;
      this.show = true;
      this.list(true, true);
    },
  },
  setup() {
    const router = useRouter();

    return { router, add, alarm, filter, closeOutline };
  },
});
</script>
<style scoped>
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
.small-text {
  font-size: 10px;
}
</style>
