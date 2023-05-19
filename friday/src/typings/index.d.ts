
declare interface Res<T> {
  code: number,
  data: T
}

declare interface HotItem {
  rankNo: string,
  url: string,
  title: string,
  hot: string
}

declare interface HotTop {
  cacheKey: string,
  title: string,
  barTitle: string,
  logoImg: string,
  time: string,
  hotList: Array<HotItem>
}

declare type HotTopRes = Res<Array<HotTop>>

declare interface Word {
  words: string
}
declare interface BaiduOcr {
  // eslint-disable-next-line camelcase
  words_result: Array<Word>
}

declare type BaiduOcrRes = Res<BaiduOcr>

declare interface PaddleOcr {
  results: Array<Array<{text: string}>>
}

declare type PaddleOcrRes = Res<PaddleOcr>
