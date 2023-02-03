export async function fetchApi(url: string, method: string, body?: object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(url, {
        headers,
        method,
        body: body ? JSON.stringify(body) : null,
    }).then((res) => ({ status: res.status, body: res.json() }));
    return response;
}
