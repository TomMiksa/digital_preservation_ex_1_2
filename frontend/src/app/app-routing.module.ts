import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {DmpComponent} from "./dmp/dmp.component";
import {AuthGuard} from "./guard/auth.guard";
import {GeneratedDmpComponent} from "./generated-dmp/generated-dmp.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dmp', component: DmpComponent, canActivate: [AuthGuard]},
  { path: 'gen', component: GeneratedDmpComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule {}
