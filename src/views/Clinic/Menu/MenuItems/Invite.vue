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
        <ion-title>Invitations</ion-title>
      </ion-toolbar>
      <ion-toolbar :class="is_ios ? 'ion-padding-top' : ''" color="primed">
        <ion-searchbar
          v-on:keyup="search"
          @ionClear="search($event)"
          @ionChange="search($event)"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="invitation in invitations" :key="invitation.id">
          <ion-label>
            <h2>
              {{ firstLetterUpperCase(invitation.clinic.name) }}
              <ion-badge
                :color="getStatusWithColor(invitation.state).color"
                style="font-size:8px !important"
              >
                {{ makeUpperCase(invitation.state) }}
              </ion-badge>
            </h2>
            <p>{{ invitation.email }}</p>
            <p>
              {{
                momentFormat(invitation.created_at, "ddd DD MMMM YYYY hh:mm:ss")
              }}
            </p>
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
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button
        color="primed"
        @click="() => router.push(`/sendinvitations/${id}`)"
      >
        <ion-icon :icon="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
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
  IonFab,
  IonFabButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add, alarm, filter, close } from "ionicons/icons";
import { useRouter } from "vue-router";
import cliniciansAPI from "@/APIs/clinicians";
import Modal from "@/views/Clinic/Menu/MenuItems/Users/modal/filter.vue";
import InvitationsAPI from "@/APIs/invitations";

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
    IonFab,
    IonFabButton,
  },
  data() {
    return {
      invitations: [],
      id: this.$route.params.id,
      filters: {},
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
  beforeCreate() {

  },
  watch: {
    $route(value) {
      if (value && value.name === "send-invitation") this.list(true, true);
    },
  },
  methods: {
    // list all patients
    async list(loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.invitations = [];
      }
      let response = await InvitationsAPI.show(
        this.id,
        loading,
        this.pagination.page,
        this.pagination.per_page,
        this.filters
      );
      this.invitations = this.invitations.concat(response.data.data);
      this.pagination.total = response.data.meta.total;
    },
    // scroll end event
    async endScroll(event) {
      this.pagination.page++;
      await this.list(false);
      event.target.complete();
      if (this.invitations.length >= this.pagination.total) {
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
        self.filters.email = event.target.value;
        self.list(false, true);
      }, 1000);
    },

    //filter
    // async filter(filters) {
    //   console.log(filters);
    //   this.filters = { ...this.filters, ...filters };
    //   await this.list(true, true);
    // },
    // async showmodal() {
    //   let modal = await modalController.create({
    //     component: Modal,
    //     componentProps: {
    //       propsData: {
    //         timeStamp: new Date(),
    //       },
    //     },
    //   });
    //   await modal.present();

    //   let formresponse = await modal.onDidDismiss();
    //   this.filters = formresponse.data.FormData;
    //   this.show = true;
    //   this.list(true, true);
    // },
    // onClose() {
    //   this.show = false;
    //   this.filters = "";
    //   this.list(true, true);
    // },
    // async showmodalprop() {
    //   let modal = await modalController.create({
    //     component: Modal,
    //     componentProps: {
    //       name: this.filters.first_name,
    //       email: this.filters.email,
    //       clinic_id: this.filters.clinic_id,
    //     },
    //   });
    //   await modal.present();

    //   let formresponse = await modal.onDidDismiss();
    //   this.filters = formresponse.data.FormData;
    //   this.show = true;
    //   this.list(true, true);
    // },
  },
  setup() {
    const router = useRouter();

    return { router, add, alarm, filter, close };
  },
});
</script>
<style scoped>
.img {
  margin-top: 50%;
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
