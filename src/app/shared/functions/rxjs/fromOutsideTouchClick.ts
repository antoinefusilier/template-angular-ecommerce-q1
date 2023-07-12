import { Observable } from 'rxjs';
import { fromGlobalTouchClick } from './fromGlobalTouchClick';
import { filter } from 'rxjs/operators';

export function fromOutsideTouchClick(element: Element): Observable<TouchEvent> {
    return fromGlobalTouchClick().pipe(
        filter(event => {
            let node: Element|null = (event.target as Element) || null;

            while (node) {
                if (node === element) {
                    break;
                }

                node = node.parentElement;
            }

            return node === null;
        }),
    );
}
