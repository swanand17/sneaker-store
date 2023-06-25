import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackbar: MatSnackBar) { }

  addToCart(item: CartItem){
    const items = [...this.cart.value.items];

    // Item already present check
    const itemFound = items.find((_item)=>_item.id === item.id);

    if(itemFound){
      itemFound.quantity += item.quantity;
    }else{
      items.push(item)
    }

    this._snackbar.open('Item added to the cart','Ok',{ duration: 1500 });
    // Emitting observable with new value
    this.cart.next({ items });
  }

  removeFromCart(item: CartItem, update = true){
    const filteredItems = this.cart.value.items.filter(_item => _item.id !== item.id)
    
    // Emitting observable with removed item
    if(update){
      this.cart.next({items: filteredItems});
      this._snackbar.open('Item removed from the cart','Ok',{ duration: 1500 });
    }
    return filteredItems;
  }

  // Decrease Quantity 
  removeQuantity(item: CartItem){
    let itemForRemoval;
    let filteredItems = this.cart.value.items.map((_item)=>{
      if(_item.id === item.id){
        _item.quantity--;
      }
      
      if(_item.quantity === 0){
        itemForRemoval = _item;
      }
      return _item;
    })

    if(itemForRemoval){
      filteredItems = this.removeFromCart(itemForRemoval,false);
    }

    this.cart.next({ items: filteredItems });
    this._snackbar.open('1 item removed from cart.', 'Ok', { duration: 3000 });
  }

  addOneQuantity(item: CartItem){
    const items = [...this.cart.value.items];

    // Item already present check
    const itemFound = items.find((_item)=>_item.id === item.id);

    if(itemFound){
      itemFound.quantity += 1;
    }else{
      items.push(item)
    }

    this._snackbar.open('Item added to the cart','Ok',{ duration: 1500 });
    // Emitting observable with new value
    this.cart.next({ items });
  }

  // Cart Total
  getTotal(items: Array<CartItem>){
    return items.map((item) => item.price * item.quantity)
                .reduce((prev, current) => prev + current, 0);
  }

  // Remove all items from cart
  clearCart(){
    this.cart.next({ items: [] });
    this._snackbar.open('All items removed, cart is now empty','Ok',{ duration: 1000 });
  }
}
