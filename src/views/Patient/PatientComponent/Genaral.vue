<template>
  <ion-page>
    <ion-list>
      <ion-item>
        <ion-label>
          <h2>Clinic</h2>
          <p>{{ firstLetterUpperCase(clinic.name) }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>First Name</h2>
          <p>{{ firstLetterUpperCase(patient.first_name) }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Last Name</h2>
          <p>{{ firstLetterUpperCase(patient.last_name) }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Date Of Birth</h2>
          <p>{{ patient.date_of_birth }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Gender</h2>
          <p>{{ firstLetterUpperCase(patient.gender) }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Email</h2>
          <p>{{ patient.email }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Phone Number 1</h2>
          <p>{{ patient.phone_1 }}</p>
        </ion-label>
      </ion-item>
      <div v-if="showphones">
        <ion-item>
          <ion-label>
            <h2>Phone Number 2</h2>
            <p>{{ patient.phone_2 }}</p>
            <p v-if="patient.phone_2 === null">N/A</p>
          </ion-label>
        </ion-item>
      </div>
      <ion-item>
        <ion-label>
          <h2>Street 1</h2>
          <p>
            {{ firstLetterUpperCase(address.address_line_1) }}
          </p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Street 2</h2>
          <p>
            {{ firstLetterUpperCase(address.address_line_2) }}
          </p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <h2>City</h2>
          <p>{{ firstLetterUpperCase(address.city) }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <h2>Post Code</h2>
          <p>{{ firstLetterUpperCase(address.post_code) }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Country</h2>
          <p>{{ firstLetterUpperCase(address.country) }}</p>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label>
          <h2>Note</h2>
          <p>{{ firstLetterUpperCase(patient.note) }}</p>
        </ion-label>
      </ion-item>
    </ion-list>
    <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button
        color="primed"
        @click="() => router.push(`/patientviewedit/${this.id}`)"
      >
        <ion-icon :icon="pencil"></ion-icon>
      </ion-fab-button>
    </ion-fab> -->
  </ion-page>
</template>
<script lang="ts">
import { IonItem, IonLabel, IonList, IonListHeader } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { create, add, pencil } from "ionicons/icons";
import patientAPI from "@/APIs/patient";

export default defineComponent({
  name: "Home",
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
  },
  data() {
    return {
      id: this.$route.params.id,
      patient: {},
      address: {},
      clinic: {},
      showphones: true,
    };
  },
  async mounted() {
    await this.show();
  },
  methods: {
    async show(loading = true, reset = false) {
      if (reset) {
        this.patient = {};
        this.address = {};
        this.clinic = {};
      }
      let response = await patientAPI.show(this.id, loading);
      this.patient = response.data.data;
      if (this.patient.phone_2 === "") {
        this.showphones = false;
      }
      this.address = response.data.data.address;
      this.clinic = response.data.data.clinic;
    },
  },
  watch: {
    $route(value) {
      if (value && value.name === "patient-edit") this.show();
    },
  },

  setup() {
    const router = useRouter();
    return { router, create, add, pencil };
  },
});
</script>
