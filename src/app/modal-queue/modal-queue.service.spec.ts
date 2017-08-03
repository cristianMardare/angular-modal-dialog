import { TestBed, inject } from '@angular/core/testing';

import { ModalQueueService } from './modal-queue.service';

describe('ModalQueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalQueueService]
    });
  });

  it('should be created', inject([ModalQueueService], (service: ModalQueueService) => {
    expect(service).toBeTruthy();
  }));
});
