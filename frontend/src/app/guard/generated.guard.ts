import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ReadableDmpService} from '../service/readable-dmp.service';

@Injectable()
export class GeneratedGuard implements CanActivate {

  constructor(private readableDmpService: ReadableDmpService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.readableDmpService.isDefined()){
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
