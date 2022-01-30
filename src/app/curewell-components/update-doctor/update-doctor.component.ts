import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable } from '@angular/core';
import { CurewellService } from '../../curewell-services/curewell.service';
import { Doctor } from '../../curewell-interfaces/doctor';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html'
})
export class UpdateDoctorComponent implements OnInit {

  doctorId!: number;
  doctorName!: string;
  status!: boolean;
  errorMsg!: string;
  @ViewChild('updateDoctorForm') updateDoctorForm:any

  constructor(private route: ActivatedRoute, private _cureWellService: CurewellService, private router: Router) { }

  ngOnInit() {
     //To do implement necessary logic
     this.route.paramMap.subscribe(params=>{
       this.doctorId = Number(params.get('doctorId'))
       this.doctorName = params.get('doctorName') as string
     })
  }
  editDoctorDetails(doctorname: string) {
    this._cureWellService.editDoctorDetails(this.doctorId,doctorname).subscribe(res=> {
      this.status = res
      this.status?alert(`Doctor's name updated successfully`):alert(`Doctors name not updated`)
      console.log('Updated Doctor details successfully')
      this.router.navigateByUrl('/viewDoctors')
    },err=>{
      this.errorMsg=err
      alert('Some error Occured')
      this.router.navigateByUrl('/viewDoctors')
    })
  }
}
