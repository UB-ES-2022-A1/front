import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceService } from 'src/app/services/service/service.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
declare var cloudinary: any;

@Component({
  selector: 'app-service-image',
  templateUrl: './service-image.component.html',
})
export class ServiceImageComponent implements OnInit {
  @Input() id: string;
  @Output() showWidget: boolean = true;
  cloudName = "dvjk7umra"; // replace with your own cloud name
  uploadPreset = "angular_cloudinary"; // replace with your own upload preset

  myWidget:any;
  images:string[] = [];
  count:number = 0;

  image1: string = '';
  image2: string = '';
  image3: string = '';
  image4: string = '';
  image5: string = '';

  constructor(
    private sessionService: SessionService,
    private utils: UtilsService,
    private userService: UserService,
    private serviceService: ServiceService
    ) { }

  ngOnInit() {
    console.log("service id: ",this.id);
    
  }

  uploadWidget() {  
    if(this.images.length < 5){
          this.myWidget = cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName, //specify cloud_name
        uploadPreset: this.uploadPreset, //specify uploadPreset
        multiple: false
      },
      (error: any, result: { event: string; info: any; }) => {
        if (!error && result && result.event === "success") {
        
          console.log("Done! Here is the image info: ", result.info);
          let imageUrl = result.info.secure_url;
          this.images.push(imageUrl);
          if(this.images[0]){
            this.image1 = this.images[0];
          }
          if(this.images[1]){
            this.image2 = this.images[1];
          }
          if(this.images[2]){
            this.image3 = this.images[2];
          }
          if(this.images[3]){
            this.image4 = this.images[3];
          }
          if(this.images[4]){
            this.image5 = this.images[4];
          }  
          this.count ++;
          console.log("count: ",this.count);
          console.log("images array: ",this.images);
          console.log(this.image1,this.image2,this.image3,this.image4,this.image5);
          this.serviceService.postServiceImage(this.id,this.image1,this.image2,this.image3,this.image4,this.image5).subscribe((res) => {
            this.utils.openSnackBar('Image '+this.images.length+'/5 saved!', '', 0);
          });
        }
      }
    );
    this.myWidget.open();
    }
    else{
      this.showWidget = false;
      console.log("Maximum 5");
      this.utils.openSnackBar('Maximum 5 images per service!', '', 1);
      this.myWidget.close();
    }
  }
}


