import { Component, OnInit } from '@angular/core';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { ServiceService } from 'src/app/services/service/service.service';
import { ServiceDetailTO } from '../service-detail/service-detail.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  services: ServiceTO[] = [];
  searchText: string = '';

  constructor(private serviceService: ServiceService) { }
   
  ngOnInit(): void {
    this.loadServices(); 
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe(res => {
      res.forEach((service: any) =>{
        let auxService: ServiceTO = 
        {
          id: service.id,
          title: service.title, 
          description: service.description,
          price: service.price 
        }
        this.services.push(auxService); 
      })
    })
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue;
    console.log(this.searchText)
  }
}


