'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useAtomValue } from 'jotai';
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js';
import { monthlyConsumption } from '../../mocks/resultData';
import VolatilityAlert from './VolatilityAlert';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
} from '@/features/main/atoms/selectionAtoms';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

interface ConsumeGraphProps {
  data?: { month: number; day: number; score: number }[];
  warningMonth?: number | null;
  warningDay?: number;
}

const ConsumeGraph = ({
  data = monthlyConsumption,
  warningMonth = 5,
  warningDay = 1,
}: ConsumeGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const selectedRegion = useAtomValue(selectedRegionAtom);
  const selectedDistrict = useAtomValue(selectedDistrictAtom);
  const selectedIndustry = useAtomValue(selectedIndustryAtom);
  const values = useMemo(
    () =>
      data
        .filter(
          (item) =>
            Number.isFinite(item.score) &&
            item.month >= 1 &&
            item.month <= 6 &&
            (item.month < 6 || item.day === 1),
        )
        .toSorted((a, b) => a.month - b.month || a.day - b.day),
    [data],
  );
  const warningIndex = values.findIndex(
    (item) => item.month === warningMonth && item.day === warningDay,
  );

  useEffect(() => {
    if (!canvasRef.current || values.length === 0) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels: values.map((item) => item.month + '월 ' + item.day + '일'),
        datasets: [
          {
            data: values.map((item) => item.score),
            borderColor: '#5db692',
            backgroundColor: '#5db692',
            borderWidth: 2,
            pointRadius: (context) => (values[context.dataIndex].day === 1 ? 3 : 0),
            pointHoverRadius: (context) => (values[context.dataIndex].day === 1 ? 4 : 0),
            pointHitRadius: (context) => (values[context.dataIndex].day === 1 ? 4 : 0),
            cubicInterpolationMode: 'monotone',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: { padding: { top: 12, right: 12 } },
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            offset: false,
            grid: { display: false },
            border: { display: false },
            ticks: {
              autoSkip: false,
              maxRotation: 0,
              color: '#7A8092',
              font: { size: 13 },
              callback: (_, index) => (values[index].day === 1 ? values[index].month + '월' : ''),
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: 200,
            border: { display: false },
            grid: { color: '#e8eaec' },
            ticks: { maxTicksLimit: 5, padding: 12, color: '#7A8092', font: { size: 13 } },
          },
        },
      },
      plugins: [
        {
          id: 'fixed-volatility-alert',
          afterDraw: (instance) => {
            const alert = alertRef.current;
            const point = instance.getDatasetMeta(0).data[warningIndex];
            if (!alert || !point) return;
            alert.style.visibility = 'visible';
            alert.style.left = point.x + 'px';
            alert.style.top = point.y + 'px';
            alert.style.setProperty(
              '--label-left',
              Math.max(0, Math.min(point.x - 40, instance.width - 80)) - point.x + 'px',
            );
            alert.style.setProperty(
              '--label-top',
              point.y > instance.chartArea.bottom - 46 ? '-42px' : '18px',
            );
          },
        },
      ],
    });
    return () => chart.destroy();
  }, [values, warningIndex]);

  return (
    <section className='flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-neutral-400 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] py-4 pl-1 pr-4'>
      <h1 className='text-black typo-subtitle-1 px-3'>
        {selectedRegion} {selectedDistrict} · {selectedIndustry} 소비 흐름
      </h1>

      {values.length === 0 ? (
        <p className='flex min-h-40 flex-1 items-center justify-center typo-caption-3 text-neutral-800'>
          표시할 소비 데이터가 없습니다.
        </p>
      ) : (
        <div className='relative min-h-40 flex-1'>
          <div className='absolute inset-0'>
            <canvas
              ref={canvasRef}
              role='img'
              aria-label={
                '월초·15일 소비 흐름. ' +
                values
                  .map((item) => item.month + '월 ' + item.day + '일 ' + item.score + '점')
                  .join(', ')
              }
            />
          </div>
          {warningIndex >= 0 && (
            <VolatilityAlert
              ref={alertRef}
              month={values[warningIndex].month}
              day={values[warningIndex].day}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default ConsumeGraph;
