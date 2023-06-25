import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brandList:any = [
    {
      id: 1,
      name: 'Nike',
      logo: '../../assets/logos/Logo_NIKE.png',  
    },
    {
      id: 2,
      name: 'Adidas',
      logo: '../../assets/logos/Logo_ADIDAS.png',  
    },
    {
      id: 3,
      name: 'Puma',
      logo: '../../assets/logos/Logo_PUMA.png',  
    },
    {
      id: 4,
      name: 'Fila',
      logo: '../../assets/logos/Logo_FILA.png',  
    },
    {
      id: 5,
      name: 'Skechers',
      logo: '../../assets/logos/Logo_SKECHERS.png',  
    },
    {
      id: 6,
      name: 'Tommy Hilfiger',
      logo: '../../assets/logos/Logo_TOMMYHILFIGER.png',
    },
  ];

  isHover = false;
  selectedBrand: any;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  viewSneakers(brandName: any){
    this.selectedBrand = brandName;
  }
}
