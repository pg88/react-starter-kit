import axios from 'axios';
import googleKeys from "./google_api_keys"

export default axios.create({
  baseURL: `https://www.googleapis.com/customsearch/v1?key${googleKeys.googleCustomSearch.API_KEY}&cx=${googleKeys.googleCustomSearch.CX}`
});
