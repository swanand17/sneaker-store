import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() themeChangedEvent = new EventEmitter();
  @Output() toggleSidenavEvent = new EventEmitter();

  toggleControl = new FormControl();
  logoFill = '';

  cartItems: any[] = [];
  cartServiceSubscription!: Subscription;

  constructor(private cartservice: CartService) {}

  ngOnInit(): void {
    this.toggleControl.setValue(true);
    this.toggleValue();
    this.cartServiceSubscription = this.cartservice.cart.subscribe((cart) => {
      this.cartItems = cart.items;
    });
  }

  //Dark mode
  toggleValue() {
    const darkModeSelected = this.toggleControl.value;
    this.logoFill = darkModeSelected ? '#ffffff' : '#1D2026';
    this.themeChangedEvent.emit(darkModeSelected);
  }

  deleteCartItem(cartItem: CartItem) {
    this.cartservice.removeFromCart(cartItem);
  }

  toggleSidenav() {
    this.toggleSidenavEvent.emit();
  }

  ngOnDestroy(): void {
    this.cartServiceSubscription.unsubscribe();
  }
}
