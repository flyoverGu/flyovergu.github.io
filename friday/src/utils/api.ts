import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  status: number
}

interface FetchData<T = any> {
  (req: Promise<ResponseData<T>>): Promise<T>;
}

const ch: FetchData = (req) => {
  return req.then(res => {
    if (res.status === 200) {
      return res.data
    }
    throw new Error('request error');
  });
}

export default {
  hotTopList(): Promise<HotTopRes> {
    return ch(axios.get(API_URL + '/api/hotTop/list'));
  },
  uploadPicForOcr(data: any): Promise<BaiduOcrRes> {
    return ch(axios({
      url: API_URL + '/api/ocrPic',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      data
    }))
  },
  uploadPicForOcrPaddle(data: any): Promise<PaddleOcrRes> {
    return ch(axios({
      url: API_URL + '/api/selfOcrPic',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    }));
  }
}
