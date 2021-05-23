import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherVM } from '../../interfaces/teacher-vm';

@Component({
  selector: 'app-add-edit-teacher',
  templateUrl: './add-edit-teacher.component.html',
  styleUrls: ['./add-edit-teacher.component.css']
})
export class AddEditTeacherComponent implements OnInit {

  error = '';
  AddOrEdit = 'Add';
  Id: any = 0;
  Name = '';
  Degree = '';
  teachers: any[] = [];
  constructor(private teachersService: TeachersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-string-literal
    this.Id = +this.route.snapshot.params['id'];
    if (this.Id !== 0) {
      this.AddOrEdit = 'Edit';
      this.teachersService.getTeacherById(this.Id).subscribe(e => {
        this.Name = e.name;
        this.Degree = e.degree;
      });
    }
  }
  addTeacher(): void {
    if (this.Name.trim() === '' || this.Degree.trim() === '') {
      this.error = 'Enter All Required Feilds';
    }
    else if (this.Name.trim().length < 5) {
      this.error = 'Name should contains 5 letters at least';
    }
    else if (this.Name.trim().length > 30) {
      this.error = 'Name should contains 30 letters Maximum';
    }
    else if (this.Degree.trim().length < 3) {
      this.error = 'Degree should contains 3 letters at least';
    }
    else if (this.Degree.trim().length > 20) {
      this.error = 'Degree should contains 20 letters Maximum';
    }
    else {
      const teacher: TeacherVM = {
        id: 0,
        name: this.Name,
        degree: this.Degree
      };
      // Add employee to Database
      this.teachersService.addTeacher(teacher).subscribe(item => {
        // Add employee to UI
        this.teachers.push(item);
        this.router.navigate(['teachers']);
      },
        err => {
          alert(err.error);
        });
    }
  }
  editTeacher(): void{
    if (this.Name.trim() === '' || this.Degree.trim() === '') {
      this.error = 'Enter All Required Feilds';
    }
    else if (this.Name.trim().length < 5) {
      this.error = 'Name should contains 5 letters at least';
    }
    else if (this.Name.trim().length > 30) {
      this.error = 'Name should contains 30 letters Maximum';
    }
    else if (this.Degree.trim().length < 3) {
      this.error = 'Degree should contains 3 letters at least';
    }
    else if (this.Degree.trim().length > 20) {
      this.error = 'Degree should contains 20 letters Maximum';
    }
    else {
      this.teachers.filter(e => e.id !== this.Id);
      const teacher: TeacherVM = {
        id: this.Id,
        name: this.Name,
        degree: this.Degree
      };

      // Reflect changes on Database
      this.teachersService.editTeacher(teacher).subscribe(item => {
        alert("Teacher has been Edited Successfully!");
        // Reflect changes on UI
        this.teachers.push(item);
        this.router.navigate(['teachers']);
      },
        err => {
          this.teachers.push(teacher);
          alert(err.error);
        });
    }
  }

}
