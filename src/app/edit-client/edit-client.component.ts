import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.updateClientData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetClient(id)
      .valueChanges()
      .subscribe((data) => {
        console.log(data); 
        this.editForm.setValue(data);
      });
  }
  get name() {
    return this.editForm.get('name');
  }
  get address() {
    return this.editForm.get('address');
  }
  get roomNumber() {
    return this.editForm.get('roomNumber');
  }
  get startDate() {
    return this.editForm.get('startDate');
  }
  get endDate() {
    return this.editForm.get('endDate');
  }
  get roomType() {
    return this.editForm.get('roomType');
  }
  get Nneight() {
    return this.editForm.get('Nneight');
  }
  get smooking() {
    return this.editForm.get('smooking');
  }
  get tecketPlaneReference(){
    return this.editForm.get("tecketPlaneReference");
  }
  get price(){
    return this.editForm.get("price");
  }
  updateClientData() {
    this.editForm = this.fb.group({
      id : [''] ,
      name : [''] , 
      address : [''] , 
      roomNumber : [''] , 
      startDate : [''] ,
      endDate : [''] ,
      Nneight : [''] ,
      roomType : [''] ,
      smooking :[''] ,
      tecketPlaneReference : [""],
      price : [""]
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    this.crudApi.UpdateClient(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['name'].value + ' updated successfully'
    );
    this.router.navigate(['view-Clients']);
  }
}