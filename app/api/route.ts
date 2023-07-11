import axios from 'axios';

const GetAnimeData = async (page: number, searchTitle?: string, searchCategories?: string) => {
    try {
      // const apiRank = 'https://kitsu.io/api/edge/anime?sort=ratingRank';
      let url = 'https://kitsu.io/api/edge/anime';
      const limit = 20;
      const offset = (page - 1) * 20;
      const sortDefault = 'ratingRank';
      const params: any = {
        'page[limit]': limit,
        'page[offset]': offset,
        'filter[text]': searchTitle || undefined,
        'filter[categories]': searchCategories || undefined,
        'sort': searchTitle || searchCategories ? undefined : sortDefault,
      };
      // NOTE: params that are null or undefined are not rendered in the URL.
      
      const response = await axios.get(url, { params });

      if (response.status === 200) {
        const data = response.data.data;
        const count = response.data.meta.count;
        return { count, data };
      }
    } catch (error) {
      console.error(error);
    }

  }
export default GetAnimeData