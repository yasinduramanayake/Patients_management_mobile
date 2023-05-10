<template>
  <ion-page>
    <ion-header :translucent="true"> </ion-header>
    <ion-content>
      <ion-list>
        <center>
          <h1 v-if="show">
            {{
              profile_data.title +
                " " +
                profile_data.first_name +
                " " +
                profile_data.last_name
            }}
          </h1>
        </center>
        <ion-item>
          <ion-label>
            <h2>Title</h2>
            <p>{{ profile_data.title }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Gender</h2>
            <p>{{ profile_data.gender }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>E-mail</h2>
            <p>{{ profile_data.email }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Reg Number</h2>
            <p>{{ profile_data.reg_no }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Date Of Birth</h2>
            <p>{{ profile_data.date_of_birth }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Phone Number 1</h2>
            <p>{{ profile_data.phone_1 }}</p>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <h2>Phone Number 2</h2>
            <p>{{ profile_data.phone_2 }}</p>
          </ion-label>
        </ion-item>
        <!-- <ion-item button @click="() => router.push('/addresses')">
          <ion-label>
            <h2>Addresses</h2>
            <p>Click to see</p>
          </ion-label>
        </ion-item>

        <ion-item button @click="() => router.push('/reset')">
          <ion-label>
            <h2>Change Password</h2>
            <p>Click here to change</p>
          </ion-label>
        </ion-item> -->
      </ion-list>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { document, person } from "ionicons/icons";
import profileAPI from "@/APIs/userprofile";

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
  },
  data() {
    return {
      profile_data: {},
      show: false,
    };
  },
  beforeCreate() {},
  beforeMount() {
    this.profile();
  },

  methods: {
    async profile() {
      let response = await profileAPI.show();
      this.profile_data = response.data.data;
      console.log(this.profile_data.job_role.name);
      this.show = true;
    },
  },
  setup() {
    const router = useRouter();
    return { router, document, person };
  },
});
</script>
