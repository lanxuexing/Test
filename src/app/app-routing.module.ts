import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/rxjs', pathMatch: 'full' },
  { path: 'rxjs', loadChildren: './rxjs/rxjs.module#RxjsModule' },
  { path: 'components', loadChildren: './component/share.module#ShareModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
