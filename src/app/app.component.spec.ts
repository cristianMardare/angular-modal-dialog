import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalService } from './modal-service/modal.service'
import { ModalQueueService } from './modal-queue/modal-queue.service'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ModalModule.forRoot()
      ],
      declarations: [
        AppComponent,
        ModalDialogComponent
      ],
      providers: [
        { provide: ModalService, useValue: null },
        { provide: ModalQueueService, useValue: null }
      ]

    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
