import { Overlay, OverlayConfig, OverlayRef, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal, TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material';

@Component({
    selector: 'app-overlay',
    templateUrl: `./overlay.component.html`,
    styleUrls: [`./overlay.component.scss`]
})
export class OverlayComponent implements OnInit {
    @ViewChild('overlayMenuList') overlayMenuList: TemplateRef<HTMLElement>;
    @ViewChild('originFab') originFab: CdkOverlayOrigin;
    @ViewChild('originNoFab') originNoFab: MatButton;
    overlayRef: OverlayRef;
    overlayNoRef: OverlayRef;
    config = new OverlayConfig({
        // noop保持overlay的位置不跟随滚动 reposition元件跟随滚动 close卷动是自动关闭overlay block不允许卷动
        scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
    isMenuOpen = false;
    overlayConnectRef: OverlayRef;
    @ViewChild('connectComponentOrigin') overlayConnectComponentOrigin: ElementRef;
    globalOverlayPosition = 0;
    overlayTemplateRef: OverlayRef;
    @ViewChild('overlayGlobalTemplate') templateGlobalPortals: TemplatePortalDirective;

    constructor(
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnInit(): void {
        // 1. 连接物件策略
        const strategy = this.overlay
            .position()
            .connectedTo(this.originFab.elementRef, { originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' });
        this.overlayRef = this.overlay.create({
            positionStrategy: strategy
        });

        // 2. 不连接物件策略
        const noLinkStrategy = this.overlay
            .position()
            .global()
            .width('auto')
            .height('100px')
            .centerHorizontally()
            .centerVertically();
        this.overlayNoRef = this.overlay.create({
            positionStrategy: noLinkStrategy,
            // 3. backdrop模式
            hasBackdrop: true,
            // 系统预设的可以让backdrop背景透明的CSS类
            // backdropClass: 'cdk-overlay-transparent-backdrop',
        });

        // 2. overlay背景层点击时间监听,
        this.overlayNoRef.backdropClick().subscribe(() => {
            this.overlayNoRef.detach();
        });

        // 2. 监听overlayRef上的键盘按键事件
        this.overlayNoRef.keydownEvents().subscribe((event: KeyboardEvent) => {
            console.log(this.overlayNoRef._keydownEventSubscriptions + ' times');
            console.log(event);
        });
    }

    // 1. 连接物件
    displayMenu() {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
        } else {
            this.overlayRef.attach(new TemplatePortal(this.overlayMenuList, this.viewContainerRef));
        }
    }

    // 2. 不连接物件
    displayNoMenu() {
        if (this.overlayNoRef && this.overlayNoRef.hasAttached()) {
            this.overlayNoRef.detach();
        } else {
            this.overlayNoRef.attach(new TemplatePortal(this.overlayMenuList, this.viewContainerRef));
        }
    }

    // 3. 鼠标悬浮依附某个组件显示
    showOverlayPanelConnectComponent() {
        const strategy = this.overlay
            .position()
            .flexibleConnectedTo(this.overlayConnectComponentOrigin.nativeElement)
            .withPositions([{
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetX: 0,
                offsetY: 0
            }])
            .withLockedPosition(true);
        // 这么理解origin组件(依附空组件)的那个点(originX, originY)和overlay组件的点(overlayX, overlayY)重合，从而确定overlay组件显示的位置
        const config = new OverlayConfig({
            positionStrategy: strategy,
            // 跟随滑动的策略
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
        this.overlayConnectRef = this.overlay.create(config);
        this.overlayConnectRef.attach(
            new ComponentPortal(
                OverlayPanelComponent,
                this.viewContainerRef
            )
        );
    }

    // 3. 鼠标离开依附某个组件不显示
    dismissOverlayPanelConnectComponent() {
        if (this.overlayConnectRef && this.overlayConnectRef.hasAttached()) {
            this.overlayConnectRef.dispose();
        }
    }

    // 4. 显示 ng-template 的内容
    showOverlayPanelTemplate() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .top(`${this.globalOverlayPosition}px`);
        this.globalOverlayPosition += 30;
        this.overlayTemplateRef = this.overlay.create(config);
        this.overlayTemplateRef.attach(this.templateGlobalPortals);
    }

    // 4. 移除 ng-template 内容
    dismissOverlayPanelTemplate() {
        if (this.overlayTemplateRef && this.overlayTemplateRef.hasAttached()) {
            this.overlayTemplateRef.dispose();
        }
    }

    // 5. overlay在整个屏幕位置，自己控制位置
    showOverlayGlobalPanelPosition() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay
            .position()
            .global()
            // 自己控制位置
            .left(`${this.globalOverlayPosition}px`)
            .top(`${this.globalOverlayPosition}px`);
        this.globalOverlayPosition += 30;
        config.hasBackdrop = true;
        const overlayRef = this.overlay.create(config);
        overlayRef.backdropClick().subscribe(() => {
            // 点击背景关掉弹窗
            overlayRef.dispose();
        });
        overlayRef.attach(
            new ComponentPortal(
                OverlayPanelComponent,
                this.viewContainerRef
            )
        );
    }

}


// 3. 鼠标悬浮面板组件
@Component({
    selector: 'app-overlay-panel',
    template: `
      <p class="wu-overlay-pane">Overlay展示</p>
    `,
    styles: [`
      .wu-overlay-pane {
        margin: 0;
        padding: 10px;
        color: #FFF;
        border-radius: 5px;
        background-color: #FC6720;
      }
    `]
})
export class OverlayPanelComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}

