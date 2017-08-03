import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from './modal-service/modal.service'
import { ModalQueueService } from './modal-queue/modal-queue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) container: ViewContainerRef;
  title = 'app';
  private _counter = 0;

  constructor(private modal: ModalService,  private queue: ModalQueueService) { }

  onError(e){
    let options = {
      message: 'This is an error!',
      extraDetails: 'Lorem ipsum and so on and on and on....'
    };
      this.modal
      .on(this.container)
      .error(options);
  }

  onAlert(e){
    let options = {
      message: 'This is an alert!',
      autoClose: true
    };
      this.modal
      .on(this.container)
      .alert(options);
  }

  onConfirm(e){
    let options = {
      message: 'This is a confirm!'
    };
      this.modal
      .on(this.container)
      .confirm(options).then(() => {
        console.log('The dialog confirmed !');
      }, () => {
        console.log('The dialog rejected !');
      });
  }

  onQueueAlert(e) {
    this._counter = 0;
        let modal = this.queue
                .on(this.container);

    for (var i = 0; i <= 5; i++) {
        setTimeout(() => {
        let options = {
                message: `Queued alert #${this._counter++}`,
                autoClose: true
              };
                modal
                .alert(options);
        }, 100);
    }
  }

  onQueueError(e){
    this._counter = 0;
    let modal = this.queue
                .on(this.container);

    const timespans = [100, 5000, 100, 100]

    timespans.forEach((t, i) => {
      setTimeout(() => {
              let options = {
                      message: `Queued error #${i + 1} after ${t}ms`,
                      extraDetails: 'Lorem ipsum and so on and on and on....'
                    };
                      modal
                      .error(options);
              }, t);
    });
  }
}
