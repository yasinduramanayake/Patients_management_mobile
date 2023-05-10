<template>
  <ion-header>
    <ion-toolbar :class="is_ios ? 'ion-padding-top' : ''">
      <ion-searchbar
        v-on:keyup="search"
        @ionClear="search($event)"
        @ionChange="search($event)"
      ></ion-searchbar>
    </ion-toolbar>
  </ion-header>
  <ion-list>
    <ion-item
      v-for="order in orders"
      :key="order.id"
      button
      @click="() => router.push(`/complete/${order.id}/view`)"
    >
      <ion-label>
        <ion-row>
          <ion-col>
            <h2>
              {{ removeLeadingZeorsFromReferences(order.reference_id) }}
              <ion-badge
                :color="getStatusWithColor(order.state).color"
                style="font-size:8px !important"
              >
                {{ makeUpperCase(order.state) }}
              </ion-badge>
            </h2>
            <ion-text color="medium">
              <p>
                Created :
                {{
                  momentFormat(order.created_at, "ddd DD MMMM YYYY hh:mm:ss")
                }}
              </p>
              <p v-if="order.state !== 'draft'">
                Submitted :
                {{
                  order.submitted_time
                    ? momentConvertToUTCAndReturn(
                        order.submitted_time,
                        "ddd DD MMMM YYYY hh:mm:ss"
                      )
                    : "N/A"
                }}
              </p>
              <p>
                {{ order.custom_reference_id || "N/A"
                }}<span class="small-text"> REFERENCE </span>
              </p>
              <p>Clinic - {{ firstLetterUpperCase(order.clinic.name) }}</p>
              <p>Payment - {{ firstLetterUpperCase(order.payment_state) }}</p>
            </ion-text>
          </ion-col>
          <ion-col class="ion-float-right" item-end style="text-align: right">
          </ion-col>
        </ion-row>
      </ion-label>
    </ion-item>
    <div v-if="pagination.total == 0">
      <div class="img">
        <img src="assets/undraw_Location_search_re_ttoj.svg" />
        <h6 class="para">No entries found.</h6>
      </div>
    </div>
  </ion-list>
  <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>

  <ion-infinite-scroll
    v-if="pagination.total !== 0"
    @ionInfinite="endScroll($event)"
    threshold="100px"
    id="infinite-scroll"
    :disabled="pagination.is_disabled"
  >
    <ion-infinite-scroll-content
      loading-spinner="bubbles"
      loading-text="Loading more data..."
    >
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script lang="ts">
import {
  IonButtons,
  IonBadge,
  IonCol,
  IonRow,
  IonText,
  IonIcon,
  isPlatform,
} from "@ionic/vue";
import { add, alarm } from "ionicons/icons";
import { useRouter } from "vue-router";
import approvelAPI from "@/APIs/approvel-orders";

export default {
  name: "Folder",
  components: {
    IonButtons,
    IonCol,
    IonRow,
    IonText,
    IonIcon,
    IonBadge,
  },
  data: function() {
    return {
      is_ios: isPlatform("ios"),
      filters: {},
      orders: [],
      timeout: null,
      pagination: {
        per_page: 50,
        page: 1,
        total: 0,
        is_disabled: false,
      },
    };
  },
  setup() {
    const router = useRouter();
    return { router, add, alarm };
  },
  async mounted() {
    await this.list();
  },
  methods: {
    async list(filters, loading = true, reset = false) {
      if (reset) {
        this.pagination.page = 1;
        this.orders = [];
      }
      let response = await approvelAPI.show(
        "approved",
        loading,
        this.pagination.page,
        this.pagination.per_page,
        filters
      );
      this.orders = this.orders.concat(response.data.data);
      this.pagination.total = response.data.meta.total;
    },
    async endScroll(event) {
      this.pagination.page++;
      await this.list(this.filters, false, false);
      event.target.complete();
      if (this.orders.length >= this.pagination.total) {
        // event.target.disabled = true;
      }
    },
    async doRefresh(event) {
      await this.list(this.filters, false, true);
      event.target.complete();
    },
    search: function(event) {
      // clear timeout variable
      clearTimeout(this.timeout);

      var self = this;
      this.timeout = setTimeout(function() {
        // enter this block of code after 1 second
        // handle stuff, call search API etc.
        self.filters.search = event.target.value;
        self.list(self.filters, true, true);
      }, 1000);
    },
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
.img {
  margin-top: 40%;
  padding-left: 80px;
  padding-right: 60px;
}
.para {
  padding-left: 50px;
}
</style>
