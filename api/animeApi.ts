import axios from 'axios';
import { GetAnimeApiResponse } from '@/types/anime';

const GetAnimeData = async (
  page: number,
  searchTitle?: string ,
  searchCategories?: string
) => {
  try {
    // const apiRank = 'https://kitsu.io/api/edge/anime?sort=ratingRank';
    let url = 'https://kitsu.io/api/edge/anime';
    const limit = 20;
    const offset = (page - 1) * 20;
    const sortDefault = 'ratingRank';
    const params = {
      'page[limit]': limit,
      'page[offset]': offset,
      'filter[text]': searchTitle || undefined,
      'filter[categories]': searchCategories || undefined,
      sort: searchTitle || searchCategories ? undefined : sortDefault,
    };
    // NOTE: params that are null or undefined are not rendered in the URL.

    const response = await axios.get<GetAnimeApiResponse>(url, { params });

    if (response.status === 200) {
      const data = response.data.data;
      const count = response.data.meta.count;
      return { count, data };
    }

    return { count: undefined, data: [] };
  } catch (error) {
    console.error(error);
    return { count: undefined, data: [] };
  }
};
export default GetAnimeData;
