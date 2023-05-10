<template>
  <ion-page>
    <ion-header :translucent="true"> </ion-header>
    <ion-content>
      <form>
        <ion-item style=" border-radius: 25px;" lines="full">
          <ion-label class="required" position="stacked"
            >Current Password</ion-label
          >
          <ion-input
            type="password"
            required
            v-model="form.current_password"
            placeholder="Enter Current Password"
          ></ion-input>
          <div
            v-for="error in getErrorMessages(errors, `current_password`)"
            :key="error"
            class="err"
            style="padding-left:0px"
          >
            {{ error }}
          </div>
        </ion-item>
        <br />
        <ion-item style=" border-radius: 25px;" lines="full">
          <ion-label class="required" position="stacked"
            >New Password</ion-label
          >
          <ion-input
            type="password"
            required
            v-model="form.password"
            placeholder="Enter New Password"
          ></ion-input>
        </ion-item>
        <br />
        <ion-item style=" border-radius: 25px;" lines="full">
          <ion-label class="required" position="stacked"
            >Confirm New Password</ion-label
          >
          <ion-input
            required
            type="password"
            v-model="form.password_confirmation"
            placeholder="Confirm New Password"
          ></ion-input>
        </ion-item>
        <div
          v-for="error in getErrorMessages(errors, `password`)"
          :key="error"
          class="err"
          style="padding-left:13px"
        >
          {{ error }}
        </div>
        <br />
        <ion-button color="primed" @click="resetpassword()" expand="block"
          >Change Password</ion-button
        >
      </form>
    </ion-content>
  </ion-page>
</template>
<script>
import {
  IonBackButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonHeader,
} from "@ionic/vue";
import { defineComponent } from "vue";
import profileAPI from "@/APIs/userprofile";

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonBackButton,
    IonPage,
    IonContent,
    IonInput,
    IonHeader,
  },
  data() {
    return {
      form: {
        current_password: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  mounted() {
    this.form = {};
  },
  methods: {
    async resetpassword() {
      await profileAPI
        .updatepassword(this.form)
        .then(() => {
          toast("Password changed successfully", "success");
          this.form = {};
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
        });
    },
  },
});
</script>
<style scoped>
#form {
  margin-top: 15%;
  padding-left: 30px;
  padding-right: 30px;
}
.required:after {
  content: " *";
  color: red;
}
.err {
  color: red;
  font-size: 13px;
  padding-bottom: 8px;
}
</style>
