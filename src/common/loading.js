import {loadingController} from "@ionic/vue";

export function startLoading() {
    const loading = loadingController
        .create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 10000,
        }).then(function (loader) {
            window.loader = loader;
            window.loader.present();
        });
}

export function endLoading() {
    if (window.loader){
        window.loader.dismiss()
        window.loader = undefined
    }
}
