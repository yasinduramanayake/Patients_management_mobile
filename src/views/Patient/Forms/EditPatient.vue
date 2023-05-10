<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/patients"></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Patient</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click.prevent="update"> Save</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <form>
          <ion-item lines="full">
            <ion-label position="stacked" style=" font-size: 15px;"
              >Select Clinic</ion-label
            >
            <ion-select
              :value="form.clinic_id"
              v-model="form.clinic_id"
              ok-text="Okay"
              cancel-text="Dismiss"
              placeholder="Clinic"
            >
              <ion-select-option
                v-for="clinic in clinics"
                :key="clinic.id"
                :value="clinic.id"
                >{{ clinic.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <div
            v-for="error in erros.clinic_id"
            :key="error"
            style="padding-left:20px"
            class="err"
          >
            {{ erros.clinic_id[0] }}
          </div>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label class="required" position="stacked"
              >First Name</ion-label
            >
            <ion-input
              type="text"
              v-model="form.first_name"
              placeholder="First Name"
            ></ion-input>
            <div v-for="error in erros.first_name" :key="error" class="err">
              {{ erros.first_name[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label class="required" position="stacked">Last Name</ion-label>
            <ion-input
              type="text"
              v-model="form.last_name"
              placeholder="Last Name"
            ></ion-input>
            <div v-for="error in erros.last_name" :key="error" class="err">
              {{ erros.last_name[0] }}
            </div>
          </ion-item>

          <ion-item>
            <ion-label>Date Of Birth</ion-label>
            <ion-datetime
              :value="form.date_of_birth"
              min="1990-02"
              :max="current_date"
              v-model="form.date_of_birth"
              :day-short-names="customDayShortNames"
              display-format="DDD. MMM DD, YYYY"
              month-short-names="Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec"
            ></ion-datetime>
          </ion-item>
          <div
            v-for="error in erros.date_of_birth"
            :key="error"
            style="padding-left:20px"
            class="err"
          >
            {{ erros.date_of_birth[0] }}
          </div>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label
              position="stacked"
              style=" font-size: 15px;"
              class="required"
              >Gender</ion-label
            >
            <ion-select
              value="brown"
              placeholder="Select Gender"
              ok-text="Ok"
              v-model="form.gender"
              cancel-text="Dismiss"
            >
              <ion-select-option value="male">Male</ion-select-option>
              <ion-select-option value="female">Female</ion-select-option>
            </ion-select>
          </ion-item>
          <div
            v-for="error in erros.gender"
            :key="error"
            style="padding-left:20px"
            class="err"
          >
            {{ erros.gender[0] }}
          </div>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label class="required" position="stacked">Email</ion-label>
            <ion-input
              type="email"
              v-model="form.email"
              placeholder="Email"
            ></ion-input>
            <div v-for="error in erros.email" :key="error" class="err">
              {{ erros.email[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label class="required" position="stacked"
              >Phone Number 1</ion-label
            >
            <ion-input
              type="number"
              placeholder="Phone Number 1"
              v-model="form.phone_1"
            ></ion-input>
            <div v-for="error in erros.phone_1" :key="error" class="err">
              {{ erros.phone_1[0] }}
            </div>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Phone Number 2</ion-label>
            <ion-input
              type="number"
              placeholder="Phone Number 2"
              v-model="form.phone_2"
            >
            </ion-input>
            <div v-for="error in erros.phone_2" :key="error" class="err">
              {{ erros.phone_2[0] }}
            </div>
          </ion-item>

          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-col>
              <ion-checkbox
                id="myCheck"
                v-model="check"
                @click="Myfunction($event)"
              ></ion-checkbox>
            </ion-col>
            <ion-col>
              <ion-label>Attention same as the patient name</ion-label>
            </ion-col>
          </ion-item>
          <ion-item id="text">
            <ion-label class="required" position="stacked">Attention</ion-label>
            <ion-input
              type="text"
              v-model="form.attention"
              placeholder="Attention"
            ></ion-input>
            <div v-for="error in erros.attention" :key="error" class="err">
              {{ erros.attention[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label class="required" position="stacked">Street 1</ion-label>
            <ion-input
              type="text"
              v-model="form.address_line_1"
              placeholder="Street 1"
            ></ion-input>
            <div v-for="error in erros.address_line_1" :key="error" class="err">
              {{ erros.address_line_1[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label position="stacked">Street 2</ion-label>
            <ion-input
              type="text"
              v-model="form.address_line_2"
              placeholder="Street 2"
            ></ion-input>
            <div v-for="error in erros.address_line_2" :key="error" class="err">
              {{ erros.address_line_2[0] }}
            </div>
          </ion-item>

          <ion-item>
            <ion-label class="required" position="stacked">City</ion-label>
            <ion-input
              type="text"
              v-model="form.city"
              placeholder="City"
            ></ion-input>
            <div v-for="error in erros.city" :key="error" class="err">
              {{ erros.city[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label class="required" position="stacked">Post Code</ion-label>
            <ion-input
              type="numbers"
              v-model="form.post_code"
              placeholder="Post Code"
            ></ion-input>
            <div v-for="error in erros.post_code" :key="error" class="err">
              {{ erros.post_code[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label position="stacked" class="required">Country</ion-label>
            <ion-select
              :selected-text="form.country"
              value="brown"
              placeholder="Select Country"
              ok-text="Ok"
              v-model="form.country"
              cancel-text="Dismiss"
            >
              <ion-select-option
                :value="country.name"
                v-for="country in countryList"
                :key="country.code"
              >
                {{ country.name }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <div
            v-for="error in erros.country"
            :key="error"
            style="padding-left:20px"
            class="err"
          >
            {{ erros.country[0] }}
          </div>
          <div style="padding-top:6px"></div>
          <ion-item>
            <ion-label position="stacked">Notes</ion-label>
            <ion-textarea
              v-model="form.note"
              placeholder="Type Note"
            ></ion-textarea>
            <div v-for="error in erros.note" :key="error" class="err">
              {{ erros.note[0] }}
            </div>
          </ion-item>
          <div style="padding-top:6px"></div>
        </form>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
let countries = require("@/views/countries.js");
import {
  IonCol,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonBackButton,
  IonInput,
  IonDatetime,
  IonTextarea,
  IonButton,
  IonItemDivider,
  IonCheckbox,
  IonHeader,
  alertController,
  IonButtons,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import updateAPI from "@/APIs/patient";
import patientAPI from "@/APIs/patient";
import clinicAPI from "@/APIs/clinic";
import { toast } from "@/common/toast";

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonBackButton,
    IonInput,
    IonDatetime,
    IonTextarea,
    IonButton,
    IonItemDivider,
    IonCheckbox,
    IonHeader,
    alertController,
    IonButtons,
    IonCol,
    IonContent,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  data() {
    return {
      countryList: countries,
      id: this.$route.params.id,
      clinics: {},
      countries: [],
      form: {
        address_line_1: "",
        address_line_2: "",
        attention: "",
        city: "",
        clinic_id: "",
        country: "",
        date_of_birth: "",
        email: "",
        first_name: "",
        gender: "",
        last_name: "",
        note: "",
        phone_1: "",
        phone_2: "",
        post_code: "",
      },
      erros: "",
      check: "",
      clinic_name: "",
      current_date: new Date().toISOString(),
    };
  },
  async mounted() {
    await this.showclinic();
    await this.show();
    await this.indexpatient();
  },
  methods: {
    Myfunction(e) {
      const checkBox = document.getElementById("myCheck");
      const text = document.getElementById("text");
      if (checkBox.checked == true) {
        text.style.display = "block";
      } else {
        text.style.display = "none";
      }
      this.check = e.currentTarget.checked;
    },
    async updatepatient() {
      if (this.check === false) {
        this.form.attention = this.form.first_name + this.form.last_name;
      }
      await updateAPI
        .update(this.id, this.form)
        .then(() => {
          toast("Patient updated successfully", "success");
          this.form = {};
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            this.erros = response.data.errors;
          }
        });
    },

    async update() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Save Changes?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Ok",
            handler: () => {
              this.updatepatient();
            },
          },
        ],
      });
      return alert.present();
    },
    async show() {
      let response = await patientAPI.show(this.id);
      if (this.form.phone_2 === "") {
        this.show = false;
      }
      this.form.clinic_id = response.data.data.clinic_id;
      this.form.first_name = response.data.data.first_name;
      this.form.last_name = response.data.data.last_name;
      this.form.email = response.data.data.email;
      this.form.gender = response.data.data.gender;
      this.form.date_of_birth = response.data.data.date_of_birth;
      this.form.note = response.data.data.note;
      this.form.phone_1 = response.data.data.phone_1;
      this.form.phone_2 = response.data.data.phone_2;
      this.form.address_line_1 = response.data.data.address.address_line_1;
      this.form.address_line_2 = response.data.data.address.address_line_2;
      this.form.country = response.data.data.address.country;
      this.form.city = response.data.data.address.city;
      this.form.post_code = response.data.data.address.post_code;
      this.form.attention = response.data.data.address.name;
    },
    async showclinic() {
      let response = await clinicAPI.index(false);
      this.clinics = response.data.data;
    },
    async indexpatient() {
      let response = await patientAPI.index(false);
      this.countries = response.data.data;
    },
    countries() {},
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
  padding-bottom: 8px;
}
.required:after {
  content: " *";
  color: red;
}
</style>
