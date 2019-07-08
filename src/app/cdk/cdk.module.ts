import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { CdkComponent } from './cdk.component';
import { CdkRoutingModule } from './cdk.routing';
import { CdkService } from './cdk.service';
import { OverlayComponent, OverlayPanelComponent } from './overlay/overlay.component';
import { MatIconModule, MatButtonModule, MatSidenavModule, MatListModule } from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';


const COMMON = [
    CdkComponent,
    AccessibilityComponent,
    OverlayComponent,
    OverlayPanelComponent,
];

@NgModule({
    declarations: [ ...COMMON ],
    imports: [
        CommonModule,
        FormsModule,
        CdkRoutingModule,
        CoreModule,
        A11yModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
    ],
    exports: [ ...COMMON ],
    providers: [ CdkService ],
    entryComponents: [
        OverlayPanelComponent,
    ]
})
export class CdkModule {}
