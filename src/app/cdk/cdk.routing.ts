import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkComponent } from './cdk.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';

const routes: Routes = [
    { path: '', component: CdkComponent },
    { path: 'accessibility', component: AccessibilityComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CdkRoutingModule {}
