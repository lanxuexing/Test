import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkComponent } from './cdk.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { OverlayComponent } from './overlay/overlay.component';

const routes: Routes = [
    { path: '', component: CdkComponent },
    { path: 'accessibility', component: AccessibilityComponent },
    { path: 'overlay', component: OverlayComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CdkRoutingModule {}
