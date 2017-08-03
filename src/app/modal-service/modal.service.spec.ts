import { CommonModule } from '@angular/common';  
import { Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser'; 
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ModalModule } from 'ng2-bootstrap';

describe('ModalService', () => {
    var parentFixture: ComponentFixture<TestComponent>;
    var parentDebug;
    var injector;

    beforeEach(() => {
        injector = TestBed.configureTestingModule({
            imports: [TestModule],
            declarations: [TestComponent],
            providers: [ModalService]
        });

        parentFixture = TestBed.createComponent(TestComponent);
        parentDebug = parentFixture.debugElement;
    });

    it('should be created', inject([ModalService], (service: ModalService) => {
        expect(service).toBeTruthy();
    }));

    it('should expose an option to show an error modal', inject([ModalService], (service: ModalService) => {
        expect(typeof (service.error)).toEqual('function');
    }));

    it('should expose an option to show an alert modal', inject([ModalService], (service: ModalService) => {
        expect(typeof (service.alert)).toEqual('function');
    }));

    it('should expose an option to show a confirm modal', inject([ModalService], (service: ModalService) => {
        expect(typeof (service.confirm)).toEqual('function');
    }));

    it('should expose an option to close the modal', inject([ModalService], (service: ModalService) => {
        expect(typeof (service.close)).toEqual('function');
    }));

    it('should create only one instance of modal even if called multiple times',
        inject([ModalService],
            (service: ModalService) => {
                const container: ViewContainerRef = parentFixture.componentInstance.container;
                service.on(container)
                    .error({});

                service.on(container)
                    .error({});

                parentFixture.detectChanges();

                var children = parentDebug.queryAll(By.css('modal-dialog'));

                expect(children).not.toBe(null);
                expect(children.length).toEqual(1);
            }));

    describe('error option', () => {
        it('should throw an exception if no container is specified before the call',
            inject([ModalService],
                (service: ModalService) => {
                    expect(() => {
                        service.error({});
                    })
                        .toThrowError();
                }));

        it('should create a modal inside the provided container',
            inject([ModalService],
                (service: ModalService) => {
                    const container: ViewContainerRef = parentFixture.componentInstance.container;
                    service.on(container).error({});

                    parentFixture.detectChanges();

                    var children = parentDebug.queryAll(By.css('modal-dialog'));

                    expect(children).not.toBe(null);
                    expect(children.length).toEqual(1);
                }));

        it('should remove the modal inside the provided container when closing',
            inject([ModalService],
                (service: ModalService) => {
                    const container: ViewContainerRef = parentFixture.componentInstance.container;
                    service.on(container).error({});

                    parentFixture.detectChanges();

                    service.close();

                    parentFixture.detectChanges();

                    var children = parentDebug.queryAll(By.css('modal-dialog'));

                    expect(children).not.toBe(null);
                    expect(children.length).toEqual(0);
                }));
    });

    describe('alert option', () => {
        it('should throw an exception if no container is specified before the call',
            inject([ModalService],
                (service: ModalService) => {
                    expect(() => {
                        service.alert({});
                    })
                        .toThrowError();
                }));

        it('should create a modal inside the provided container',
            inject([ModalService],
                (service: ModalService) => {
                    const container: ViewContainerRef = parentFixture.componentInstance.container;
                    service.on(container).alert({});

                    parentFixture.detectChanges();

                    var children = parentDebug.queryAll(By.css('modal-dialog'));

                    expect(children).not.toBe(null);
                    expect(children.length).toEqual(1);
                }));

        it('should remove the modal inside the provided container when closing',
            inject([ModalService],
                (service: ModalService) => {
                    const container: ViewContainerRef = parentFixture.componentInstance.container;
                    service.on(container).alert({});

                    parentFixture.detectChanges();

                    service.close();

                    parentFixture.detectChanges();

                    var children = parentDebug.queryAll(By.css('modal-dialog'));

                    expect(children).not.toBe(null);
                    expect(children.length).toEqual(0);
                }));
    });

    describe('confirm option', () => {
        
        it('should throw an exception if no container is specified before the call',
            inject([ModalService],
                (service: ModalService) => {
                    expect(() => {
                        service.confirm({});
                    })
                        .toThrowError();
                }));

        it('should create a modal inside the provided container',
            inject([ModalService],
                (service: ModalService) => {
                    const container: ViewContainerRef = parentFixture.componentInstance.container;
                    service.on(container).confirm({});

                    parentFixture.detectChanges();

                    var children = parentDebug.queryAll(By.css('modal-dialog'));

                    expect(children).not.toBe(null);
                    expect(children.length).toEqual(1);
                }));

        it('should remove the modal inside the provided container when closing',
            inject([ModalService],
                (service: ModalService) => {
                    const container: ViewContainerRef = parentFixture.componentInstance.container;
                    service.on(container).confirm({});

                    parentFixture.detectChanges();

                    service.close();

                    parentFixture.detectChanges();

                    var children = parentDebug.queryAll(By.css('modal-dialog'));

                    expect(children).not.toBe(null);
                    expect(children.length).toEqual(0);
                }));

        it('should return a promise that resolves if user presses Yes',
            fakeAsync(inject([ModalService], (service: ModalService) => {
                const container: ViewContainerRef = parentFixture.componentInstance.container;
                let result: boolean;

                service.on(container)
                    .confirm({})
                    .then(() => {
                        result = true;
                    }, () => {
                        result = false;
                    });

                parentFixture.detectChanges();

                var yesButton = parentDebug.query(By.css('button[data-automation-id="modal.yes"]'));

                expect(yesButton).not.toBe(null);
                yesButton.nativeElement.click();

                tick(500); // wait for the promise to complete
                expect(result).toEqual(true);
            })));
    });
});

@NgModule({
    imports: [BrowserModule, CommonModule, ModalModule.forRoot()],
    entryComponents: [ModalDialogComponent],
    declarations: [ModalDialogComponent]
})
class TestModule { }

@Component({ selector: 'test-cmp', template: '<div #container></div>' })
class TestComponent {
    @ViewChild('container', { read: ViewContainerRef }) container;
}

function createTestComponent(template: string): ComponentFixture<TestComponent> {
    return TestBed.overrideComponent(TestComponent, { set: { template: template } })
        .createComponent(TestComponent);
}