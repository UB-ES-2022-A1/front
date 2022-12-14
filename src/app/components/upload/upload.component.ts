import { Component } from "@angular/core";
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from "src/app/services/user/user.service";
import { UtilsService } from "src/app/services/utils/utils.service";

declare var cloudinary: any;

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html"
})
export class UploadComponent {
  constructor(
    private sessionService: SessionService,
    private utils: UtilsService,
    private userService: UserService

    ) { }
  cloudName = "dvjk7umra"; // replace with your own cloud name
  uploadPreset = "angular_cloudinary"; // replace with your own upload preset

  myWidget:any;
  userImage: string;


  ngOnInit() {
    this.myWidget = cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName, //specify cloud_name
        uploadPreset: this.uploadPreset //specify uploadPreset
      },
      (error: any, result: { event: string; info: any; }) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.userImage = result.info.secure_url;
          this.userService.postUserImage(this.sessionService.get('email'),this.userImage).subscribe((res) => {
            this.utils.openSnackBar('Profile image saved!', '', 0);
            this.sessionService.set('image', this.userImage);
            //window.location.reload();
          });
        }
      }
    );
  }

  uploadWidget() {
    this.myWidget.open();
  }
}

