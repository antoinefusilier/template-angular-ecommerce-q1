import { Observable } from 'rxjs';

export function fromTouchClick(element: EventTarget): Observable<TouchEvent> {
    return new Observable(observer => {
        let touchStartData: {
            target: EventTarget|null;
            touch: Touch;
            timestamp: number;
        }| null = null;

        const onTouchStart = (event: Event) => {
            if (!(event instanceof TouchEvent)) {
                return;
            }

            if (event.touches.length !== 1) {
                touchStartData = null;
                return;
            }

            touchStartData = {
                target: event.currentTarget,
                touch: event.changedTouches[0],
                timestamp: (new Date()).getTime(),
            };
        };

        const onTouchEnd = (event: Event) => {
            if (!(event instanceof TouchEvent)) {
                return;
            }

            if (
                !touchStartData ||
                event.changedTouches.length !== 1 ||
                event.changedTouches[0].identifier !== touchStartData.touch.identifier
            ) {
                return;
            }

            const timestamp = (new Date()).getTime();
            const touch = event.changedTouches[0];
            const distance = Math.abs(
                Math.sqrt(
                    Math.pow(touchStartData.touch.screenX - touch.screenX, 2) +
                    Math.pow(touchStartData.touch.screenY - touch.screenY, 2)
                )
            );

            if (touchStartData.target === event.currentTarget && timestamp - touchStartData.timestamp < 500 && distance < 10) {
                observer.next(event);
            }
        };

        element.addEventListener('touchstart', onTouchStart);
        element.addEventListener('touchend', onTouchEnd);

        return () => {
            element.removeEventListener('touchstart', onTouchStart);
            element.removeEventListener('touchend', onTouchEnd);
        };
    });
}
