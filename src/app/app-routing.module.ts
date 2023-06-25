import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SneakerDetailsComponent } from './sneaker-details/sneaker-details.component';
import { SneakersComponent } from './sneakers/sneakers.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { 
    path: 'home',
    component: HomeComponent,
  },
  { 
    path: 'cart',
    component: CartComponent,
  },
  { 
    path: 'brands',
    component: BrandsComponent,
  },
  { 
    path: 'sneakerDetails',
    component: SneakerDetailsComponent,
  },
  { 
    path: 'sneakers',
    component: SneakersComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
