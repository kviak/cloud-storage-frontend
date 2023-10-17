import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';
import { AuthContentComponent } from './auth-content/auth-content.component';
import { ContentComponent } from './content/content.component';

import { AxiosService } from './axios.service';
import {NgOptimizedImage} from "@angular/common";
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ShareFilePageComponent } from './share-file-page/share-file-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    LoginFormComponent,
    WelcomeContentComponent,
    AuthContentComponent,
    ContentComponent,
    ModalDialogComponent,
    ShareFilePageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatDialogModule,
        NgOptimizedImage
    ],
  providers: [AxiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
