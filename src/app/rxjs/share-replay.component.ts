import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Hero } from '../core/memory/in-memory-data.service';
import { RxjsService } from './rxjs.service';

@Component({
    selector: 'app-share-replay',
    template: `
        <h3>this is share-replay component!</h3>
        <button (click)="btnClick()">点我获取英雄</button>
        <app-back></app-back>
    `,
    styleUrls: ['./rxjs.scss']
})
export class ShareReplayComponent implements OnInit {

    beginnerHero$: Observable<Hero[]>;
    advancedHero$: Observable<Hero[]>;

    constructor(
        private rxjsService: RxjsService
    ) { }

    ngOnInit(): void {
        const heros$ = this.rxjsService.getHeroes();
        this.beginnerHero$ = heros$.pipe(
            filter((res: any) => {
                if (res.id < 14) {
                    return res;
                }
            })
        );
        this.advancedHero$ = heros$.pipe(
            filter((res: any) => {
                if (res.id > 14) {
                    return res;
                }
            })
        );

        // this.beginnerHero$.subscribe();
        // this.advancedHero$.subscribe();
    }

    btnClick() {
        this.beginnerHero$.subscribe();
    }
}
