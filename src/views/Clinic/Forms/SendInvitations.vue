<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button default-href="/clinics"></ion-back-button>
        </ion-buttons>
        <ion-title>Invite a new Clinician</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="sendinvitation">Send</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <form>
          <ion-item>
            <ion-label position="stacked">Clinic Name</ion-label>
            <ion-input
              type="text"
              :value="firstLetterUpperCase(clinic_name)"
              readonly
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label class="required" position="stacked">E-mail</ion-label>
            <ion-input
              type="email"
              v-model="form.email"
              placeholder="Enter Email"
            ></ion-input>
            <div
              v-for="error in errors.email"
              :key="error"
              style="padding-left:1px"
              class="err"
            >
              {{ errors.email[0] }}
            </div>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" class="required">Role</ion-label>
            <ion-select
              value="brown"
              ok-text="Ok"
              v-model="form.role"
              cancel-text="Dismiss"
              placeholder="Select Role"
            >
              <ion-select-option
                v-for="role in roles"
                :key="role.code"
                :value="role.code"
                >{{ firstLetterUpperCase(role.name) }}</ion-select-option
              >
            </ion-select>
          </ion-item>
          <div
            v-for="error in errors.role"
            :key="error"
            style="padding-left:20px"
            class="err"
          >
            {{ errors.role[0] }}
          </div>
        </form>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
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
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import userrolesAPI from "@/APIs/userroles";
import invitationssAPI from "@/APIs/invitations";
import { toast } from "@/common/toast";
import clinicAPI from "@/APIs/clinic";

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
    alertController,
  },
  data() {
    return {
      options: {},
      errors: "",
      roles: {},
      form: {
        email: "",
        clinic_id: "",
        role: "",
      },
      clinic_name: "",
    };
  },
  async mounted() {
    await this.show();
    await this.userroles();
  },
  methods: {
    Myfunction() {
      const checkBox = document.getElementById("myCheck");
      const text = document.getElementById("text");
      if (checkBox.checked == true) {
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
    },
    async show() {
      let response = await clinicAPI.show(this.$route.params.clinic_id);
      this.clinic_name = response.data.data.name;
    },
    async userroles() {
      let response = await userrolesAPI.index(false);
      this.roles = response.data.data;
      console.log(this.roles);
    },
    async invite() {
      this.form.clinic_id = this.$route.params.clinic_id;
      invitationssAPI
        .store(this.form)
        .then(() => {
          toast("Invitation sent successfully", "success");
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
          toast(response.data.error, "danger");
        });
    },
    async sendinvitation() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure?",
        buttons: [
          {
            text: "No",
            role: "Don't send",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Send",
            handler: () => {
              this.invite();
            },
          },
        ],
      });
      alert.present();
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>
<style scoped>
.err {
  color: red;
  font-size: 13px;
}
.required:after {
  content: " *";
  color: red;
}
</style>
