import { Component, Input } from '@angular/core';

@Component({
    selector: 'next',
    templateUrl: './next.component.html',
    styleUrls: ['./next.component.scss'],
})
export class NextComponent {
    @Input() disabledButton = false;
    constructor() {}
}
