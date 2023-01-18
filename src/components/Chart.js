import React from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS ,
     CategoryScale,
      LinearScale,
      LineElement,
       PointElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


export const Chart = ({arr=[],currency,days}) => {
  
  const price=[];
  const date=[];
  for (let index = 0; index < arr.length; index++) {
    if (days==='24h') date.push(new Date(arr[index][0]).toLocaleTimeString());
    
    else date.push(new Date(arr[index][0]).toLocaleDateString());
    price.push(arr[index][1])
    
  }
  
    return (
    <Line
        options={{responsive:true}}
        data={{
            labels:date,
            datasets:[{
                label:`Price in ${currency}`,
                data: price,
                backgroundColor: 'rgba(255,99,132,0.5)',
                borderColor:'rgb(255,99,132)'
            }]
        }}/>
  )
}
