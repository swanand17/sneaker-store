import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rotating-carousel',
  templateUrl: './rotating-carousel.component.html',
  styleUrls: ['./rotating-carousel.component.scss'],
})
export class RotatingCarouselComponent implements OnInit {
  @Input() title = '';
  @Input() sneakers: any;
  @Input() containerId = '';
  @Input() rightToLeft = false;

  container!: HTMLElement;
  counter = 0;

  rightToLeftInterval: any;
  leftToRightInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.container = document.getElementById(this.containerId)!;
    this.animateCarousel();
  }

  animateCarousel() {
    if (this.rightToLeft) {
      this.counter = this.container.getBoundingClientRect().right;

      this.rightToLeftInterval = setInterval(() => {
        if (this.counter > -50) {
          this.container.scrollLeft = this.counter;
          this.counter -= 1;
        } else {
          clearInterval(this.rightToLeftInterval);
          this.animateCarousel();
        }
      }, 10);
    }

    if (!this.rightToLeft) {
      this.counter = 0;

      const temp = this.container.scrollWidth;
      this.leftToRightInterval = setInterval(() => {
        if (this.counter < this.container.getBoundingClientRect().right) {
          this.counter += 1;
          this.container.scrollLeft = this.counter;
        } else {
          clearInterval(this.leftToRightInterval);
          this.animateCarousel();
        }
      }, 10);
    }
  }

  sneakerSelected(sneakerId: number) {
    this.router.navigate(['/sneakerDetails', { id: sneakerId }]);
  }

  ngOnDestroy() {
    if (this.rightToLeft) {
      window.clearInterval(this.rightToLeftInterval);
    }

    if (!this.rightToLeft) {
      window.clearInterval(this.leftToRightInterval);
    }
  }
}
