import { Injectable } from '@angular/core';

@Injectable()
export class KeyboardService {
    keyboard:any;

    constructor() { }

    private executeGetKeyboard(target: string) {
		var keyboard: any;
		var element:any = $(target);
		if (element) {
			keyboard = element.getkeyboard();
		}
		return keyboard;
	};

    attach(element:string, config?: any, inputCallback?: Function) {
        var newConfig: any;

        config = config || {};

        for (var attr in config) {
            if (config.hasOwnProperty(attr)) {
                newConfig[attr] = config[attr];
            }
        }

        newConfig.accepted = config.accepted || inputCallback;

        if (config.autoUpdateModel) {
            newConfig.change = config.change || inputCallback;
        }

        if (newConfig.events) {
            var addEventMethod = function(eventName: string) {
                return function(e:any) {
                    newConfig.events[eventName](e, $(this).data('keyboard'), this);
                };
            };

            for (var eventName in newConfig.events) {
                $(element).on(eventName, addEventMethod(eventName));
            }
        }
        let keyboardTarget: any = $(element)
        var keyboard:any = keyboardTarget.keyboard(newConfig);

        if (keyboard && newConfig.extensions) {
            for (var extension in newConfig.extensions) {
                var extConfig = newConfig.extensions[extension];
                if (extConfig) {
                    keyboard[extension](extConfig);
                } else {
                    keyboard[extension]();
                }
            }
        }
    }

    getKeyboard(element: string) {
        return this.executeGetKeyboard(element);
    }

    getKeyboardById(id: string) {
        return this.executeGetKeyboard('#'+id);
    }
}