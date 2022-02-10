import React, { useContext } from 'react';
import TextAreaNumber from '../../components/TextAreaNumber';
import { ChartContext } from '../../contexts/chartContext';
import Footer from '../../components/Footer';
import ChartComponent from '../../components/ChartComponent';
import ResizableContainer from '../../components/ResizableContainer';
import Header from '../../components/Header';

import './Home.css'


export default function Home() {

    const { chartData } = useContext(ChartContext);

    return (
        <div className='Home' >

            <Header text="Mateus' Challenge" />
            <ResizableContainer>
                <TextAreaNumber></TextAreaNumber>
                <ChartComponent className="Chart" chartData={chartData} ></ChartComponent>
            </ResizableContainer>
            <Footer></Footer>
                
        </div>
    )
}
