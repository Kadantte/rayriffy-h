import { Fragment } from 'react'

import { getHentai, Hentai } from '@rayriffy-h/helper'

import { GetServerSideProps, NextPage } from 'next'

import { Reader } from '../../core/components/reader'
import { HeadTitle } from '../../core/components/headTitle'

interface IProps {
  gallery: Hentai
  excludes: number[]
  error?: Error
}

const Page: NextPage<IProps> = props => {
  const { gallery, excludes } = props

  return (
    <Fragment>
      <HeadTitle
        title={gallery.title.pretty}
        description={`Read ${gallery.title.pretty} without ads or popups via Riffy H, an alternate client for nhentai`}
      >
        <meta
          property="og:image"
          content={`https://h.api.rayriffy.com/v1/og/${gallery.id}`}
        />
        <meta
          property="twitter:image"
          content={`https://h.api.rayriffy.com/v1/og/${gallery.id}`}
        />
      </HeadTitle>
      <Reader {...{ hentai: gallery, excludes }} />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<IProps> = async context => {
  const { codes, ignoreList } = await import('@rayriffy-h/datasource')

  try {
    // Find exclude properties
    const targetId = context.params.id as string
    const result = codes.find(o =>
      typeof o === 'number' ? false : o.code.toString() === targetId
    )

    if (ignoreList.map(o => o.toString()).includes(targetId)) {
      return {
        notFound: true,
      }
    }

    const hentai = await getHentai(targetId, false)

    return {
      props: {
        gallery: hentai,
        excludes:
          result !== undefined
            ? typeof result === 'number'
              ? []
              : result.exclude
            : [],
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default Page
