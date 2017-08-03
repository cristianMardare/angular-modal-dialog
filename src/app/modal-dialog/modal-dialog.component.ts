import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

    @ViewChild('inner') public innnerModal: ModalDirective;

    @Output() onClosing: EventEmitter<any> = new EventEmitter<any>();

    settings: {
        type: string;
        title: string;
        message: string;
        extraDetails: string;
        header: {
            class: string
        };
    };

    isCollapsed: boolean;

    constructor() {
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }

    show(options) {
        let that = this;
        this.settings = this.generateSettings(options);

        let autoClose = options.autoClose;
        let timespanToAutoClose = options.autoCloseTimespan || 2000; // the auto-close timespan can be set throug different means - each of them with a different precedence level

        this.innnerModal.config = {
            ignoreBackdropClick: that.disableBackdropInteractions(this.settings),
            keyboard: !that.disableBackdropInteractions(this.settings),
            show: false
        };

        this.innnerModal.show();
        if (autoClose === true) {
            setTimeout(() => this.close(false), timespanToAutoClose);
        }
    }

    hide() {
        this.close(false);
    }

    ngOnInit() {
    }

/** Internal methods **/
    private generateSettings(options) {
        options = options || {};

        const default_options = {
            type: '',
            title: 'Information',
            message: ''
        };
        
        let settings = Object.assign({}, default_options, options)

        return settings;
    }

    private close(response: boolean) {
        this.innnerModal.hide();
        console.log('Modal is closing...');
        this.onClosing.emit(response);
    }

    private onAccept() {
        this.close(true);
    }

    private onReject() {
        this.close(false);
    }

    private disableBackdropInteractions(settings): boolean {
        if (!settings)
            return true;

        const isConfirmModal = settings.type === 'confirm';

        return isConfirmModal;
    }
}
