import axiosInstance from './axiosInstance'

//게스트 세션 생성 (생성 후 60분 이내 요청 없으면 삭제, 일부기능 사용 가능)
export const createGuestSession = async () => {
  return await axiosInstance.get(`authentication/guest_session/new`).then((res) => {
    console.log(res)
    return res
  })
}
// interface ICreateGuestSessionResponse {
//   success: boolean
//   guest_session_id: string
//   expires_at: string
// }

// 로그인 검증에 쓸 토큰 만들기
export const createRequestToken = async () => {
  return axiosInstance.get(`authentication/token/new`).then((res) => {
    console.log(res)
    return res
  })
}

// export const createSessionId = async () => {
//   return await axiosInstance.
// }
