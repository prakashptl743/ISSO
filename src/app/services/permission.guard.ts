import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
// import { DialogService } from "./dialog.service";
import { Permission, AdminPermission } from "./permission";
 
@Injectable({
  providedIn: "root"
})
export class PermissionGuard implements CanActivate {
  constructor(
    private userService: UserService,
    // private dialogService: DialogService
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('Im guard___.'+localStorage.getItem('roleId'));
    const userRole = localStorage.getItem('roleId');
        if(userRole == '2' ) {
             console.log('Im role true')
            const permission: Permission = route.data ? route.data.permission : null;
            console.log('Permission-->'+permission)
            if (!permission ) {
             console.log('Im exact true')    
            return false;
            }

            if (this.userService.isAuthorizedFor(permission)) {
                console.log('Im exact false')    
            return true;
            }

            alert('You are not authorized to view this page');
            return false;
        }
        if(userRole == '1' ) {
           console.log('Im admin role true')
           const adminpermission: AdminPermission = route.data ? route.data.adminpermission : null;
           console.log('Admin Permission-->'+adminpermission)
           if (!adminpermission) {
           return false;
           }

           if (this.userService.isAuthorizedForAdmin(adminpermission)) {
           return true;
           }

           alert('You are not authorized to view this page');
           return false;
       }
   }
}
