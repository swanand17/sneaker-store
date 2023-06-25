import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart/cart.service';
import { Sneaker } from '../models/sneaker.model';

@Component({
  selector: 'app-sneaker-details',
  templateUrl: './sneaker-details.component.html',
  styleUrls: ['./sneaker-details.component.scss']
})
export class SneakerDetailsComponent implements OnInit {

  sneakerList:Array<Sneaker> = environment.sneakers;
  selectedSneaker:any = '';
  sneakerQuantity = new FormControl();

  constructor(private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sneakerQuantity.setValue(1);
    const sneakerId = this.route.snapshot.paramMap.get('id');
    
    if(sneakerId){
      this.selectedSneaker = this.sneakerList.find((sneaker) => sneaker.id.toString() === sneakerId);
    }
  }

  changeSneakerQuantity(action: string){
    switch (action) {
      case 'remove':
        if(this.sneakerQuantity.value !== 1){
          this.sneakerQuantity.setValue(this.sneakerQuantity.value - 1);
        }
        break;

      case 'add':
        if(this.sneakerQuantity.value !== 10){
          this.sneakerQuantity.setValue(this.sneakerQuantity.value + 1);
        }
        break;
    
      default:
        break;
    }
  }

  addToCart(){
    this.cartService.addToCart({
      id: this.selectedSneaker.id,
      image: this.selectedSneaker.image,
      name: this.selectedSneaker.name,
      price: this.selectedSneaker.price,
      quantity: this.sneakerQuantity.value,
    });
  }

}
