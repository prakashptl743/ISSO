import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { Category } from '../category';
import { School } from '../school';
 
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category;
  school:School;
  error: {};
  dataFromService:any;
  constructor(private blogpostService: BlogpostService) { }

  ngOnInit() {
    this.blogpostService.getCategories().subscribe(
      (data: Category) => this.categories = data
    );
    this.blogpostService.getSchoolList().subscribe(
      (data: School) => this.school = data
    );
    // this.blogpostService.getSchoolList().subscribe(response => {
    //   this.dataFromService =response;
    //   console.log('asdasd dddo=====>'+JSON.stringify(this.dataFromService));
    // }); 




    // this.blogpostService.getSchoolList().subscribe(
    //   (data: school) => this.school = data
    // );
  }

}
