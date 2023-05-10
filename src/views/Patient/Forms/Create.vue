<template>
  <ion-page style="">
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button text="" default-href="/patients"></ion-back-button>
        </ion-buttons>
        <ion-title>Create Patient</ion-title>
        <ion-buttons slot="end">
          <ion-button v-on:click.prevent="store"><b>Create</b></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <div>
          <form>
            <ion-item>
              <ion-label
                position="stacked"
                class="required"
                style=" font-size: 15px;"
                >Clinic</ion-label
              >
              <ion-select
                ok-text="Ok"
                placeholder="Select Clinic"
                v-model="form.clinic_id"
                cancel-text="Dismiss"
                :value="form.clinic_id"
              >
                <ion-select-option
                  v-for="option in options"
                  :key="option.id"
                  :value="option.id"
                  >{{ firstLetterUpperCase(option.name) }}</ion-select-option
                >
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
                placeholder="Enter First Name"
              ></ion-input>
              <div v-for="error in erros.first_name" :key="error" class="err">
                {{ erros.first_name[0] }}
              </div>
            </ion-item>
            <div style="padding-top:6px"></div>
            <ion-item>
              <ion-label class="required" position="stacked"
                >Last Name</ion-label
              >
              <ion-input
                type="text"
                v-model="form.last_name"
                placeholder="Enter Last Name"
              ></ion-input>
              <div v-for="error in erros.last_name" :key="error" class="err">
                {{ erros.last_name[0] }}
              </div>
            </ion-item>

            <ion-item>
              <ion-label>Date Of Birth</ion-label>
              <ion-datetime
                value="1995-04-15"
                min="1990-02"
                :max="current_date"
                placeholder="Date Of Birth"
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
                placeholder="Enter Email"
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
                placeholder="Enter Phone Number 1"
                v-model="form.phone_1"
              ></ion-input>
              <div v-for="error in erros.phone_1" :key="error" class="err">
                {{ erros.phone_1[0] }}
              </div>
            </ion-item>
            <div v-if="show" style="padding-top:6px"></div>
            <ion-item>
              <ion-label position="stacked">Phone Number 2</ion-label>
              <ion-input
                type="number"
                placeholder="Enter Phone Number 2"
                v-model="form.phone_2"
              ></ion-input>
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
              <ion-label class="required" position="stacked"
                >Attention</ion-label
              >
              <ion-input
                type="text"
                v-model="form.attention"
                placeholder="Enter Attention"
              ></ion-input>
              <div v-for="error in erros.attention" :key="error" class="err">
                {{ erros.attention[0] }}
              </div>
            </ion-item>
            <div style="padding-top:6px"></div>
            <ion-item>
              <ion-label class="required" position="stacked"
                >Street 1</ion-label
              >
              <ion-input
                type="text"
                v-model="form.address_line_1"
                placeholder="Enter Street 1"
              ></ion-input>
              <div
                v-for="error in erros.address_line_1"
                :key="error"
                class="err"
              >
                {{ erros.address_line_1[0] }}
              </div>
            </ion-item>
            <div style="padding-top:6px"></div>
            <ion-item>
              <ion-label position="stacked">Street 2</ion-label>
              <ion-input
                type="text"
                v-model="form.address_line_2"
                placeholder="Enter Street 2"
              ></ion-input>
              <div
                v-for="error in erros.address_line_2"
                :key="error"
                class="err"
              >
                {{ erros.address_line_2[0] }}
              </div>
            </ion-item>

            <ion-item>
              <ion-label class="required" position="stacked">City</ion-label>
              <ion-input
                type="text"
                v-model="form.city"
                placeholder="Enter City"
              ></ion-input>
              <div v-for="error in erros.city" :key="error" class="err">
                {{ erros.city[0] }}
              </div>
            </ion-item>
            <div style="padding-top:6px"></div>
            <ion-item>
              <ion-label class="required" position="stacked"
                >Post Code</ion-label
              >
              <ion-input
                type="number"
                v-model="form.post_code"
                placeholder="Enter Post Code"
              ></ion-input>
              <div v-for="error in erros.post_code" :key="error" class="err">
                {{ erros.post_code[0] }}
              </div>
            </ion-item>
            <div style="padding-top:6px"></div>
            <ion-item>
              <ion-label position="stacked" class="required">Country</ion-label>
              <ion-select
                value="brown"
                ok-text="Ok"
                placeholder="Select Country"
                v-model="form.country"
                cancel-text="Dismiss"
                :selected-text="form.country"
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
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
let countries = require("@/views/countries.js");
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
  alertController,
  IonInput,
  IonDatetime,
  IonTextarea,
} from "@ionic/vue";
import { defineComponent } from "vue";
import patientAPI from "@/APIs/patient";
import clinicAPI from "@/APIs/clinic";
import { toast } from "@/common/toast";

export default defineComponent({
  name: "Create",
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
    alertController,
    IonInput,
    IonDatetime,
    IonTextarea,
  },
  data() {
    return {
      countryList: countries,
      options: {},
      countries: {},
      erros: "",
      form: {},
      show: false,
      showwing: "",
      check: false,
      current_date: new Date().toISOString(),
    };
  },
  async mounted() {
    await this.showclinic();
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
      // console.log(e.currentTarget); //undefined //it is working !!!
    },
    async storePatient() {
      if (this.check === false) {
        this.form.attention = this.form.first_name + this.form.last_name;
      }
      await patientAPI
        .store(this.form)
        .then(() => {
          toast("Patient created successfully", "success");
          this.form = {};
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          if (response.status === 422) {
            this.erros = response.data.errors;
          }
        });
    },
    async store() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {},
          },
          {
            text: "Yes",
            handler: () => {
              this.storePatient();
            },
          },
        ],
      });
      alert.present();
    },
    async showclinic() {
      let response = await clinicAPI.index(false);
      this.options = response.data.data;
    },
    async indexpatient() {
      let response = await patientAPI.index(false);
      this.countries = response.data.data;
    },
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
.container {
  overflow: hidden;
  position: relative;
}
@keyframes cssAnimation {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes cssAnimation {
  0% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
