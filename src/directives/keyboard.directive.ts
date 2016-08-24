import { Directive, ElementRef, Input } from '@angular/core';

import { KeyboardService } from '../services'

@Directive({
    selector: 'ng2-virtual-keyboard'
})
export class KeyboardDirective {
    private _defaultStyle = 'querty';

    constructor(private keyboardService: KeyboardService, private el: ElementRef) {  }
    
    @Input('keyboard-type') set keyboardType(keyboard: string) {
        let config = this.keyboardService.getKeyboardConfig(keyboard);
        this.keyboardService.startKeyboard(this.el, config);
    }

}
