import { Component, Input, SimpleChanges } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Order } from './models/order.model';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
    @Input() section = 0;
    private animationItem: AnimationItem | null = null;
    public colorNumber = 0;
    public color = '';
    public title = 'Night';
    public tref: any[] = [];
    public startExposure: any;
    public firstTimeBuy = true;
    public firstTimeBuyScroll = true;
    public selectedSize = '';
    public basket: Order[] = [];
    public payIndex = 0;
    public shippingMethod = -1;

    public opt: AnimationOptions = {
        loop: false,
        path: '/assets/logo_intro_texting.json',
    };

    public error(ev: any): void {
        console.error(ev);
    }

    constructor() {
        document.documentElement.style.setProperty(
            '--vh',
            `${window.innerHeight * 0.01}px`
        );
        document.documentElement.style.setProperty('--themeColor', '#19180A');
        const newBasket = localStorage.getItem('basket');
        if (newBasket !== null) this.basket = JSON.parse(newBasket);
    }

    selectSize(newSize: string): void {
        this.selectedSize = newSize;
    }

    scroll(
        imgDiv: HTMLElement,
        where: number,
        elSize: number,
        time: number,
        type: 'smooth' | 'auto' | undefined = 'smooth'
    ): void {
        if (imgDiv.scrollLeft === where) return;
        if (this.tref.length) {
            this.tref.forEach((val: any) => {
                clearTimeout(val);
            });
        }
        imgDiv.style.scrollBehavior = 'auto';
        imgDiv.style.setProperty('scroll-snap-type', 'none');
        imgDiv.style.overflowX = 'hidden';

        const from = elSize * Math.round(imgDiv.scrollLeft / elSize);
        let i = 1;
        let goal: number;
        do {
            goal = Math.min(
                Math.max(from + i * elSize * (from < where ? 1 : -1), 0),
                imgDiv.scrollWidth
            );
            i++;
            this.tref.push(
                setTimeout(
                    (gl: number) => {
                        imgDiv.scrollTo({ behavior: type, left: gl });
                    },
                    time * i,
                    goal
                )
            );
        } while (goal != where);

        setTimeout(() => {
            imgDiv.style.scrollBehavior = 'smooth';
            imgDiv.style.setProperty('scroll-snap-type', 'x mandatory');
            imgDiv.style.overflowX = 'scroll';
        }, (time !== 0 ? time : 200) * (i + 1));
    }

    ngOnChanges(changes: SimpleChanges): void {
        const now = changes.section.currentValue,
            before = changes.section.previousValue;
        if (now != before) {
            if (now !== 2) {
                if (this.firstTimeBuyScroll) {
                    document.documentElement.style.setProperty('--transO', '0');
                    document.documentElement.style.setProperty(
                        '--transLeft',
                        'translateX(-800px)'
                    );
                    setTimeout(() => {
                        const imgDiv = document
                            .getElementsByClassName('imgDiv')
                            .item(0);
                        if (imgDiv) {
                            (imgDiv as HTMLElement).style.scrollBehavior =
                                'auto';
                            (imgDiv as HTMLElement).style.setProperty(
                                'scroll-snap-type',
                                'none'
                            );
                            (imgDiv as HTMLElement).style.overflowX = 'hidden';
                            imgDiv.scroll({
                                behavior: 'auto',
                                left: imgDiv.scrollWidth,
                            });
                        }
                    }, 500);
                    this.firstTimeBuyScroll = false;
                } else if (before === 2) {
                    /* console.log('GO BACK'); */
                    /* const imgDiv = document */
                    /*     .getElementsByClassName('imgDiv') */
                    /*     .item(0); */
                    /* if (imgDiv) { */
                    /*     this.tref.forEach((val: any) => { */
                    /*         clearTimeout(val); */
                    /*     }); */
                    /*     (imgDiv as HTMLElement).style.scrollBehavior = 'auto'; */
                    /*     (imgDiv as HTMLElement).style.setProperty( */
                    /*         'scroll-snap-type', */
                    /*         'none' */
                    /*     ); */
                    /*     (imgDiv as HTMLElement).style.overflowX = 'hidden'; */
                    /*     imgDiv.scrollTo({ */
                    /*         behavior: 'auto', */
                    /*         left: imgDiv.scrollWidth, */
                    /*     }); */
                    /*     setTimeout(() => { */
                    /*         (imgDiv as HTMLElement).style.scrollBehavior = */
                    /*             'smooth'; */
                    /*         (imgDiv as HTMLElement).style.setProperty( */
                    /*             'scroll-snap-type', */
                    /*             'x mandatory' */
                    /*         ); */
                    /*         (imgDiv as HTMLElement).style.overflowX = 'scroll'; */
                    /*     }, 500); */
                    /* } */
                    document.documentElement.style.setProperty('--transO', '0');
                    /* document.documentElement.style.setProperty( */
                    /*     '--transLeft', */
                    /*     'translateX(-500px)' */
                    /* ); */
                }
            }
            if (now === 0) {
                this.animationItem?.goToAndPlay(0);
            } else if (now !== 0 && before === 0) {
                this.animationItem?.goToAndStop(0);
            } else if (now === 2) {
                const imgDiv = document
                    .getElementsByClassName('imgDiv')
                    .item(0);
                if (imgDiv)
                    if (this.firstTimeBuy) {
                        this.scroll(
                            imgDiv as HTMLElement,
                            0,
                            window.innerWidth,
                            600
                        );
                    } else {
                        (imgDiv as HTMLElement).style.scrollBehavior = 'auto';
                        (imgDiv as HTMLElement).style.setProperty(
                            'scroll-snap-type',
                            'none'
                        );
                        (imgDiv as HTMLElement).style.overflowX = 'hidden';
                        imgDiv.scroll({
                            behavior: 'auto',
                            left: 0,
                        });
                        setTimeout(() => {
                            (imgDiv as HTMLElement).style.scrollBehavior =
                                'smooth';
                            (imgDiv as HTMLElement).style.setProperty(
                                'scroll-snap-type',
                                'x mandatory'
                            );
                            (imgDiv as HTMLElement).style.overflowX = 'scroll';
                        }, 500);
                    }
                document.documentElement.style.setProperty('--transO', '1');
                document.documentElement.style.setProperty(
                    '--transLeft',
                    'translateX(0px)'
                );
                this.firstTimeBuy = false;
            }
        }
    }
    getRespectiveColorAndTitle(
        color: number
    ): { title: string; color: string } {
        switch (color) {
        case 1:
            return { color: '#9E9D9F', title: 'Orchid' };
        case 2:
            return { color: '#3A7FBB', title: 'Sky' };
        case 3:
            return { color: '#E86A92', title: 'Cherry' };
        case 4:
            return { color: '#BC243B', title: 'Rose' };
        default:
            return { color: '#19180A', title: 'Night' };
        }
    }

    onColorScroll(event: any): void {
        const before = this.colorNumber;
        this.colorNumber = Math.round(
            event.target.scrollLeft / window.innerWidth
        );

        if (this.colorNumber != before) {
            const titleAndColor = this.getRespectiveColorAndTitle(
                this.colorNumber
            );
            this.color = titleAndColor.color;
            this.title = titleAndColor.title;

            document.documentElement.style.setProperty(
                '--themeColor',
                this.color
            );
        }
    }

    animationCreated(animationItem: AnimationItem): void {
        this.animationItem = animationItem;
    }

    addButton(): void {
        if (this.selectedSize !== '') {
            const ct = this.getRespectiveColorAndTitle(this.colorNumber);
            let newSrc = 'moonless_night.png';
            switch (this.colorNumber) {
            case 1:
                newSrc = 'white_orchid.png';
                break;
            case 2:
                newSrc = 'deep_sky.png';
                break;
            case 3:
                newSrc = 'cherry_blossom.png';
                break;
            case 4:
                newSrc = 'rose.png';
                break;
            }
            const order = new Order(
                this.selectedSize,
                ct.color,
                ct.title,
                newSrc
            );
            console.log('Added new order, ', order);
            this.basket.push(order);
            localStorage.setItem('basket', JSON.stringify(this.basket));
        } else {
            console.log('Please select size');
        }
    }
    removeOrder(i: number): void {
        this.basket.splice(i, 1);
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }

    payButton(dir: number, condition = true, msg = ''): void {
        if (!condition) {
            console.log(msg);
            return;
        }

        this.payIndex += dir;
        const payDiv = document.getElementsByClassName('basketSection').item(0);

        if (payDiv)
            payDiv.scroll({
                behavior: 'smooth',
                left: window.innerWidth * this.payIndex,
            });
    }

    setShippingMethod(method: number): void {
        this.shippingMethod = method;
        console.log(this.shippingMethod);
    }
}
