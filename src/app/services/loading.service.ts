import { Injectable } from '@angular/core';
import{ NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  count = 0;

  constructor(private spinner: NgxSpinnerService) { }


  onLoading(){
    this.count++;
    this.spinner.show(undefined, {
      type: 'pacman',
      size: 'small',    
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
    });
  }

  offLoading(){
    this.count--;
    if(this.count <= 0){
      this.count = 0;
      this.spinner.hide();
    }
  }
}
