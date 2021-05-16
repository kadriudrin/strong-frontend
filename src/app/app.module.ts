import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { LogoComponent } from './logo/logo.component';
import { DownComponent } from './logo/down/down.component';
import { InfoComponent } from './info/info.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CartComponent } from './logo/cart/cart.component';

export function playerFactory() {
    return player;
}

@NgModule({
    declarations: [
        AppComponent,
        ShopComponent,
        LogoComponent,
        DownComponent,
        InfoComponent,
        CartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
