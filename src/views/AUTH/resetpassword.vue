<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/login" text=""></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="header">
        <img class="logo" src="assets/Primed_icon_white@2x.png" />
      </div>

      <div class="text-block">
        <h2>Reset Password</h2>
      </div>

      <div class="form-wrap">
        <form v-on:submit.prevent="resetpassword()">
          <ion-item
            style="
              border-radius: 25px;
              height: 60px;
              font-size: 18px;
              margin-top: 31px;
            "
            lines="full"
          >
            <ion-label class="required" position="stacked">Email</ion-label>
            <ion-input
              type="email"
              placeholder="email"
              required
              v-model="form.email"
            ></ion-input>
          </ion-item>

          <ion-row>
            <ion-col>
              <ion-button
                class="login-btn"
                type="submit"
                color="primed"
                expand="block"
                >Reset
              </ion-button>
            </ion-col>
          </ion-row>
        </form>
      </div>
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
import reset from "@/APIs/resetpassword";

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
        email: "",
      },
    };
  },

  mounted() {},
  methods: {
    async resetpassword() {
      await reset.reset(this.form);
    },
  },
});
</script>
<style scoped>
ion-toolbar {
  --background: #f5f5f3;
}

ion-button {
  text-transform: initial;
  font-size: 17px;
}

ion-content {
  --background: #f5f5f3;
}
.link {
  text-transform: initial;
  font-size: 18px;
  padding-left: 10px;
  float: "center";
}
.email {
  border-radius: 25px;
}
#header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-weight: 700;
  font-size: 26px;
  color: #010100;
  margin-bottom: 15%;
}

img {
  width: 270px;
  height: 100px;
  display: flex;
}

#form {
  margin-top: 15%;
  padding-left: 30px;
  padding-right: 30px;
}
ion-button {
  margin-top: 35px;
  height: 48px;
  font-size: 18px;
  text-transform: initial;
  border-radius: 50px;
  box-shadow: 1px 8px 8px 0px rgba(0, 0, 0, 0.05);
  --box-shadow: none;
}
.required:after {
  content: " *";
  color: red;
}

.bg-login {
  background: rgba(42, 49, 71, 0.6) !important;
}

h2 {
  color: #1a2a2d;
  font-size: 2rem;
  font-weight: 300;
}

p {
  margin: 0;
  color: #ddd;
  font-size: 0.9rem;
}

.text-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-content,
ion-toolbar {
  --background: #2a314766;
}

.form-wrap {
  margin-top: 2.3em;
  padding: 0.8rem;
}

.link {
  font-size: 0.9rem;
}

ion-item {
  border-radius: 6px !important;
  --background: transparent;
}

.logo {
  max-width: 15%;
  height: auto;
  display: block;
}

ion-toolbar {
  height: 2em;
}

ion-input {
  --color: #fff !important;
}

ion-label {
  --color: #f4f6fb !important;
  text-transform: uppercase;
  font-weight: 200;
  letter-spacing: 0.1rem;
}

.login-btn {
  text-transform: uppercase;
  --border-radius: 3px !important;
  font-weight: 200;
  letter-spacing: 0.15rem;
}

.primed {
  color: #5260ff;
  text-decoration: underline;
}

ion-back-button {
  --color: #f4f6fb !important;
}
</style>
