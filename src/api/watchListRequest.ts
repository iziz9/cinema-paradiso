import { ADMIN_ID, DEFAULT_OPTION } from '../constants/defaultValues'
import { ICreateWatchListResponse } from '../types/types'
import axiosInstance from './axiosInstance'

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
