import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, takeUntil, concatAll, throttleTime, debounceTime, filter, withLatestFrom } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs-demo07',
    template: `
        <h3>Rxjs Demo07 To Study! -- 拖拽实例</h3>
        <div class="scrollContainer">
            <div #anchor>
                <div class="video" #video>
                    <div class="masker">点击按住视频可拖动</div>
                    <video width="100%" [attr.src]="videoSrc" controls>
                        <source src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg" type="video/ogg">
                        Your browser does not support HTML5 video.
                    </video>
                </div>
            </div>
        </div>
        <app-back></app-back>
    `,
    styles: [`
        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
        .scrollContainer {
            margin: 0;
            padding: 0;
            height: 2000px;
            background-color: #F0F0F0;
        }
        #anchor {
            height: 360px;
            width: 100%;
            background-color: #F0F0F0;
        }
        .video {
            width: 640px;
            height: 360px;
            margin: 0;
            background-color: black;
        }
        .masker {
            display: none;
            text-align: center;
            line-height: 240px;
        }
        .video-fixed {
            position: fixed;
            bottom: 100px;
            right: 50px;
            width: 320px;
            height: 240px;
            cursor: all-scroll;
        }
        .video-fixed:hover .masker {
            display: block;
            position: absolute;
            width: 100%;
            height: 240px;
            background-color: #262626;
            z-index: 2;
        }
    `]
})
export class RxjsDemo07Component implements OnInit {
    // tslint:disable-next-line:max-line-length
    videoSrc = `http://jzvd.nathen.cn/c6e3dc12a1154626b3476d9bf3bd7266/6b56c5f0dc31428083757a45764763b0-5287d2089db37e62345123a1be272f8b.mp4`;
    @ViewChild('anchor') anchor: ElementRef<HTMLElement>;
    @ViewChild('video') video: ElementRef<HTMLElement>;

    constructor(
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        // 监听滚动事件
        fromEvent(document, 'scroll').pipe(
            throttleTime(500),
            debounceTime(500),
            map(_ => this.anchor.nativeElement.getBoundingClientRect().bottom < 0)
        ).subscribe(bool => {
            if (bool) {
                this.renderer.addClass(this.video.nativeElement, 'video-fixed');
            } else {
                this.renderer.removeClass(this.video.nativeElement, 'video-fixed');
            }
        });

        // 监听鼠标按下移动抬起事件
        const mouseDown = fromEvent(this.video.nativeElement, 'mousedown');
        const mouseMove = fromEvent(document, 'mousemove');
        const mouseUp = fromEvent(document, 'mouseup');
        mouseDown.pipe(
            filter(_ => this.video.nativeElement.classList.contains('video-fixed')),
            map(_ => mouseMove.pipe(
                takeUntil(mouseUp),
            )),
            concatAll(),
            withLatestFrom(mouseDown, (move: MouseEvent, down: MouseEvent) => {
                return {
                    x: this.getMinValue(move.clientX - down.offsetX, this.getScrollContainerMaxWidth(), 0),
                    y: this.getMinValue(move.clientY - down.offsetY, this.getScrollContainerMaxHeight(), 0)
                };
            })
        ).subscribe(pos => {
            this.renderer.setStyle(this.video.nativeElement, 'top', `${pos.y}px`);
            this.renderer.setStyle(this.video.nativeElement, 'left', `${pos.x}px`);
        });
    }

    // 取最小值
    getMinValue(value, max, min): number {
        return Math.min(Math.max(value, min), max);
    }

    // 获取滚动容器的最大宽度
    getScrollContainerMaxWidth(): number {
        return window.innerWidth - this.video.nativeElement.offsetWidth - 32;
    }

    // 获取滚动容器的最大高度
    getScrollContainerMaxHeight(): number {
        return window.innerHeight - this.video.nativeElement.offsetHeight - 75;
    }
}
