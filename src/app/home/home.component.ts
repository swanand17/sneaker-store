import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  carouselSlideList = [
    {
      image: 'collage3.jpg',
      text: 'SHOP BY BRANDS',
    },
    {
      image: 'men-1.jpg',
      text: 'SHOP FOR MEN',
    },
    {
      image: 'female-1.webp',
      text: 'SHOP FOR WOMEN',
    },
  ];

  allSneakers = environment.sneakers;

  rotatingCarousels: any;

  currentCarouselSlideIndex: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rotatingCarousels = [
      {
        title: 'Premium Collection',
        containerId: 'premiumCollection',
        sneakers: this.allSneakers.filter((sneaker) => sneaker.price >= 10000),
        rightToLeft: false,
      },
      {
        title: 'Best Sellers',
        containerId: 'bestSellers',
        sneakers: this.allSneakers.filter((sneaker) => sneaker.price <= 5000),
        rightToLeft: true,
      },
    ];
  }

  nextCarouselSlide() {
    if (this.currentCarouselSlideIndex < this.carouselSlideList.length - 1) {
      this.currentCarouselSlideIndex++;
    } else {
      this.currentCarouselSlideIndex = 0;
    }
  }

  previousCarouselSlide() {
    if (this.currentCarouselSlideIndex > 0) {
      this.currentCarouselSlideIndex--;
    } else {
      this.currentCarouselSlideIndex = this.carouselSlideList.length - 1;
    }
  }

  navigate(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/brands']);
        break;

      case 1:
        this.router.navigate(['/sneakers', { gender: 'Male' }]);
        break;

      case 2:
        this.router.navigate(['/sneakers', { gender: 'Female' }]);
        break;

      default:
        break;
    }
  }
}
