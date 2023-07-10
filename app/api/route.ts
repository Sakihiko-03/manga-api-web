import axios from 'axios';

const GetAnimeData = async (page: number, searchTitle?: string, searchCategories?: string) => {
    try {
      // const apiRank = 'https://kitsu.io/api/edge/anime?sort=ratingRank';
      let url = 'https://kitsu.io/api/edge/anime';
      const limit = 20;
      const offset = (page - 1) * 20;
      const sortDefault = 'ratingRank';
      let params: any = {
        'page[limit]': limit,
        'page[offset]': offset,
      };
      
      if (searchTitle !== '') {
        params['filter[text]'] = searchTitle;
        if (searchCategories !== '') {
          params['filter[categories]'] = searchCategories;
        }
      }
  
      else if (searchCategories !== '') {
        params['filter[categories]'] = searchCategories;
        if (searchTitle !== '') {
          params['filter[text]'] = searchTitle;
        }
      }

      else{
        params['sort'] = sortDefault;
      }
      // console.log(params)
      const response = await axios.get(url, { params });

      if (response.status === 200) {
        const data = response.data.data;
        const count = response.data.meta.count;
        return {
            data: data,
            count: count
          };
      }
    } catch (error) {
      console.error(error);
    }

  }
export default GetAnimeData