import React from 'react'

import { Box, Flex, Image, Text, useColorMode } from '@chakra-ui/core'
import styled from '@emotion/styled'

import { Heading } from '../../../../core/components'

const BorderedCard = styled(Box)`
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
`

const WidthImage = styled(Image)`
  width: 100%;
`

const Component: React.FC = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex justifyContent='center'>
      <BorderedCard
        width={[20 / 24, 16 / 24, 12 / 24, 8 / 24]}
        bg={colorMode === 'dark' ? 'gray.700' : undefined}>
        <WidthImage
          m={0}
          src='https://media.giphy.com/media/14rivMbeyNnqXS/giphy.gif'
        />
        <Box p={3}>
          <Heading size='lg'>Failed</Heading>
          <Text fontSize={[14, 15]} pt={2} color='gray.500'>
            I cannot find your hentai for this time (may be it's not exist)
          </Text>
          <Text fontSize={[14, 15]} color='gray.500' pt={2}>
            Sorry... (*_ _)人
          </Text>
        </Box>
      </BorderedCard>
    </Flex>
  )
}

export const Failed = React.memo(Component)
