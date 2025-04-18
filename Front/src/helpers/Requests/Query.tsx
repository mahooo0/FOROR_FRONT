import { useQuery } from '@tanstack/react-query';
import instanceAxios from './axios';

// Axios Instance

// import { useParams } from 'react-router-dom';

export default function GETRequest<T>(
    api: string,
    querykey: string,
    dependencies: any[],
    params?: Record<string, any>
) {
    // const { lang = 'ru' } = useParams<{ lang: string }>();

    const { data, isLoading, isError } = useQuery<T>({
        queryKey: [querykey, ...dependencies, params],
        queryFn: async () => {
            try {
                const lang = localStorage.getItem('lang') || 'az';

                const data = await instanceAxios
                    .get<T>(api, {
                        headers: {
                            'Accept-Language': lang,
                        },
                        params: params,
                    })
                    .then((res) => res.data);
                return data;
            } catch (error) {
                // toast.error('Error occurred');
                console.log(error, `querykey: ${querykey}`);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 60,
        // Keep data alive in background to avoid refetching
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError };
}

// API Helper Methods
