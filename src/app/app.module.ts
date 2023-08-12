import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FilterPipe } from './core/pipe/filter.pipe';
import { HomeComponent } from './pages/home/home/home.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';

const matSnackBarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top'
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterPipe,
    HomeComponent,
    ModalComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NoopAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      tapToDismiss: true
    }),
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: matSnackBarDefaultConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
