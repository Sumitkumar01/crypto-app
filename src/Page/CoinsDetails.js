import { 
  Badge,
   Box, 
   Button, 
   Container, 
   HStack, 
   Image, 
   Radio, 
   RadioGroup, 
   Stat, 
   StatArrow, 
   StatHelpText, 
   StatLabel, 
   StatNumber, 
   Text, 
   VStack } from '@chakra-ui/react'
import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import { server } from '../index';
import { ErrorComponent } from '../components/ErrorComponent';
import { Loader } from '../components/Loader';
import { Chart } from '../components/Chart';
import { CustomBar } from '../components/CustomBar';
import { Item } from '../components/Item';

export const CoinsDetails = () => {
    const params = useParams();

    const [coin,setCoin] = useState([]);
    const [loding,setLoding] = useState(true);
    const [error,setError] = useState(false);
    const [currency,setCurrency] = useState('inr');
    const [days,setDays] = useState("24h");
    const [chartArry, setChartArry] = useState([]);

    const currencySymbol = currency==='inr'?'₹':currency==='eur'?'€':'$';
    const btns = ['24h','7d','14d','30d','2m','3m','1y','max'];

    const switchChartStats = (key) => {
      switch (key) {
        case '24h':
          setDays('24h');
          setLoding(true);
          break;
          case '7d':
          setDays('7d');
          setLoding(true);
          break;
          case '14d':
          setDays('14d');
          setLoding(true);
          break;
          case '30d':
          setDays('30d');
          setLoding(true);
          break;
          case '2m':
          setDays('60d');
          setLoding(true);
          break;
          case '200d':
          setDays('200d');
          setLoding(true);
          break;
          case '1y':
          setDays('365d');
          setLoding(true);
          break;
          case 'max':
          setDays('max');
          setLoding(true);
          break;
        default:
          setDays('24h');
          setLoding(true)
          break;
      }
    }

    useEffect(() => {
      const fetchCoin = async () => {
          try {
              const {data} = await axios.get(`${server}/coins/${params.id}`);
              // console.log(data);
              const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
              setChartArry(chartData.prices);
              setCoin(data);
              setLoding(false);
          } catch (error) {
              setError(true);
              setLoding(false);
          }
      }
      fetchCoin();
    
  }, [params.id,currency,days]);

  if (error) return <ErrorComponent message={"Error While fetching Coins"}/>

  return (
    <Container maxW={'container.xl'}>
      {loding?<Loader/>:(
        <>
          <Box borderWidth={1} w='full'>
            <Chart arr={chartArry} currency={currencySymbol} days={days}/>
          </Box>

          <HStack p='4' overflow={'auto'}>
            {btns.map((i)=>(
              <Button key={i} onClick={()=> switchChartStats(i)}>{i}
              </Button>
            ))}
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency}>
                <HStack spacing={'4'}>
                    <Radio value='inr'>₹ INR</Radio>
                    <Radio value='usd'>$ USD</Radio>
                    <Radio value='eur'>€ EUR</Radio>
                </HStack>
            </RadioGroup>
            <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
              <Text fontSize={'small'} alignSelf='center' opacity={0.7}>
                Last Updated on{' '} {Date(coin.market_data.last_updated).split('G')[0]}
              </Text>
              <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}/>
              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ?'increase':'decrease'} />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>

              <Badge fontSize={'2x1'}
               bgColor={'blackAlpha.800'} color='white'>{`#${coin.market_cap_rank}`}</Badge>
               <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
               low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}/>
            </VStack>
            <Box w={'full'} p='4'>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                />
                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                />
            </Box>
        </>
      )}
    </Container>
  )
}
