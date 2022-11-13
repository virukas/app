import { Component, OnInit } from '@angular/core';
import { UserService } from '../_helpers/user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service:UserService) { }

  users:any=[]

  ngOnInit(): void {
    this.service.getexample().subscribe(test=>{
      this.users=test
    })
    console.log(this.users)
  }

}
