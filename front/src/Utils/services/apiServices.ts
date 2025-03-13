export const API_URLS = {
    email_send: process.env.NEXT_PUBLIC_API_URL + '/email/send'
};

export const fetchData = async <T>(url: string, options?: { body?: any; headers?: HeadersInit }): Promise<T> => {
    const response = await fetch(url, {
      method: options?.body ? 'POST' : 'GET', 
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    return response.json();
  };

  export const sendEmail = async (
    to: string,
    subject: string,
    content: string,
    eventType?: string
  ) => {
    const response = await fetch(API_URLS.email_send, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, content, eventType }),
    });
  
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  
    return response.json();
  };
  