import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
    selector: 'app-add-trip',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-trip.component.html',
    styleUrl: './add-trip.component.css',
    providers: [DatePipe] // 
})

export class AddTripComponent implements OnInit {
    public addForm!: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private tripService: TripDataService,
        private datePipe: DatePipe // 
    ) { }

    ngOnInit() {  
        this.addForm = this.formBuilder.group({  
            _id: [],  
            code: ["", Validators.required],  
            name: ["", Validators.required],  
            length: ["", Validators.required],  
            start: ["", Validators.required],  // Date field
            resort: ["", Validators.required],  
            perPerson: ["", Validators.required],  
            image: ["", Validators.required],  
            description: ["", Validators.required],  
        });  
    }  

    public onSubmit() {  
        this.submitted = true;  

        if (this.addForm.valid) {  
            let formData = this.addForm.value;  

            // ✅ Convert start date to ISO 8601 format using DatePipe
            formData.start = this.datePipe.transform(formData.start, "yyyy-MM-dd'T'HH:mm:ss'Z'");

            this.tripService.addTrip(formData)  
                .subscribe({  
                    next: (data: any) => {  
                        console.log(data);  
                        this.router.navigate(['']);  
                    },  
                    error: (error: any) => {  
                        console.log('Error: ' + error);  
                    }  
                });  
        }  
    }  

    // Get the form controls for validation
    get f() { return this.addForm.controls; }  
}  
