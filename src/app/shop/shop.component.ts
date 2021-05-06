import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
    constructor() {
        document.documentElement.style.setProperty(
            '--vh',
            `${window.innerHeight * 0.01}px`
        );
    }

    ngOnInit(): void {}
}
