import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const API_PATH = 'https://dog.ceo/api/breeds/image/random';
const fetch = axios.get(API_PATH);

const Example = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getDog'],
    queryFn: () => fetch,
  });
  if (isLoading) {
    return <p>loading...</p>;
  }
  return <>{data && <img src={data?.data?.message ?? ''} alt='dog' />}</>;
};

export default Example;
