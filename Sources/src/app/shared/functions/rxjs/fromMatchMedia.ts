import { Observable } from 'rxjs';

export function fromMatchMedia(query: string, ignoreInitial = true): Observable<MediaQueryList> {
    return new Observable(observer => {
        const mediaQueryList = matchMedia(query);

        const onChange = () => observer.next(mediaQueryList);

        if (!ignoreInitial) {
            observer.next(mediaQueryList);
        }

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', onChange);

            return () => mediaQueryList.removeEventListener('change', onChange);
        } else {
            // noinspection JSDeprecatedSymbols
            mediaQueryList.addListener(onChange);

            // noinspection JSDeprecatedSymbols
            return () => mediaQueryList.removeListener(onChange);
        }
    });
}
