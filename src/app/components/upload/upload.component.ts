import { Component } from "@angular/core";
declare var cloudinary: any;

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html"
})
export class UploadComponent {
  constructor(
    ) { }
  cloudName = "dvjk7umra"; // replace with your own cloud name
  uploadPreset = "aoh4fpwm"; // replace with your own upload preset

  myWidget:any;


  ngOnInit() {
    this.myWidget = cloudinary.createUploadWidget(
      {
        cloudName: this.cloudName, //specify cloud_name
        uploadPreset: this.uploadPreset //specify uploadPreset
      },
      (error: any, result: { event: string; info: any; }) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
        }
      }
    );
  }

  uploadWidget() {
    this.myWidget.open();
  }
}

