import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-from',
    templateUrl: './from.component.html',
    styleUrls: ['./from.component.scss']
})
export class FromComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    onSubmit() {
        if (!this.form.valid) {
            console.log('提交字段：', this.form.value);
            this.validateAllFormFields(this.form);
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
          } else if (control instanceof FormGroup) {
            this.validateAllFormFields(control);
          }
        });
      }

      isFieldInvalidTouched(field: any) {
        return this.form.get(field).invalid && this.form.get(field).touched;
      }

}
