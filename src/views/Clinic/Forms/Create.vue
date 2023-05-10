<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-buttons slot="start">
          <ion-back-button default-href="/clinics"></ion-back-button>
        </ion-buttons>
        <ion-title>Create Clinic</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="presentAlertConfirm">Create</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <form>
          <ion-item>
            <ion-label class="required" position="stacked">Name</ion-label>
            <ion-input
              type="text"
              v-model="name"
              placeholder="Enter Name"
            ></ion-input>
            <div
              v-for="error in errors.name"
              :key="error"
              style="padding-left:0px"
              class="err"
            >
              {{ error }}
            </div>
          </ion-item>

          <ion-item-divider> </ion-item-divider>

          <div
            v-for="(item, index) in addresses"
            :id="item.id"
            :key="item.id"
            ref="row"
          >
            <ion-item>
              <ion-label position="stacked">House Name</ion-label>
              <ion-input
                type="text"
                v-model="item.name"
                placeholder="Enter House Name"
              ></ion-input>
              <!--              <div
                v-for="error in getErrorMessage(errors,`addresses.${index}.address_line_1`)"
                :key="error"
                style="padding-left:0px"
                class="err"
              >

                {{error}}
              </div>-->
            </ion-item>

            <ion-item>
              <ion-label class="required" position="stacked"
                >Street 1</ion-label
              >
              <ion-input
                type="text"
                v-model="item.address_line_1"
                placeholder="Enter Street 1"
              ></ion-input>
              <div
                v-for="error in getErrorMessages(
                  errors,
                  `addresses.${index}.address_line_1`
                )"
                :key="error"
                style="padding-left:0px"
                class="err"
              >
                {{ error }}
              </div>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Street 2</ion-label>
              <ion-input
                type="text"
                v-model="item.address_line_2"
                placeholder="Enter Street 2"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label class="required" position="stacked">City</ion-label>
              <ion-input
                type="text"
                v-model="item.city"
                placeholder="Enter City"
              ></ion-input>

              <div
                v-for="error in getErrorMessages(
                  errors,
                  `addresses.${index}.city`
                )"
                :key="error"
                style="padding-left:0px"
                class="err"
              >
                {{ error }}
              </div>
            </ion-item>

            <ion-item>
              <ion-label class="required" position="stacked"
                >Post code</ion-label
              >
              <ion-input
                type="text"
                v-model="item.post_code"
                placeholder="Enter Post Code"
              ></ion-input>

              <div
                v-for="error in getErrorMessages(
                  errors,
                  `addresses.${index}.post_code`
                )"
                :key="error"
                style="padding-left:0px"
                class="err"
              >
                {{ error }}
              </div>
            </ion-item>

            <ion-item>
              <ion-label position="stacked" class="required">Country</ion-label>
              <ion-select
                value="brown"
                ok-text="Ok"
                v-model="item.country"
                placeholder="Select Country"
                cancel-text="Dismiss"
                :selected-text="item.country"
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
              v-for="error in getErrorMessages(
                errors,
                `addresses.${index}.country`
              )"
              :key="error"
              style="padding-left:20px;padding-top:10px"
              class="err"
            >
              {{ error }}
            </div>
            <ion-buttons>
              <ion-button size="default" @click="remove">
                <ion-icon
                  slot="start"
                  style="padding-left:320px"
                  :icon="trashBin"
                  color="primed"
                ></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-item-divider> </ion-item-divider>
          </div>

          <ion-button
            color="primed"
            fill="outline"
            expand="block"
            @click="repeat"
          >
            <ion-icon color="primed" :icon="add"></ion-icon>
            Add Address
          </ion-button>
        </form>
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
  IonItemDivider,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add, alarm, remove, trashBin } from "ionicons/icons";
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
    IonPage,
    IonContent,
    alertController,
    IonInput,
    IonItemDivider,
  },
  data() {
    return {
      countryList: countries,
      rows: "1",
      countries: [],
      errors: "",
      addresses: [
        {
          id: 1,
          name: "",
          country: "",
          address_line_1: "",
          city: "",
          post_code: "",
          address_line_2: "",
        },
      ],
      nextTodoId: 2,
    };
  },
  async mounted() {
    await this.indexpatient();
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
    repeat() {
      this.addresses.push({
        id: (this.nextTodoId += this.nextTodoId),
      });
    },
    remove(index) {
      this.addresses.splice(index, 1);
      this.trTrimHeight(this.$refs.row[0].offsetHeight);
    },
    async storeclinic() {
      let payload = {
        addresses: this.addresses,
        name: this.name,
      };
      await clinicAPI
        .store(payload)
        .then(() => {
          toast("Clinic created successfully", "success");
          this.$router.go(-1);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;

          console.log(this.errors);
        });
    },
    async presentAlertConfirm() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Yes",
            handler: () => {
              this.storeclinic();
            },
          },
        ],
      });
      return alert.present();
    },
    async indexpatient() {
      let response = await patientAPI.index(false);
      this.countries = response.data.data;
    },
  },
  setup() {
    return {
      trashBin,
      add,
    };
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
