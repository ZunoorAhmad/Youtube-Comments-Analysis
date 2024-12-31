import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GlobalService } from './services/global.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgOtpInputModule } from 'ng-otp-input';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// import { NgxCurrencyDirective, NgxCurrencyInputMode, provideEnvironmentNgxCurrency } from 'ngx-currency';
import { AngularPhoneNumberInput } from 'angular-phone-number-input';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        // NgxCurrencyDirective,
        AngularPhoneNumberInput,
        FontAwesomeModule,
        ToastModule,
        ProgressSpinnerModule,
        NgOtpInputModule,
        ConfirmDialogModule,
    ],
    providers: [
        // GlobalService,
        DialogService,
        DynamicDialogRef,
        ConfirmationService,
        MessageService,
        DynamicDialogConfig,
        // provideEnvironmentNgxCurrency({
        //     align: "right",
        //     allowNegative: true,
        //     allowZero: true,
        //     decimal: ",",
        //     precision: 2,
        //     prefix: "R$ ",
        //     suffix: "",
        //     thousands: ".",
        //     nullable: true,
        //     min: null,
        //     max: null,
        //     inputMode: NgxCurrencyInputMode.Financial,
        //   }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
