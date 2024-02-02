import { IHasPageResponse } from '../types/types'

interface IGetAllPageDatas {
  request: (page: number) => Promise<any>
  totalPages: number
  setAllDataList: (value: React.SetStateAction<any>) => void
}

export const getAllPageDatas = async ({ request, totalPages, setAllDataList }: IGetAllPageDatas) => {
  const requestArray = []
  for (let i = 2; i <= totalPages; i += 1) {
    requestArray.push(request(i))
  }
  Promise.all(requestArray).then((res: IHasPageResponse[]) => {
    const allPageRes = res
      .map((res) => res.results)
      .reduce((acc, cur) => {
        return [...acc, ...cur]
      }, [])
    setAllDataList((prev: any) => [...prev, ...allPageRes])
  })
}
