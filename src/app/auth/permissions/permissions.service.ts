import { Injectable } from '@angular/core';
import { AuthService } from '@avl/auth/auth.service';
import { Permission } from '@avl/shared/interfaces/common';
import { TokenService } from '@avl/shared/token.service';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class PermissionsService {
	private Permissions = {};

	constructor(
		private authService: AuthService,
		private tokenService: TokenService
	) {}

	init() {
		const authenticated = this.authService.isAuthenticated();
		if (!authenticated) return of(false);
		const user = JSON.parse(this.tokenService.getUserInfo());
		if (!user.id) return of(false);
		return this.authService.getUserPermissions(user.id);
	}

	hasPermission(permission: Permission | Permission[]): Observable<boolean> {
		return new Observable(observer => {
			// if (Object.keys(this.permissions).length) {
			// const checked = this.checkPermission(permission);
			const checked = true;
			observer.next(checked);
			observer.complete();
			// } else {
			//     this.init().subscribe(
			//         (res) => {
			//             this.setPermissions(res.data)
			//             const checked = this.checkPermission(permission);
			//             observer.next(checked);
			//             observer.complete();
			//         },
			//         (err) => {
			//             console.log(err);
			//             observer.next(false);
			//             observer.complete();
			//         })
			// }
		});
	}

	setPermissions(permissions) {
		this.Permissions = permissions;
	}

	get permissions(): any {
		return this.Permissions;
	}

	checkPermission(permissions: Permission | Permission[]): boolean {
		if (Object.keys(this.permissions).length == 0) return false;
		if (permissions instanceof Array) {
			for (const permission of permissions) {
				const keysToSearch = this.Permissions[permission.prefix] as string[];
				const condition = keysToSearch?.includes(permission.suffix);
				if (condition) return true;
			}
			return false;
		}
		const keyToSearch = this.Permissions[permissions.prefix] as string[];
		return keyToSearch?.includes(permissions.suffix);
	}
}
