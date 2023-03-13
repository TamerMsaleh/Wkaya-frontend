import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeWhile, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
export enum WIZARD_STEPS {
  DOB = 1,
  COUNTRY = 2,
  HEIGHT = 3,
  JOBTYPE =4,
  HAVINGKIDS = 5
}
@Component({
  selector: 'wky-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  alive = true;
  profileForm: FormGroup;
  activeIndex = 0;
  jobs = [
    { name: 'Home', value: 'home' },
    { name: 'Office', value: 'office' },
  ];
  martialStatuses = [
    { name: 'Single', value: 'single' },
    { name: 'Married', value: 'married' },
    { name: 'Divorced', value: 'divorced' },
  ];
  wizardItems = [
    {
      label: '',
      command: (event: any) => {
        this.activeIndex = WIZARD_STEPS.DOB;
      },
    },
    {
      label: '',
      disabled: true,
      command: (event: any) => {
        this.activeIndex = WIZARD_STEPS.COUNTRY;

      },
    },
    {
      label: '',
      command: (event: any) => {
        this.activeIndex = WIZARD_STEPS.HEIGHT
      },
    },
    {
      label: '',
      disabled: true,
      command: (event: any) => {
        this.activeIndex = WIZARD_STEPS.JOBTYPE;

      },
    },
    {
      label: '',
      command: (event: any) => {
        this.activeIndex = WIZARD_STEPS.HAVINGKIDS
      },
    },
  ];
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      DOB:this.fb.group({
        birthDate: this.fb.control('', [Validators.required]),
        gender: this.fb.control('', [Validators.required]),
      }),
      COUNTRY: this.fb.group({
        country: this.fb.control('', [Validators.required]),
        city: this.fb.control('', [Validators.required]),
      }),
      HEIGHT: this.fb.group({
        height: this.fb.control('', [Validators.required]),
        weight: this.fb.control('', [Validators.required]),
      }),
      JOBTYPE: this.fb.group({
        jobType: this.fb.control('', [Validators.required]),
        maritalStatus: this.fb.control('', [Validators.required]),
      }),
      HAVINGKIDS: this.fb.group({
        havingKids: this.fb.control('', [Validators.required]),
        alcoholic: this.fb.control('', [Validators.required]),
        smocking: this.fb.control('', [Validators.required]),
      })






    });
  }

  ngOnInit(): void {
    this.authService
      .getProfile()
      .pipe(
        takeWhile(() => this.alive),
        tap({
          next: (res: any) => {
            console.log(res);
          },
          error: (err) => {
            if (err) {
              console.log(err);
            }
          },
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
  setProfile() {
    if (this.profileForm.valid) {
      this.authService
        .profile(this.profileForm.value)
        .pipe(
          takeWhile(() => this.alive),
          tap({
            next: (res: any) => {},
          })
        )
        .subscribe();
    } else {
      this.profileForm.errors;
      this.profileForm.markAllAsTouched();
    }
  }
  next() {
     this.activeIndex += 1;
    switch(this.activeIndex){
      case  WIZARD_STEPS.DOB :{
        if(this.profileForm.get('DOB').invalid){
          this.activeIndex = 0;
        }
        break;
      }
      case  WIZARD_STEPS.COUNTRY :{
        if(this.profileForm.get('COUNTRY').invalid){
          this.activeIndex = 1;
        }
        break;
      }
      case  WIZARD_STEPS.HEIGHT :{
        if(this.profileForm.get('HEIGHT').invalid){
          this.activeIndex = 2;
        }
        break;
      }
      case  WIZARD_STEPS.JOBTYPE :{
       if(this.profileForm.get('JOBTYPE').invalid){
          this.activeIndex = 3;
        }
        break;
      }
      case  WIZARD_STEPS.HAVINGKIDS :{
        if(this.profileForm.get('HAVINGKIDS').invalid){
          this.activeIndex = 4;
        }
        break;
      }
    }
  }
  previous() {
    if (this.activeIndex > 0) this.activeIndex -= 1;
  }
}
