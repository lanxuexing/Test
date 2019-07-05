import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { CdkComponent } from './cdk.component';
import { CdkRoutingModule } from './cdk.routing';
import { CdkService } from './cdk.service';
import { AccessibilityComponent } from './accessibility/accessibility.component';

const COMMON = [
    CdkComponent,
    AccessibilityComponent,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [ CommonModule, FormsModule, CdkRoutingModule, CoreModule ],
    exports: [...COMMON ],
    providers: [ CdkService ],
})
export class CdkModule {}
