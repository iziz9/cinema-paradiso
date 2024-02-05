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
      return alert(err)
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
      return alert(err)
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
      return alert('관심 영화 리스트를 불러올 수 없습니다.')
    })
}

export const postAddMovie = async (list_id: number, media_id: number) => {
  return await axiosInstance
    .post(`list/${list_id}/add_item`, {
      media_id
    })
    .then((res) => {
      return res.data
    })
}

export const postRemoveMovie = async (list_id: number, media_id: number) => {
  return await axiosInstance
    .post(`list/${list_id}/remove_item`, {
      media_id
    })
    .then((res) => {
      return res.data
    })
}

export const checkMovieStatus = async (list_id: number, movie_id: number) => {
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
