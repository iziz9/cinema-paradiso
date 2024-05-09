import { notify } from '../components/layout/Toast'
import { ADMIN_ID } from '../constants/defaultValues'
import { ICreateWatchListResponse } from '../types/types'
import axiosInstance from './axiosInstance'

const DEFAULT_OPTION = { language: 'ko' }

export const getAllUsersLists = async (page: number) => {
  return await axiosInstance
    .get(`account/${ADMIN_ID}/lists`, {
      params: { page }
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return notify({ type: 'error', text: '관심목록 데이터 조회에 실패했습니다.' })
    })
}

export const postMakePersonalList = async (name: string) => {
  return await axiosInstance
    .post<ICreateWatchListResponse>('list', {
      ...DEFAULT_OPTION,
      name,
      description: ''
    })
    .then((res) => {
      return res.data.list_id
    })
    .catch((err) => {
      return notify({ type: 'error', text: '관심목록 생성에 실패했습니다.' })
    })
}

export const getPersonalList = async (list_id: number, page: number) => {
  return await axiosInstance
    .get(`list/${list_id}`, {
      params: { ...DEFAULT_OPTION, page }
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return notify({ type: 'error', text: '관심영화 리스트를 불러올 수 없습니다.' })
    })
}

export const postAddMovie = async (list_id: number, media_id: number) => {
  return await axiosInstance
    .post(`list/${list_id}/add_item`, {
      media_id
    })
    .then((res) => {
      notify({ type: 'success', text: '관심 목록에 추가되었습니다.' })
      return res.data
    })
    .catch((err) => {
      return notify({ type: 'error', text: '관심 목록 추가에 실패했습니다. 다시 시도해주세요.' })
    })
}

export const postRemoveMovie = async (list_id: number, media_id: number) => {
  return await axiosInstance
    .post(`list/${list_id}/remove_item`, {
      media_id
    })
    .then((res) => {
      notify({ type: 'success', text: '관심 목록에서 삭제되었습니다.' })
      return res.data
    })
    .catch((err) => {
      notify({ type: 'error', text: '관심 목록 삭제에 실패했습니다. 다시 시도해주세요.' })
    })
}

export const getMovieIncludingStatus = async (list_id: number, movie_id: number) => {
  return await axiosInstance
    .get(`list/${list_id}/item_status`, {
      params: { ...DEFAULT_OPTION, movie_id }
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return alert('관심 정보 확인에 실패했습니다.')
    })
}
