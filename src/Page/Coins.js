import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { server } from '../index';
import { ErrorComponent } from '../components/ErrorComponent';
import {Loader} from '../components/Loader';
import { CoinCard } from '../components/CoinCard';

export const Coins = () => {
    const [coins,setCoins] = useState([]);
    const [loding,setLoding] = useState(true);
    const [error,setError] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState('inr');

    const currencySymbol = currency==='inr'?'₹':currency==='eur'?'€':'$';
    const changePage = (page) => {
        setPage(page);
        setLoding(true);
    }
    const btns = new Array(15).fill(1);
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                setCoins(data);
                setLoding(false);
            } catch (error) {
                setError(true);
                setLoding(false);
            }
        }
        fetchCoins();
      
    }, [currency,page]);
    if (error) return <ErrorComponent message={"Error While fetching Coins"}/>
    return (<Container maxW={'container.xl'}>
        {loding? <Loader />:(<>
            <RadioGroup value={currency} onChange={setCurrency}>
                <HStack spacing={'4'}>
                    <Radio value='inr'>₹ INR</Radio>
                    <Radio value='usd'>$ USD</Radio>
                    <Radio value='eur'>€ EUR</Radio>
                </HStack>
            </RadioGroup>
            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                {coins.map(i => (
                    <CoinCard
                        id={i.id}
                        key={i.id}
                        name={i.name}
                        img={i.image}
                        symbol={i.symbol}
                        price={i.current_price}
                        currencySymbol={currencySymbol}
                    />
                ))}
            </HStack>
            <HStack w={'full'} py={'8'} overflow={'auto'} justifyContent='center'>
                {btns.map((item,i) => (
                    <Button key={i} bgColor={'blackAlpha.900'} color={'white'}
                 onClick={() => changePage(i+1)}>{i+1}</Button>
                ))}
            </HStack>
        </>)}
    </Container> );
  
}

