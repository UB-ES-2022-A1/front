import { Component, OnInit } from '@angular/core';
import { ServiceTO } from 'src/app/entities/ServiceTO';
import { SearchBarService } from 'src/app/services/search-bar/search-bar.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { ServiceDetailTO } from '../service-detail/service-detail.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  services: ServiceTO[] = [];
  searchText: string = '';
  search: string = '';
  constructor(
    private serviceService: ServiceService,
    private searchBarService: SearchBarService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.searchBarService.currentSearch.subscribe((search) => {
      this.search = search;
      this.serviceService.getServicesFilt(this.search).subscribe((data) => {
        console.log(data);
      });
    });
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe((res) => {
      res.forEach((service: any) => {
        let auxService: ServiceTO = {
          id: service.id,
          title: service.title,
          description: service.description,
          price: service.price,
        };
        this.services.push(auxService);
      });
    });
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
  }
}
