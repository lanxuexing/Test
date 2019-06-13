import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-modal-demo',
    template: `
        <h3>Modal Use Case</h3>
        <button type="button" (click)="modalRoot1.show()">Open modal</button>
        <button type="button" class="mgLeft" (click)="modalRoot2.show()">Open nested modal</button>
        <button type="button" class="mgLeft" (click)="modalRoot4.show()">Open base modal</button>
        <button type="button" class="mgLeft" (click)="isShowPanel = true;">Open panel modal</button>
        <!-- Open modal -->
        <app-modal #modalRoot1
            [modalTitle]="'Demo modal'"
            [width]="500"
            [zIndex]="1100"
            (closeModal)="onCloseModal()">
        <ng-container class="app-modal-body">
            <h3>MODAL DIALOG</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
        </ng-container>
        <ng-container class="app-modal-footer">
            <button type="button" class="button button3" (click)="modalRoot1.hide()">Delete</button>
            <button type="button" class="button button1 mgLeft" (click)="modalRoot1.hide()">Save</button>
            <button type="button" class="button button2" style="float: right;" (click)="modalRoot1.hide()">Close
            </button>
        </ng-container>
        </app-modal>
        <!-- 嵌套Modal -->
        <app-modal #modalRoot2
            [modalTitle]="'Modal 1'"
            [width]="600"
            [zIndex]="zIndex">
            <ng-container class="app-modal-body">
                <h3>MODAL DIALOG</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
                <button type="button" class="button" (click)="childModal.show()">Open modal</button>
                <!-- 子Modal Start -->
                <app-modal #childModal
                    [modalTitle]="'Modal 2'"
                    [width]="550"
                    [zIndex]="zIndex+2">
                    <ng-container class="app-modal-body">
                        <h3>MODAL DIALOG</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
                        <app-modal [zIndex]="zIndex+4" #modalRoot3
                            [modalTitle]="'Demo modal'"
                            [width]="500"
                            [zIndex]="zIndex"
                            [maximizable]="true"
                            (closeModal)="onCloseModal()">
                        <ng-container class="app-modal-body">
                            <h3>MODAL DIALOG</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
                        </ng-container>
                        <ng-container class="app-modal-footer">
                            <button type="button" class="button button3">Delete</button>&nbsp;
                            <button type="button" class="button button1">Save</button>
                            <button type="button" class="button button2" style="float: right;" (click)="modalRoot3.hide()">Close</button>
                        </ng-container>
                        </app-modal>
                    </ng-container>
                    <ng-container class="app-modal-footer">
                        <button type="button" class="button button3">Delete</button>&nbsp;
                        <button type="button" class="button button1">Save</button>
                        <button type="button" class="button button2" style="float: right;" (click)="childModal.hide()">Close
                        </button>
                    </ng-container>
                </app-modal>
                <!-- 子Modal End -->
            </ng-container>
            <ng-container class="app-modal-footer">
                <button type="button" class="button button3">Delete</button>&nbsp;
                <button type="button" class="button button1">Save</button>
                <button type="button" class="button button2" style="float: right;" (click)="modalRoot2.hide()">Close</button>
            </ng-container>
        </app-modal>
        <!-- 基本Modal -->
        <app-modal #modalRoot4
            [modalTitle]="'Demo modal'"
            [width]="500"
            [zIndex]="zIndex"
            [maximizable]="true"
            (closeModal)="onCloseModal()">
            <ng-container class="app-modal-body">
                <h3>MODAL DIALOG</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            </ng-container>
            <ng-container class="app-modal-footer">
                <button type="button" class="button button3">Delete</button>&nbsp;
                <button type="button" class="button button1">Save</button>
                <button type="button" class="button button2" style="float: right;" (click)="modalRoot4.hide()">Close</button>
            </ng-container>
        </app-modal>
        <!-- 面板Modal -->
        <div class="panel" *ngIf="isShowPanel">
            <button type="button" class="button" (click)="modal5.show()">Open panel 1</button>&nbsp;
            <button type="button" class="button" (click)="modal6.show()">Open panel 2</button>&nbsp;
            <button type="button" class="button" (click)="modal7.show()">Open panel 2</button>&nbsp;
        </div>
        <app-modal #modal5
            class="modal1"
            [modalTitle]="'Panel 1'"
            [width]="500"
            [maximizable]="true"
            [backdrop]="false">
            <ng-container class="app-modal-body">
                <h3>MODAL DIALOG</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            </ng-container>
            <ng-container class="app-modal-footer">
                <button type="button" class="button button3">Delete</button>&nbsp;
                <button type="button" class="button button1">Save</button>
                <button type="button" class="button button2" style="float: right;" (click)="modal5.hide();
                isShowPanel = false;">Close</button>
            </ng-container>
        </app-modal>
        <app-modal #modal6
            class="modal2"
            [modalTitle]="'Panel 2'"
            [width]="500"
            [maximizable]="true"
            [backdrop]="false">
            <ng-container class="app-modal-body">
                <h3>MODAL DIALOG</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            </ng-container>
            <ng-container class="app-modal-footer">
                <button type="button" class="button button3">Delete</button>&nbsp;
                <button type="button" class="button button1">Save</button>
                <button type="button" class="button button2" style="float: right;" (click)="modal6.hide();
                isShowPanel = false;">Close</button>
            </ng-container>
        </app-modal>
        <app-modal #modal7
            class="modal3"
            [modalTitle]="'Panel 3'"
            [width]="500"
            [maximizable]="true"
            [backdrop]="false">
            <ng-container class="app-modal-body">
                <h3>MODAL DIALOG</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.</p>
            </ng-container>
            <ng-container class="app-modal-footer">
                <button type="button" class="button button3">Delete</button>&nbsp;
                <button type="button" class="button button1">Save</button>
                <button type="button" class="button button2" style="float: right;" (click)="modal7.hide();
                isShowPanel = false;">Close</button>
            </ng-container>
        </app-modal>
        <app-back></app-back>
    `,
    styles: [`
        .mgLeft {
            margin-left: 20px;
        }
        .button1 {
            color: #FFF;
            background-color: #4caf50;
        }
        .button2 {
            color: #FFF;
            background-color: #008cba;
        }
        .button3 {
            color: #FFF;
            background-color: #f44336;
        }
        .panel {
            margin: 20px 0;
        }
    `]
})
export class ModalDemoComponent implements OnInit {
    zIndex = 1;
    isShowPanel = false;

    constructor() { }

    ngOnInit(): void { }

    onCloseModal() {}
}
