import { Badge, HStack, Progress, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const CustomBar = ({high,low}) => (
    <VStack w={'full'}>
      <Progress value={50} justifyContent={'space-between'} colorScheme={'teal'} w={'full'} />
      <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme={'red'}/>
        <Text fontSize={'sm'}>24H Range</Text>
        <Badge children={high} colorScheme={'green'}/>
      </HStack>
    </VStack>
  )