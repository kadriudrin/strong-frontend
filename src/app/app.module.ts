import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { LogoComponent } from './logo/logo.component';
import { DownComponent } from './logo/down/down.component';
import { InfoComponent } from './info/info.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LottieModule.forRoot({ player: playerFactory }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
