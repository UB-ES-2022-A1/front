import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, NgZone } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  uploaderOptions: FileUploaderOptions = {
    url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
    autoUpload: false,
    isHTML5: true,
    removeAfterUpload: true,
    // XHR request headers
    headers: [
      {
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }
    ],
  };
  uploader: FileUploader = new FileUploader(this.uploaderOptions)
  @Input()
  responses: Array<any>;
  title: string;
  hasBaseDropZoneOver: boolean = false;
  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient
    ) { 
    this.responses = [];
    this.title = '';
  }

  ngOnInit(){
  }

  uploadToCloudinary(){
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      this.responses = [];
      this.title = '';
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      let tags = 'myphotoalbum';
      if (this.title) {
        form.append('context', `photo=${this.title}`);
        tags = `myphotoalbum,${this.title}`;
      }
      form.append('folder', 'angular_sample');
      form.append('tags', tags);
      form.append('file', fileItem);
      fileItem.withCredentials = false;
      return { fileItem, form };
    };
  
    const upsertResponse = (fileItem: any )=> {
      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          this.responses.push(fileItem);
        }
      });
    };
  
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>{
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );
     
    }
  
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
    }
  }
}
