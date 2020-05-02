/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction, useState } from 'react'

import { useLocalStorage } from 'web-api-hooks'

import { Collection as CollectionInterface, Settings as SettingsInterface } from '../core/@types'

type SettingsContext = [SettingsInterface, Dispatch<SetStateAction<SettingsInterface>>]
type ISubtitle = [string, Dispatch<SetStateAction<string>>]
type CollectionContext = [CollectionInterface, Dispatch<SetStateAction<CollectionInterface>>]

export const Settings = React.createContext<SettingsContext>([
  {
    safemode: true,
  },
  () => {},
])
export const Subtitle = React.createContext<ISubtitle>(['init', () => {}])
export const Collection = React.createContext<CollectionContext>([
  { version: 0, data: [] },
  () => {},
])

export const Context: React.FC = props => {
  const { children } = props

  // Safe mode
  const [settings, setSettings] = useLocalStorage<{
    safemode: boolean
  }>('settings', {
    safemode: true,
  })

  // Subtitle
  const [subtitle, setSubtitle] = useState<string>('init')

  // Collection
  const [collection, setCollection] = useLocalStorage<{
    version: number
    data: {
      id: number | string
      internal: boolean
      data: {
        id: number
        media_id: string
        title: {
          english: string
          japanese: string
          pretty: string
        }
        images: {
          cover: {
            t: 'j' | 'p'
            w: number
            h: number
          }
          pages: {
            t: 'j' | 'p'
            w: number
            h: number
          }[]
        }
        tags: {
          id: number
          type:
            | 'parody'
            | 'tag'
            | 'language'
            | 'character'
            | 'group'
            | 'artist'
            | 'category'
          name: string
        }[]
      }
    }[]
  }>('collection', {
    version: 1,
    data: [],
  })

  return (
    <Settings.Provider value={[settings, setSettings]}>
      <Subtitle.Provider value={[subtitle, setSubtitle]}>
        <Collection.Provider value={[collection, setCollection]}>
          {children}
        </Collection.Provider>
      </Subtitle.Provider>
    </Settings.Provider>
  )
}
