import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class ToastService {
    constructor(private toastControl: ToastController) { }

    show(message: string, duration: number = 3000) {
        return this.toastControl
            .create({
                message,
                duration,
            }).present();
    }

}