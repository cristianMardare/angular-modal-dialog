import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalService } from './modal-service/modal.service'
import { ModalQueueService } from './modal-queue/modal-queue.service'

@NgModule({
  entryComponents: [ModalDialogComponent],
  declarations: [
    AppComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule, 
    ModalModule.forRoot()
  ],
  providers: [
    ModalService,
    ModalQueueService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
