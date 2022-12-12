import { Component, HostBinding, Inject, Input, OnChanges, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface ShareButtonDef {
    url: string;
    icon: string;
    label?: string;
}

export interface ShareButtonUserDef {
    type: string;
    label?: string;
    icon?: string;
}

export interface ShareButton {
    type: string;
    url: string;
    label: string;
    icon: string;
}

export type ShareButtonsList = string | Array<string | ShareButtonUserDef>;

const shareButtonsDef: Record<string, ShareButtonDef> = {
    facebook: {
        url: 'https://www.facebook.com/sharer/sharer.php?u=%URL%',
        icon: 'fab fa-facebook-f',
        label: 'Like',
    },
    twitter: {
        url: 'https://twitter.com/share?url=%URL%',
        icon: 'fab fa-twitter',
        label: 'Tweet',
    },
    pinterest: {
        url: 'https://pinterest.com/pin/create/button/?url=%URL%&media=%IMAGE%&description=%TITLE%',
        icon: 'fab fa-pinterest',
        label: 'Pin It',
    },
    whatsapp: {
        url: 'https://wa.me/?text=%URL%',
        icon: 'fab fa-whatsapp',
        label: 'Share',
    },
    linkedin: {
        url: 'https://www.linkedin.com/shareArticle?title=%TITLE%&url=%URL%',
        icon: 'fab fa-linkedin',
        label: 'Share',
    },
    ok: {
        url: 'https://connect.ok.ru/offer?url=%URL%&title=%TITLE%&imageUrl=%IMAGE%',
        icon: 'fab fa-odnoklassniki',
        label: 'Share',
    },
    vk: {
        url: 'https://vk.com/share.php?url=%URL%',
        icon: 'fab fa-vk',
        label: 'Share',
    },
    telegram: {
        url: 'https://telegram.me/share/url?url=%URL%&text=%TITLE%',
        icon: 'fas fa-paper-plane',
        label: 'Share',
    },
    email: {
        url: 'mailto:?to=&subject=%TITLE%&body=%URL%',
        icon: 'fas fa-envelope',
        label: 'Share',
    },
};

@Component({
    selector: 'app-share-buttons',
    templateUrl: './share-buttons.component.html',
    styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnChanges {
    items: ShareButton[] = [];

    @Input() buttons: ShareButtonsList = [];

    @Input() showIcons = true;

    @Input() showLabels = true;

    @Input() pageUrl = '';

    @Input() pageTitle = '';

    @Input() pageImage = '';

    @HostBinding('class.share-buttons') classShareLinks = true;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['buttons'] || changes['pageUrl'] || changes['pageTitle'] || changes['pageImage']) {
            this.makeItems();
        }
    }

    private makeItems(): void {
        let value = this.buttons;

        if (typeof value === 'string') {
            value = value.split(',');
        }

        this.items = value.map(x => {
            const userDef: ShareButtonUserDef = typeof x === 'string' ? {type: x} : x;
            const type = userDef.type;
            const def = shareButtonsDef[type];

            if (!def) {
                return null;
            }

            return {
                type,
                url: this.makeShareUrl(def.url),
                label: typeof userDef.label === 'string' ? userDef.label : def.label,
                icon: typeof userDef.icon === 'string' ? userDef.icon : def.icon,
            } as ShareButton;
        }).filter(x => x !== null) as ShareButton[];
    }

    private makeShareUrl(baseUrl: string): string {
        let pageUrl = '';
        let pageTitle = '';
        let pageImage = '';

        if (isPlatformBrowser(this.platformId)) {
            pageUrl = window.location.href;
        }

        pageUrl = this.pageUrl || pageUrl;
        pageTitle = this.pageTitle || pageTitle;
        pageImage = this.pageImage || pageImage;

        return baseUrl
            .replace('%URL%', encodeURIComponent(pageUrl))
            .replace('%TITLE%', encodeURIComponent(pageTitle))
            .replace('%IMAGE%', encodeURIComponent(pageImage));
    }
}
