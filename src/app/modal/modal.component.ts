import { Component, Input, OnInit } from '@angular/core';

import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  host: { '(document:keyup)': 'keyup($event)' }
})
export class ModalComponent implements OnInit {

  @Input('modal-id') modalId: string;
  @Input('modal-title') modalTitle: string;
  @Input() blocking = false;
  @Input() wide = false;

  isOpen = false;
  animate = true;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  private close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  private keyup(event: KeyboardEvent): void {
    if (event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
    }
  }

  private filterClick(event: Event): void {
    event = event || window.event

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
}
