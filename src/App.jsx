import React from 'react';
import useDimensions from './Components/useDimensions';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import useFinalData from './Components/useFinalData';
import './App.css';

export default function App() {
  const {height, width} = useDimensions();
  const {data, loading} = useFinalData();
  const { TooltipInPortal } = useTooltipInPortal();
  const xMax = width - 100;
  const yMax = height - 100;
  
  const getMonth = (d) => d.month;
  const getPosts = (d) => d.posts;

  const xScale =
      scaleBand({
        range: [0, xMax],
        domain: data.map(getMonth),
        padding: 0.5,
      });

  const yScale = 
      scaleLinear({
        range: [yMax, 0],
        domain: [0, Math.max(...data.map(getPosts))+1],
      });

  const {
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData
  } = useTooltip();

  const tooltipStyles = {
    fontSize:'30px',
    height:'100%',
    color:'black',
    fontWeight:'bold'
  };

  const topMargin = 25;
  const leftMargin = 30;

  return (
    <div className='centeredDiv'>
      {loading ? 
      <div className='loadingMessage'>
        <h1>Loading...</h1>
      </div>:
      <>
        <h2>Number of posts for every month of 2019</h2>
          <svg width={xMax} height={yMax + 50}>
            <Group top={topMargin} left={leftMargin} >
              {data.map((d) => {
                const month = getMonth(d);
                const barWidth = xScale.bandwidth();
                const barHeight = yMax - (yScale(getPosts(d)) ?? 0);
                const barX = xScale(month);
                const barY = yMax - barHeight;
                return (
                  <Bar
                    key={`bar-${month}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="#2F74C0"
                    onMouseMove={event => {
                      const eventSvgCoords = localPoint(event);
                      showTooltip({
                        tooltipData: <div style={tooltipStyles}>{getPosts(d)} Posts</div>,
                        tooltipTop: eventSvgCoords?.y,
                        tooltipLeft: eventSvgCoords?.x +10
                      });
                    }}
                    onMouseLeave={() => {
                        hideTooltip();
                    }}
                  />
                );
              })}
            </Group>
            <Group top={topMargin} left={leftMargin}>
              <AxisBottom scale={xScale} top={yMax} />
            </Group>
            <Group top={topMargin} left={leftMargin}>
              <AxisLeft scale={yScale}  />
            </Group>
            <TooltipInPortal
                key={Math.random()}
                top={tooltipTop}
                left={tooltipLeft}
              >
                {tooltipData}
          </TooltipInPortal>
        </svg>
      </>}
      </div>
  );
}