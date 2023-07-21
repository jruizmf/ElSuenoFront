import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, map } from 'rxjs';

const FILE_API = 'http://localhost:3000/api/file/';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, public router: Router) {
    
  }

  upload(file: File): any{
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${FILE_API}upload`,  formData, {responseType: 'text'} ).toPromise().then( (res: any) => {
                return res;
            });
  }

  delete(url: string): Observable<any> {
    return this.http.post<any>(`${FILE_API}delete`,  url )
            .pipe(map(async (res: any) => {
                return res;
            }));
  }

  uploadMultiple(files: File[]): any {
    try {
      console.log("Uploading Multiple")
      console.log(files)
      let _files: any[] = []
      if (files.length > 0) {
        files.forEach( (file: File) => {
          console.log(file)
          this.http.post<any>(`${FILE_API}upload`,  file )
              .pipe(map(async (res: any) => {
                console.log(res)
                _files.push(res);
              }));
        })
      }
      console.log("Result upload")
      console.log(_files)
      return {data: _files, status: true};
    } catch (error) {
      console.log("Error upload")
      console.log(error)
      return {error: error, status: false};
    }
    
  }
}
