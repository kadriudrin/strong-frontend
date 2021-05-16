import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'strong ladies';
    public section = 0;
    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        this.section = Math.round(event.target.scrollTop / window.innerHeight);
    }
}
