import { IGetAllPageDatas, IHasPageResponse } from '../types/types'

export const getAllPageDatas = async ({ request, totalPages, listId, setAllDataList }: IGetAllPageDatas) => {
  const requestArray = []
  for (let i = 2; i <= totalPages; i += 1) {
    requestArray.push(request(listId, i))
  }
  Promise.all(requestArray).then((res: IHasPageResponse[]) => {
    const allPageRes = res.map((res) => res.items || res.results)
    const reducedAllPageData = allPageRes.reduce((acc, cur) => {
      return [...acc, ...cur]
    }, [])
    setAllDataList((prev: any) => [...prev, ...reducedAllPageData])
  })
}
