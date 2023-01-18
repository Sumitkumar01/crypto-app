import { HStack, Text } from '@chakra-ui/react';
import React from 'react'

export const Item = ({title,value}) => (
  <HStack justify={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>
      {title}
    </Text>
    <Text>
      {value}
    </Text>
  </HStack>
);