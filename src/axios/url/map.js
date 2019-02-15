import api from '../index';
import urls from './url';

const header = {};

export default {
  viewPhotos(params) {
    return api.get(urls.photos, params, header);
  }
};
