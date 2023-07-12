import { Link } from './link';

export interface NestedLink extends Link {
    items?: NestedLink[];
}
