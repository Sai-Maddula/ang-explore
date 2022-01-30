import { Component, OnInit, DoCheck } from '@angular/core';
import { Doctor } from '../../curewell-interfaces/doctor';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
})
export class ViewDoctorComponent implements OnInit {
  doctorList!: Doctor[] | null;
  showMsgDiv: boolean = false;
  doctorId!: number;
  errorMsg!: string;
  status!: boolean;
  subs!: Subscription

  constructor(
    private _curewellService: CurewellService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDoctor();
    //To do implement necessary logic
  }
  ngAfterViewInit() {

  }
  getDoctor() {
    //To do implement necessary logic
   this.subs = this._curewellService.getDoctors().subscribe(
      (doctors) => {
        this.doctorList = doctors;
        this._curewellService.doctorList = doctors;
        console.log('Doctors fetched successfully');
      },
      (err) => {
        this.doctorList = null;
        this.errorMsg = err;
      }
    );
    console.log(this.doctorList)
  }

  editDoctorDetails(doctor: Doctor) {
    //To do implement necessary logic
    console.log('editing details of', doctor);
    this.router.navigateByUrl(
      `/editDoctorDetails/${doctor.doctorId}/${doctor.doctorName}`
    );
  }

  removeDoctor(doctor: Doctor) {
    //To do implement necessary logic
    this._curewellService.deleteDoctor(doctor).subscribe(
      (res) => {
        this.status = !!res;
        if (this.status) {
          this.getDoctor();
          alert('Doctor details deleted successfully');
        } else {
          alert(`Doctor's name not deleted`);
        }
      },
      (err) => {
        console.log(err);
        this.errorMsg = 'Some error occured';
      }
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
