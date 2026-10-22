const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path,options ={}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            ...(options.body
           ? {"Content-Type": "application/json"}
           : {}),
           ...options.headers
        }
    }); 
      const data = await response.json();
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    return data;
}