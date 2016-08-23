import { Directive, ElementRef, Input } from '@angular/core';

import { KeyboardService } from '../services'

@Directive({
    selector: 'ng2-virtual-keyboard'
})
export class KeyboardDirective {
    private _defaultStyle = 'querty';

    constructor(private keyboardService: KeyboardService, private el: ElementRef) {
        keyboardService.attach(el.nativeElement)
    }
    
    @Input('keyboard-type') keyboardType: string;

}
