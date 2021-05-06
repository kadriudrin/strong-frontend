import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
    public opt: AnimationOptions = {
        path: '/assets/logo_intro.json',
    };

    public error(ev: any): void {
        console.error(ev);
    }
}
