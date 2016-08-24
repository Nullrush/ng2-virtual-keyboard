import { Injectable, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { } from 'rxjs';

@Injectable()
export class KeyboardService {
    private config: any;

    constructor(private http: Http) { 
        this.http.get('/keyboards.json')
                     .map((response: Response) => response.json())
                     .subscribe((cfg) => this.config = cfg)
    }

    private executeGetKeyboard(target: string) {
		var keyboard: any;
		var element:any = $(target);
		if (element) {
			keyboard = element.getkeyboard();
		}
		return keyboard;
	};

    getKeyboard(element: string) {
        return this.executeGetKeyboard(element);
    }

    getKeyboardById(id: string) {
        return this.executeGetKeyboard('#'+id);
    }

    getKeyboardConfig(type: string): Object {
        if (!this.config.hasProperty(type)) return;

        return this.config[type];
    }

    startKeyboard(el: ElementRef, config: Object) {
        let element:any = $(el);
        element.keyboard(config)
    }
}