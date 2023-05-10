<template>
    <ion-page>
        <ion-content class="ion-padding">
            <ion-button @click="toggleInfiniteScroll" expand="block">
                Toggle Infinite Scroll
            </ion-button>

            <ion-list>
                <ion-item v-for="item in items" :key="item">
                    <ion-label>{{ item }}</ion-label>
                </ion-item>
            </ion-list>

            <ion-infinite-scroll
                    @ionInfinite="loadData($event)"
                    threshold="100px"
                    id="infinite-scroll"
                    :disabled="isDisabled"
            >
                <ion-infinite-scroll-content
                        loading-spinner="bubbles"
                        loading-text="Loading more data...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import {
        IonButton,
        IonContent,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        IonItem,
        IonLabel,
        IonList,
        IonPage
    } from '@ionic/vue';
    import {defineComponent} from 'vue';

    export default defineComponent({
        components: {
            IonButton,
            IonContent,
            IonInfiniteScroll,
            IonInfiniteScrollContent,
            IonItem,
            IonLabel,
            IonList,
            IonPage
        },
        mounted(): void {
            this.pushData()
        },
        data: function () {
            return {
                items: [],
                isDisabled: false
            }
        },
        methods: {
            loadData(event) {
                setTimeout(() => {
                    this.pushData();
                    console.log('Loaded data');
                    event.target.complete();

                    // App logic to determine if all data is loaded
                    // and disable the infinite scroll
                    if (this.items.length == 1000) {
                        event.target.disabled = true;
                    }
                }, 500);
            },
            pushData() {
                const max = this.items.length + 20;
                const min = max - 20;
                for (let i = min; i < max; i++) {
                    this.items.push(i);
                }
            },
            toggleInfiniteScroll() {
                this.isDisabled.value = !this.isDisabled.value;
            }
        },
        setup() {
            return {}
        }
    });

</script>
