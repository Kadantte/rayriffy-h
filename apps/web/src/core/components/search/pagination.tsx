import React from 'react'

import { Box, Flex, Link, theme, useColorMode } from '@chakra-ui/core'
import { styled } from '../../theme/styled'

interface Props {
  max: number
  current: number
  onChange(page: number): void
}

interface Page {
  start: number
  index: number
  current: number
  colorMode: 'light' | 'dark' | undefined
}

const StyledLink = styled(Link)<Page>`
  text-decoration: none;

  ${(props: Page) => {
    const { start, index, current, colorMode } = props

    const themeColor = theme.colors

    if (start + index + 1 === current) {
      return `color: ${
        colorMode === 'dark' ? themeColor.white : themeColor.black
      };`
    } else {
      return `color: ${themeColor.gray[500]};`
    }
  }}
`

const Component: React.FC<Props> = props => {
  const { max, current, onChange } = props

  const { colorMode } = useColorMode()

  const pageLength: number = max > 5 ? 5 : max
  const startPoint: number =
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
        ? max - pageLength
        : current - (pageLength - 2)
      : 0

  return (
    <Flex justifyContent='center'>
      {Array.from({ length: pageLength }, (_, i) => (
        <Box key={`pagination-${startPoint + i}`} px={3}>
          <StyledLink
            href={'#'}
            _hover={{ textDecoration: 'none' }}
            start={startPoint}
            index={i}
            current={current}
            colorMode={colorMode}
            aria-label={`${startPoint + i + 1}`}
            onClick={() => onChange(startPoint + i + 1)}>
            {startPoint + i + 1}
          </StyledLink>
        </Box>
      ))}
    </Flex>
  )
}

export const Pagination = React.memo(Component)
