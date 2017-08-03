import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

import { Queue } from '../models'

@Injectable()
export class ModalQueueService {

    componentRef: ComponentRef<ModalDialogComponent>;

    private _queue: Queue
    private _currentRequest: any;
    private DEBOUNCE = 500;

    constructor(private resolver: ComponentFactoryResolver) {
        this._queue = new Queue();
    }

    on(container: ViewContainerRef) {
        this.createModal(container);
        return this;
    }

    alert(options: any) {
        if (!this.componentRef)
            throw new Error('The modal component was not initialized. Use the .on method to create the modal before showing it');

        const _this = this;

        options = options || {};
        options.type = 'alert';

       this.enqueue(options);
    }

    error(options: any) {

        if (!this.componentRef)
            throw new Error('The modal component was not initialized. Use the .on method to create the modal before showing it');

        const _this = this;

        options = options || {};
        options.type = 'error';

        this.enqueue(options);

    }

    private createModal(container: ViewContainerRef) {
        const _this = this;
        if (container == null)
            throw new Error('Cannot create the modal dialog component. No container was provided !');

        if (this.componentRef)
            this.componentRef.destroy();

        const factory: ComponentFactory<ModalDialogComponent> = this.resolver
            .resolveComponentFactory(ModalDialogComponent);

        this.componentRef = container.createComponent(factory);
    }

    private enqueue(options){
        if (!this._currentRequest){
          console.log('Enqueue ---> No current request.');
          this.showModal(options);
        }else{
            console.log('Enqueue ---> Add options to queue', options);
            this._queue.enqueue(options);
        }
    }

    private showModal(options) {
      console.log('Showing modal for', options);
        const _this = this;
        this._currentRequest = options;

        let subscription = this.componentRef.instance.onClosing.subscribe(() => { 
          setTimeout(() => {
            subscription.unsubscribe();
            console.log('Modal closing. Reseting current request');
            _this._currentRequest = null;

            _this.showNext();

          }, _this.DEBOUNCE);

        });

        setTimeout(() => { _this.componentRef.instance.show(options); }, 0);
    }

    private showNext(){
          const next = this._queue.dequeue();
          if (next){
            console.log('Modal closing. Launching next modal for ', next);
            this.showModal(next);
          }
    }
}
