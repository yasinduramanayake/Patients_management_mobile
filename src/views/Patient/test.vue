<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Patients</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="openModal()">
            <ion-icon :icon="filter"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar :class="is_ios ? 'ion-padding-top' : ''" color="dark">
        <ion-searchbar></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item
          button
          @click="() => router.push(`/patient/${patient.id}/view`)"
          v-for="patient in patients"
          :key="patient.id"
        >
          <ion-label>
            <ion-row>
              <ion-col>
                <h2>{{ patient.first_name + " " + patient.last_name }}</h2>
                <ion-text color="medium">
                  <p>
                    {{}}
                  </p>
                  <p>{{ patient.email }}</p>
                </ion-text>
              </ion-col>
              <ion-col
                style="text-align: right"
                item-end
                class="ion-float-right"
              >
              </ion-col>
            </ion-row>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
    <ion-modal css-class="my-custom-class">
      <Modal @search="indexsearch"> </Modal>
    </ion-modal>
  </ion-page>
</template>

<script>
import {
  IonModal,
  IonButton,
  modalController,
  IonPage,
  IonContent,
  isPlatform,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add, alarm, filter } from "ionicons/icons";
import { useRouter } from "vue-router";
import patientAPI from "@/APIs/patient";
import Modal from "@/views/Patient/modals/Modal.vue";

export default defineComponent({
  components: { IonModal, IonButton, Modal, IonPage, IonContent },
  data() {
    return {
      modal: "",
      isOpen: false,
      filters: {},
      patients: [],
      is_ios: isPlatform("ios"),
    };
  },
  async mounted() {
    await this.list();
  },
  methods: {
    async list() {
      {
        let response = await patientAPI.index();
        this.patients = response.data.data;
      }
    },
    async createModal() {
      this.modal = await modalController.create({
        component: Modal,
        componentProps: {
          title: "Iniciar sesión",
          close: () => this.closeModal(),
        },
      });
    },
    async openModal() {
      await this.createModal();
      this.isOpen = true;
      this.modal.present();
    },
    closeModal() {
      this.isOpen = false;
      this.modal.dismiss().then(() => {
        this.modal = null;
      });
    },
    indexsearch(filters) {
      this.filters = filters;
      console.log(this.filters);
    },
  },
  setup() {
    const router = useRouter();

    return { router, add, alarm, filter };
  },
});
</script>
