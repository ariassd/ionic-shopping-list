import {Injectable} from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database';

import { Item } from '../../models/item.model';

@Injectable()
export class ShoppingListService{

    private shoppingListReference = this.db.list<Item>('shopping-list');
    

    constructor(private db: AngularFireDatabase){}

    getShoppingList() {
        return this.shoppingListReference;
    }

    getItem(key)
    {
        return this.db.object<Item>('shopping-list/' + key);
    }

    addItem(item: Item){
        return this.shoppingListReference.push(item);
    }

    editItem(item: Item){
        return this.shoppingListReference.update(item.key, item);
    }

    removeItem(item: Item) {
        return this.shoppingListReference.remove(item.key);
    }
    
}