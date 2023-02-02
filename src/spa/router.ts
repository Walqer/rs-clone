import { Router, RouterMatch } from './interface';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';

function pathToRegex(path: string) {
    return new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);
}

function getParams(match: RouterMatch) {
    const values = match.result ? match.result.slice(1) : [];
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);

    return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
}

async function router(): Promise<void> {
    const routes: Router[] = [
        { path: '/', view: Home },
        { path: '/auth', view: Auth },
        { path: '/404', view: Page404 },
    ];

    const potentialMatches = routes.map((route) => ({
        route,
        result: window.location.pathname.match(<RegExp>(<unknown>pathToRegex(route.path))),
    }));

    let match = potentialMatches.find((potentialMatch) => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[1],
            result: [window.location.pathname],
        };
    }

    // eslint-disable-next-line new-cap
    const view = new match.route.view(getParams(match));
    try {
        (document.querySelector('.main') as HTMLElement).innerHTML = await view.getHtml();
        view.mounted();
    } catch (error) {
        (document.querySelector('.main') as HTMLElement).innerHTML = 'error';
    }
}

async function navigateTo(url: string) {
    window.history.pushState(null, '', url);
    await router();
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
window.addEventListener('popstate', router);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
document.addEventListener('DOMContentLoaded', async () => {
    document.body.addEventListener('click', (e) => {
        if ((<HTMLElement>e.target).matches('[data-link]')) {
            e.preventDefault();
            navigateTo((<HTMLAnchorElement>e.target).href).catch((err: string) => {
                throw new Error(err);
            });
        }
    });

    await router();
});
