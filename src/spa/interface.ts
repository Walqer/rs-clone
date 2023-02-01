import { AbstractView } from './AbstractView';
import { QueryStringParams } from './types';

export interface View {
    new (params: QueryStringParams): AbstractView;
}

export interface Router {
    path: string;
    view: View;
}

export interface RouterMatch {
    route: Router;
    result: RegExpMatchArray | null;
}
