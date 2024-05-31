import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-studentcrud',
  templateUrl: './studentcrud.component.html',
  styleUrls: ['./studentcrud.component.css']
})
export class StudentcrudComponent 
{


  StudentArray : any[] = [];
  currentStudentID = "";

  name: string ="";
  age: Number = 0;
  gender: string ="";
  phone: Number =+91;
  
  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  getAllStudent() {

    this.http.get("http://localhost:8000/user/getAll")
    .subscribe((resultData: any)=>
    {
       
        console.log(resultData);
        this.StudentArray = resultData.data;
    });


  }

  setUpdate(data: any) 
  {
   this.name = data.name;
   this.age = data.age;
   this.gender=data.gender;
   this.phone = data.phone;

   this.currentStudentID = data._id;
  
  }

  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "age" : this.age,
      "gender":this.gender,
      "phone" : this.phone,

    };
    
    this.http.patch("http://localhost:8000/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:8000/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
   
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       

  }

register()
  {

    let bodyData = {
      "name" : this.name,
      "age" : this.age,
      "gender":this.gender,
      "phone" : this.phone, 
  };
    this.http.post("http://localhost:8000/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
        
        this.name = '';
        this.age = 0;
        this.gender='';
        this.phone  = +91;
        this.getAllStudent();
    });
  }
}