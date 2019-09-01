import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  template: `
    <div class="container">
      <form role="form" #myForm="ngForm" accept-charset="UTF-8" novalidate>
        <div class="form-group has-feedback" [ngClass]="{ 'has-error': myckeditor.invalid && myckeditor.touched }">
            <ckeditor
                [(ngModel)]="mycontent"
                #myckeditor="ngModel"
                name="myckeditor"
                required
                [config]="ckeConfig"
                debounce="500"
                (change)="onChange($event)">
            </ckeditor>
            <div *ngIf="myckeditor.invalid && myckeditor.touched" class="help-block">
                Required field.
            </div>
        </div>
        <button [disabled]="myForm.invalid" class="btn btn-primary">
            Save
        </button>
      </form>
      <div [innerHTML]="mycontent"></div>
    </div>
  `,
  styles: [`
    .container {
      width: 60%;
      margin-top: 40px;
    }
  `]
})
export class EditorDemoComponent implements OnInit {
  // 文档地址： https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/angular.html
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  @ViewChild('myckeditor') ckeditor: any;

  constructor() {
    this.mycontent = `<p>My html content</p>`;
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };
  }

  onChange($event: any): void {
    console.log('onChange');
  }

}
