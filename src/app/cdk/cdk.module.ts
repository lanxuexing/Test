import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { CdkComponent } from './cdk.component';
import { CdkRoutingModule } from './cdk.routing';
import { CdkService } from './cdk.service';


const COMMON = [
    CdkComponent,
    AccessibilityComponent,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [
        CommonModule,
        FormsModule,
        CdkRoutingModule,
        CoreModule,
        A11yModule
    ],
    exports: [ ...COMMON ],
    providers: [ CdkService ],
})
export class CdkModule {}
