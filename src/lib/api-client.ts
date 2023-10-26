export function _client(url: string, customConfig?: RequestInit) {
    const config = {
        method: "GET",
        ...customConfig,
    };

    return window.fetch(url, config).then(async (response) => {
        if (response.ok) {
            return response.json();
        }
        const errorMessage = await response.text();
        return Promise.reject(new Error(errorMessage));
    });
}
