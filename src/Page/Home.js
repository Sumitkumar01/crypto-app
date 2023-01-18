import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from '../assets/btc.png'
import {motion} from 'framer-motion';

export const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>

    <motion.div style={{height:'80vh'}}
      animate={{translateY:'20px'}}
      transition={{duration:5,
      repeat:Infinity,
      repeatType:'reverse',}}>
      <Image src={btcSrc} w={'full'} h={'full'} objectFit={'contain'} filter={'grayscale(1)'}/>
      </motion.div>
      <Text fontSize={"6xl"} textAlign={'center'}
      fontWeight={'thin'} color={'whiteAlpha.700'} mt={'-20'}> Xcrypto</Text>
    
    </Box>
  )
}