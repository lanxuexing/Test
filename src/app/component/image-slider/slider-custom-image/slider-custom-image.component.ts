import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    Input
} from '@angular/core';

// tslint:disable-next-line:one-variable-per-declaration
const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
    validFileExtensions = ['jpeg', 'jpg', 'gif', 'png'],
    validVideoExtensions = ['mp4'];

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'custom-img',
    templateUrl: './slider-custom-image.component.html'
})
export class SliderCustomImageComponent implements OnInit, AfterViewInit, OnDestroy {
    YOUTUBE = 'youtube';
    IMAGE = 'image';
    VIDEO = 'video';
    fileUrl = '';
    fileExtension = '';
    type = this.IMAGE;

    // @inputs
    @Input()
    set imageUrl(url) {
        if (url && typeof (url) === 'string') {
            this.fileUrl = url;
            this.fileExtension = url.replace(/^.*\./, '');
            // verify for youtube url
            const match = url.match(youtubeRegExp);
            if (match && match[2].length === 11) {
                this.type = this.YOUTUBE;
                this.fileUrl = `https://img.youtube.com/vi/${match[2]}/0.jpg`;
            } else if (this.fileExtension && validFileExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
                this.type = this.IMAGE;
            } else if (this.fileExtension && validVideoExtensions.indexOf(this.fileExtension.toLowerCase()) > -1) {
                this.type = this.VIDEO;
            }
        }
    }
    @Input() isVideo = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy() {
    }
}
