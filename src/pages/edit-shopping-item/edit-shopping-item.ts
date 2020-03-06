import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Item } from '../../models/item.model';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../services/toast/toast.service';
import { NULL_INJECTOR } from '@angular/core/src/render3/component';

/**
 * Generated class for the EditShoppingItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {
  item: Item;
  shoppingList$: Observable<Item[]>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private shopping: ShoppingListService,
    private toast: ToastService) {
  }
  
  ionViewWillLoad() {
    this.item = this.navParams.get('item');
     
    this.shopping.getItem(this.item.key)
      .valueChanges() //on change 
      .subscribe(nitem => { //receive
          if (nitem != null) {
            //se mapean solo los campos que se debe de tener actualizados por que al traerse el item se pierde la llave y eso se obra en todo
            this.item.name = nitem.name;
            this.item.price = nitem.price;
            this.item.quantity = nitem.quantity 
          }
      })
      
  }

  saveItem(item: Item) {
    console.log(this.item);
    this.shopping.editItem(this.item).then(() => {
      this.toast.show(`${this.item.name} saved!`);
      this.navCtrl.setRoot('HomePage');
    });
  }

  deleteItem(item: Item) {
    console.log("remove Item");
    var name = item.name;
    this.shopping.removeItem(item).then(() => {
      this.toast.show(`${name} deleted!`);
      this.navCtrl.setRoot('HomePage');
    })
  }

}
