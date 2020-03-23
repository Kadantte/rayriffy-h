import { fetch } from '../../../../core/services/functions'

import { IAPIResponse } from '../../../../core/@types/IAPIResponse'
import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'
import { IHentai } from '../../../../core/@types/IHentai'

export const getHentai = async (id: number | string): Promise<IFetchedRaw> => {
  try {
    const out = await fetch<IAPIResponse<IHentai>>(
      `https://h.api.rayriffy.com/v1/gallery/${id}`
    )

    return {
      status: 'success',
      data: {
        hentai_id: Number(id),
        exclude: [],
        raw: out.response.data,
      },
    }
  } catch (e) {
    throw e
  }
}
