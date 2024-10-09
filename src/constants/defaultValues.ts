import { IMovieInfo } from '../types/types'

export const POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/w440_and_h660_face'
export const RECOMMEND_LIST_DEFAULT: IMovieInfo[] = []
export const genresId = {
  28: '액션',
  12: '모험',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '공포',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV 영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부'
}
export type genresIdType =
  | 28
  | 12
  | 16
  | 35
  | 80
  | 99
  | 18
  | 10751
  | 14
  | 36
  | 27
  | 10402
  | 9648
  | 10749
  | 878
  | 10770
  | 53
  | 10752
  | 37
export const recommendListTitle = {
  trending: '지금 가장 인기있는 영화',
  topRated: '관객 평점이 가장 높은 영화',
  similar: ' 비슷한 영화',
  genre: '내 취향과 비슷한 영화'
}
export const DETAIL_POSTER_BASE_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
export const BACKGROUND_URL = 'https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces'
export const MAX_CAST_NUMBER = 6
export const ADMIN_ID = String(process.env.REACT_APP_MY_ACCOUNT)
