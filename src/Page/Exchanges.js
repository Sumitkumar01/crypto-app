import { Container, HStack, VStack, Image, Heading,Text } from '@chakra-ui/react';
import  axios  from 'axios'
import React,{useEffect,useState} from 'react'
import { server } from '../index';
import { ErrorComponent } from '../components/ErrorComponent';
import {Loader} from '../components/Loader';

export const Exchanges = () => {
    const [exchanges,setExchanges] = useState([]);
    const [loding,setLoding] = useState(true);
    const [error,setError] = useState(false);

 
    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const {data} = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoding(false);
            } catch (error) {
                setError(true);
                setLoding(false);
            }
        }
        fetchExchanges();
      
    }, []);
    if (error) return <ErrorComponent message={"Error While fetching Exchange"}/>
    return (<Container maxW={'container.xl'}>
        {loding? <Loader />:(<>
            <HStack wrap={'wrap'} justifyContent='space-evenly'>
                {exchanges.map(i => (
                    <ExchangeCard
                        key={i.id}
                        name={i.name}
                        img={i.image}
                        rank={i.trust_score_rank}
                        url={i.url}
                    />
                ))}
            </HStack>
        </>)}
    </Container> );
  
}
const ExchangeCard = ({name,img,rank,url}) => (
    <a href={url} target={'blank'} >
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'}
        transition={'all 0.3s'} m={'4'} css={{'&:hover':{
            transform:'scale(1.1)'
        }}}>
            <Image src={img} w={'10'} h={'10'} 
            objectFit={'contain'} alt={'Exchange'}
        />
        <Heading size={'md'} noOfLines={1}>
            {rank}
        </Heading>
        <Text noOfLines={1}>
            {name}
        </Text>
        </VStack>
    </a>
);
