export async function fetchApi(url: string, method: string, token: string, body?: object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (token !== '') headers.append('Authorization', `Bearer ${token}`);
    const response = await fetch(url, {
        headers,
        method,
        body: body ? JSON.stringify(body) : null,
    }).then((res) => ({ status: res.status, body: res.json() }));
    return response;
}

export function parseJwt(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => {
                const s = c.charCodeAt(0).toString(16);
                return `%${`00${s}`.slice(-2)}`;
            })
            .join('')
    );
    return jsonPayload;
    //  return JSON.parse(jsonPayload);
}
