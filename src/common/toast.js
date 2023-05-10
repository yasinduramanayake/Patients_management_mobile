import {toastController} from "@ionic/core";

export function toast(message, color=null) {
    toastController
        .create({
            message: message,
            duration: 2000,
            color: color
        }).then(function (toast) {
        toast.present()
    });
}
