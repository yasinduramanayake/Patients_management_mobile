<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Approval</ion-title>
        <!-- <ion-buttons slot="end">
          <ion-button @click="showmodal()">
            <ion-icon :icon="filter"></ion-icon>
          </ion-button>
        </ion-buttons> -->
      </ion-toolbar>

      <ion-segment :value="selectedSegment" @ionChange="segmentChanged">
        <ion-segment-button value="Pending">Pending</ion-segment-button>
        <ion-segment-button value="Pending Primed"
          >Pending Primed</ion-segment-button
        >
        <ion-segment-button value="Complete">Complete</ion-segment-button>
      </ion-segment>
    </ion-header>
    <ion-content>
      <div v-if="selectedSegment == 'Pending'">
        <Pending ref="modal_search1"></Pending>
      </div>

      <div v-if="selectedSegment == 'Pending Primed'">
        <pendingprimed ref="modal_search2"></pendingprimed>
      </div>
      <div v-if="selectedSegment == 'Complete'">
        <Complete ref="modal_search3"></Complete>
      </div>
      <!-- <div v-if="show">
        <div class="filter" style=" padding-top:5%;background-color:#e9e5f6 ">
          <div style="float:right;">
            <ion-buttons>
              <ion-button v-on:click.prevent="onClose()">
                <ion-icon :icon="closeOutline"></ion-icon>
              </ion-button>
            </ion-buttons>
          </div>
          <h6 class="para1">Search Criteria</h6>
          <div class="para2">
            <div v-if="filters.state">
              Order display State contains
              <b style="pading-left:10px"> {{ filters.state }} </b>
            </div>
            <div v-if="filters.payment_state">
              Order display Payment State contains
              <b style="pading-left:10px"> {{ filters.payment_state }} </b>
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
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
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
  isPlatform,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { add, alarm, filter, closeOutline } from "ionicons/icons";
import Pending from "@/views/Approvel/Components/Pending/index.vue";
import Complete from "@/views/Approvel/Components/Complete/index.vue";
import pendingprimed from "@/views/Approvel/Components/Pending primed/index.vue";
import Modal from "@/views/Approvel/modal/filter.vue";

export default defineComponent({
  name: "Home",
  components: {
    pendingprimed,
    Complete,
    Pending,
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
  },
  data() {
    return {
      show: false,
      selectedSegment: "Pending",
      orders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      is_ios: isPlatform("ios"),
      timeout: null,
    };
  },
  methods: {
    segmentChanged(e: CustomEvent) {
      this.selectedSegment = e.detail.value;
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
      if (this.selectedSegment === "Pending") {
        this.$refs.modal_search1.list(this.filters, true, true);
      } else if (this.selectedSegment === "Pending Primed") {
        this.$refs.modal_search2.list(this.filters, true, true);
      } else {
        this.$refs.modal_search3.list(this.filters, true, true);
      }
    },
    onClose() {
      this.show = false;
      this.filters = "";
      if (this.selectedSegment === "Pending") {
        this.$refs.modal_search1.list(this.filters, true, true);
      } else if (this.selectedSegment === "Pending Primed") {
        this.$refs.modal_search2.list(this.filters, true, true);
      } else {
        this.$refs.modal_search3.list(this.filters, true, true);
      }
    },
    // search(event) {
    //   clearTimeout(this.timeout);
    //   var self = this;
    //   this.timeout = setTimeout(function() {
    //     // enter this block of code after 1 second
    //     // handle stuff, call search API etc.
    //     self.filters.clinic_id = event.target.value;
    //     this.$refs.modal_search.list(self.filters, true, true);
    //   }, 1000);
    // },
    // search: function(event) {
    //   // clear timeout variable
    //   clearTimeout(this.timeout);

    //   var self = this;
    //   this.timeout = setTimeout(function() {
    //     // enter this block of code after 1 second
    //     // handle stuff, call search API etc.
    //     self.filters.clinic_id = event.target.value;
    //     this.$refs.modal_search.list(self.filters, true, true);
    //   }, 1000);
    // },

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
      this.show = true;
      if (this.selectedSegment === "Pending") {
        this.$refs.modal_search1.list(this.filters, true, true);
      } else if (this.selectedSegment === "Pending Primed") {
        this.$refs.modal_search2.list(this.filters, true, true);
      } else {
        this.$refs.modal_search3.list(this.filters, true, true);
      }
    },
  },
  mounted() {
    this.selectedSegment = "Pending";
  },
  setup() {
    const router = useRouter();
    return { router, add, alarm, filter, closeOutline };
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
</style>
