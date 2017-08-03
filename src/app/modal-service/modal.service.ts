import { Injectable, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Injectable()
export class ModalService {

    componentRef: ComponentRef<ModalDialogComponent>;

    constructor(private resolver: ComponentFactoryResolver) {}

    on(container: ViewContainerRef) {
        this.createModal(container);
        return this;
    }

    error(options: any) {

        if (!this.componentRef)
            throw new
                Error('The modal component was not initialized. Use the .on method to create the modal before showing it');

        const _this = this;

        options = options || {};
        options.type = 'error';

        this.showModal(options);

    }

    alert(options: any) {
        if (!this.componentRef)
            throw new
                Error('The modal component was not initialized. Use the .on method to create the modal before showing it');

        const _this = this;

        options = options || {};
        options.type = 'alert';

        this.showModal(options);
    }

    confirm(options: any): Promise<boolean> {
        if (!this.componentRef)
            throw new
                Error('The modal component was not initialized. Use the .on method to create the modal before showing it');

        const _that = this;
        options.type = 'confirm';

        return new Promise((resolve, reject) => {
            this.showModal(options);
            this.componentRef.instance.onClosing.subscribe((response: boolean) => {
                response ? resolve() : reject();
            });
        });
    }

    close() {
        if (!this.componentRef)
            return;

        let modal = this.componentRef.instance;

        if (!modal)
            return;

        modal.hide();
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
        this.componentRef.instance.onClosing.subscribe(() => { if (_this.componentRef) _this.componentRef.destroy(); });
    }

    private showModal(options) {
        const _this = this;

        setTimeout(() => { _this.componentRef.instance.show(options); }, 0);
    }
}
