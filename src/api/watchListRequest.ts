import { ADMIN_ID, DEFAULT_OPTION } from '../constants/defaultValues'
import { ICreateWatchListResponse } from '../types/types'
import axiosInstance from './axiosInstance'

// v 1. getAllUsers로 리스트 받아오기
// v 2. 첫 요청에서 total_pages가 2 이상이면 추가로 전체 페이지 요청 보내기
// v 3. res.results에서 name속성으로 회원정보 검색
// v 4. 없으면 api요청보내서 새로 만들기 (name: 가입자 이메일)
// v 5. 있으면 로컬스토리지에 name이 일치하는 객체의 id값 저장
// v 6. 마이페이지 진입 시 저장해둔 리스트 id를 보내기

export const getAllUsersLists = async (page: number) => {
  return await axiosInstance
    .get(`account/${ADMIN_ID}/lists`, {
      params: { page }
    })
    .then((res) => {
      return res.data
    })
    .catch((err: object) => {
      return alert(err)
    })
}

export const postNewUsersList = async (name: string) => {
  return await axiosInstance
    .post<ICreateWatchListResponse>('list', {
      data: { ...DEFAULT_OPTION, name, description: '' }
    })
    .then((res) => {
      return res.data.list_id
    })
    .catch((err: object) => {
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
    .catch((err: object) => {
      return alert(err)
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
    .catch((err: object) => {
      return alert(err)
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
    .catch((err: object) => {
      return alert(err)
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
    .catch((err: object) => {
      return alert(err)
    })
}
