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
