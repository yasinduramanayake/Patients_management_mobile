<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
      <ion-menu :disabled="disable" content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header
              >{{ profile_data.first_name + " " + profile_data.last_name }}
            </ion-list-header>
            <ion-note>{{ profile_data.email }}</ion-note>

            <ion-menu-toggle
              v-for="(p, i) in appPages"
              :key="i"
              auto-hide="false"
            >
              <ion-item
                :class="{ selected: selectedIndex === i }"
                :router-link="p.url"
                class="hydrated"
                detail="false"
                lines="none"
                router-direction="root"
                @click="selectedIndex = i"
              >
                <ion-icon
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </IonSplitPane>
  </IonApp>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
  menuController,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import profileAPI from "@/APIs/userprofile";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  bookmarkSharp,
  checkmarkOutline,
  checkmarkSharp,
  heartOutline,
  heartSharp,
  logOutOutline,
  logOutSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  peopleOutline,
  peopleSharp,
  personCircleOutline,
  personOutline,
  personSharp,
  settingsOutline,
  settingsSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
    menuController,
  },
  data() {
    return {
      profile_data: "",
      disable: true,
    };
  },

  async mounted() {
    var is_name_available = setInterval(() => {
      if (localStorage.getItem("token")) {
        this.profile();
        clearInterval(is_name_available);
      }
    }, 100);

    //     events.subscribe('user:created', (profile_data  time) => {

    //    console.log('Welcome', profile_data , 'at', time);
    //  });
  },

  //  async ionViewDidLoad() {
  //   alert("dfghf");
  //   await this.profile();
  // },

  methods: {
    async profile() {
      let response = await profileAPI.show();
      this.profile_data = response.data.data;
      if (this.profile_data === "" || localStorage.token === null) {
        this.disable = true;
      }
      if (this.profile_data !== "" || localStorage.token !== null) {
        this.disable = false;
        menubar.visible;
      }
    },
  },
  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: "Orders",
        url: "/order-cart",
        iosIcon: mailOutline,
        mdIcon: mailSharp,
      },
      {
        title: "Patients",
        url: "/patients",
        iosIcon: peopleOutline,
        mdIcon: peopleSharp,
      },
      {
        title: "Approvel",
        url: "/approvel",
        iosIcon: checkmarkOutline,
        mdIcon: checkmarkSharp,
      },
      {
        title: "Clinic Settings",
        url: "/clinics",
        iosIcon: settingsOutline,
        mdIcon: settingsSharp,
      },
      {
        title: "My Profile",
        url: "/profile",
        iosIcon: personOutline,
        mdIcon: personSharp,
      },
      {
        title: "Log out",
        url: "/logout",
        iosIcon: logOutOutline,
        mdIcon: logOutSharp,
      },
    ];
    const labels = [
      "Family",
      "Friends",
      "Notes",
      "Work",
      "Travel",
      "Reminders",
    ];

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }

    const route = useRoute();

    return {
      selectedIndex,
      appPages,
      labels,
      archiveOutline,
      archiveSharp,
      bookmarkOutline,
      bookmarkSharp,
      heartOutline,
      heartSharp,
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      personOutline,
      personSharp,
      warningSharp,
      checkmarkOutline,
      checkmarkSharp,
      settingsOutline,
      settingsSharp,
      logOutOutline,
      personCircleOutline,

      isSelected: (url: string) => (url === route.path ? "selected" : ""),
    };
  },
});
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;

  min-height: 20px;
}

ion-menu.md ion-list#labels-list ion-list-header {
  font-size: 16px;

  margin-bottom: 18px;

  color: #757575;

  min-height: 26px;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #161616;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #020202;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  color: var(--ion-color-primary);
}
</style>
