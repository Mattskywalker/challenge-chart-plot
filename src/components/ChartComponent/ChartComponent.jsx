import React from 'react'
import { Chart } from "react-google-charts";

import './ChartComponent.css';

export default function ChartComponent({chartData}) {
	
    return (
        <div className='ChartComponent'>
			
			{
				chartData.rows.length > 0 &&
				<div className='ChartContainer'>
					<Chart
					className='Chart'
					chartType="Line"
					width='100%'
					height='100%'
					data={[chartData.columns, ...chartData.rows]}
					/>
				</div>
			}
			
        </div>
    )
}
