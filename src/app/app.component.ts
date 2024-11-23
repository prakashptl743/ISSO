import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutoLogoutService } from './services/autologout.service';
import { Observable, observable } from 'rxjs';
export class MyDataType
{
  public id: number;
  public name: string;
} 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blogger';
  checked: boolean;
  public result: any;
  public shareResult$: Observable<" ">;
  mydata: MyDataType[] = [
    {"id":1, "name":"Aleja"},
    {"id":2, "name":"Giraldo"}
  ];

  constructor(public router: Router,private service: AutoLogoutService) {}
  ngOninit() {
    console.log('im ')
    this.multiplcation(10,2);
    this.getUsersForSubscription();
  }
  getUsersForSubscription():Observable<MyDataType[]>
  {
    let data = new Observable<MyDataType[]>(observer => {
          setTimeout(() => {
            observer.next(this.mydata);
          }, 2000);
    });
    return data;
  }
  public multiplcation(num1,num2) {
    this.result =num1 * num2;
    //this.shareResult$.next
  }
  public useObservable() {
    this.shareResult$.subscribe(res=>{
      console.log(res);
    })
  }
}
