import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit  {
  @Input() images: any[] = [];
  @Input() limit : number =  10;
  @Output() eventEmited = new EventEmitter<any[]>();
  previousFiles: boolean = false
  files: any[] = [];
  
  constructor(){
  }

  ngOnInit(){
    console.log(this.images)
    console.log( typeof this.images[0])
    if (typeof this.images != 'undefined' && typeof this.images[0] != 'undefined') {
      if (this.images[0] != '') {
        this.files = this.images;
        this.previousFiles = true;
      }
    }
  }

  validateType(item: any): boolean {
    let isFile = typeof item != 'string';
    return isFile;
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    if (this.limit < files.length) {
      Swal.fire('Action not permited..', 'You cannot add more than '+this.limit+' files!', 'warning')
    }else{
      for (const item of files) {
        
        item.progress = 0;
        this.files.push(item);
      }
      this.eventEmited.emit(this.files);
      this.uploadFilesSimulator(0);
    }
    
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: number, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
