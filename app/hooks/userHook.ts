import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUsers = async (page: number) => {
    console.log("page", page)
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users', {
            params: { page },
        });

        return data;
    } catch (err) {
        console.log(err)
    }
};

export const useUsers = (page: number) => {

    return useQuery({
        queryKey: ['users', page], queryFn: () => fetchUsers(page), staleTime: 1000 * 60,
    });
};

