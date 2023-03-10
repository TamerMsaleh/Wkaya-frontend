import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'wky-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      birthDate: this.fb.control('',[Validators.required]),
      gender: this.fb.control('',[Validators.required]),
      height: this.fb.control('',[Validators.required]),
      weight: this.fb.control('',[Validators.required]),
      country: this.fb.control(''),
      city:this.fb.control(''),
      jobType: this.fb.control('',[Validators.required]),
      maritalStatus: this.fb.control(''),
      havingKids: this.fb.control('',[Validators.required]),
      alcoholic: this.fb.control('',[Validators.required]),
      smocking: this.fb.control('',[Validators.required]),
      completed: this.fb.control('',[Validators.required])
    });
  }
  setProfile(){

  }
}
