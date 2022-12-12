import { Link } from './link';
import { Menu } from './menu';
import { Megamenu } from './megamenu';

export interface NavigationLink extends Link {
    menu?: Menu|Megamenu;
}
