import React, { useContext, useEffect, useState } from 'react'

import { Box } from 'rebass'

import { Subtitle } from '../../../../app/context'

import Reader from '../../../../core/components/reader'
import Failed from './failed'
import Guide from './guide'
import Loading from './loading'

import { getHentai } from '../services/getHentai'
import { getIdByUrl } from '../services/getIdByUrl'

import { IFetchedRaw } from '../../../../core/@types/IFetchedRaw'
import { IProps } from '../@types/IProps'

const DynamicViewingComponent: React.FC<IProps> = props => {
  const {location} = props

  const [, setSubtitle] = useContext(Subtitle)

  const [state, setState] = useState<number>(1)
  const [raw, setRaw] = useState<IFetchedRaw | null>(null)

  const fetchHentai = async (requestedId: number | string) => {
    setState(1)

    if (setSubtitle) {
      setSubtitle('finding')
    }

    try {
      const data = await getHentai(requestedId)

      setRaw(data)
      setState(0)

      if (setSubtitle) {
        setSubtitle('viewing')
      }
    } catch (e) {
      setState(2)

      if (setSubtitle) {
        setSubtitle('failed')
      }

      throw e
    }
  }

  useEffect(() => {
    const id = getIdByUrl(location.pathname)
    
    if (id !== null) {
      fetchHentai(id)
    } else {
      setState(3)
    }
  }, [])

  return (
    <Box>
      {state === 0 && raw !== null ? (
        <Reader raw={raw} />
      ) : state === 1 && raw === null ? (
        <Box pt={3}>
          <Loading />
        </Box>
      ) : state === 2 ? (
        <Box pt={3}>
          <Failed />
        </Box>
      ) : state === 3 ? (
        <Box pt={3}>
          <Guide />
        </Box>
      ) : null}
    </Box>
  )
}

export default DynamicViewingComponent