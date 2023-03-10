import { Injectable } from '@angular/core';
import { ActiveToast, IndividualConfig, ToastrService } from 'ngx-toastr';
export enum ToasterPosition {
	topRight = 'toast-top-right',
	topLeft = 'toast-top-left',
	bottomRight = 'toast-bottom-right',
	bottomLeft = 'toast-bottom-left',
	topCenter = 'toast-top-center',
	bottomCenter = 'toast-bottom-center',
}
@Injectable({
	providedIn: 'root',
})
export class ToasterService {
	constructor(private toaster: ToastrService) {}
	defaultToastersConfig = {
		success: {
			toastClass: 'successToaster  generalToaster',
			messageClass: 'toaster-msg',
		},
		error: {
			toastClass: 'errorToaster generalToaster',
			messageClass: 'toaster-msg',
		},
		warning: {
			toastClass: 'warningToaster generalToaster',
			messageClass: 'toaster-msg',
		},
		info: {
			toastClass: 'infoToaster  generalToaster',
			messageClass: 'toaster-msg',
		},
	};
	makeToast(
		type,
		title: string,
		body: string,
		config: Partial<IndividualConfig> = { closeButton: false }
	) {
		if (this.defaultToastersConfig[type]) {
			config.toastClass = config.toastClass
				? this.defaultToastersConfig[type].toastClass + ' ' + config.toastClass
				: this.defaultToastersConfig[type].toastClass;
			config.messageClass = config.messageClass
				? this.defaultToastersConfig[type].messageClass +
				  ' ' +
				  config.messageClass
				: this.defaultToastersConfig[type].messageClass;
		}

		switch (type) {
			case 'success':
				{
					this.toaster.success(body, title, config);
				}
				break;
			case 'error':
				this.toaster.error(body, title, config);
				break;
			case 'warning':
				this.toaster.warning(body, title, config);
				break;
			case 'info':
				this.toaster.info(body, title, config);
				break;
			case 'custom': {
				const toast: ActiveToast<any> = this.toaster.show(body, title, config);
				break;
			}

			default:
				break;
		}
	}
}
