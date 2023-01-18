import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

export const Loader = () => {
  return (
    <div>
        <VStack h='90vh' justifyContent={'center'}>
            <Box transform={'scale(3)'}>
                <Spinner size={'md'}/>
            </Box>
        </VStack>
    </div>
  )
}
