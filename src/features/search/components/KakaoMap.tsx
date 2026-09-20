'use client';

import { useEffect, useState } from 'react';
import { Map, Polygon, useKakaoLoader } from 'react-kakao-maps-sdk';

interface BoundaryPoint {
  lat: number;
  lng: number;
}

interface DistrictBoundaryResponse {
  districtName: string;
  polygons: BoundaryPoint[][][];
}

interface KakaoMapProps {
  address?: string;
  showBoundary?: boolean;
}

const KakaoMap = ({ address = '서울특별시 강남구', showBoundary = false }: KakaoMapProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_KAKAO_MAP_KEY!,
    libraries: ['services'],
  });
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [boundary, setBoundary] = useState<DistrictBoundaryResponse | null>(null);
  const [boundaryError, setBoundaryError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    // Boundary codes verified for the initial mock districts.
    const admCd =
      address === '서울특별시 강남구' ? '11230' : address === '서울특별시 구로구' ? '11170' : null;
    if (!admCd) return () => controller.abort();

    const loadBoundary = async () => {
      try {
        const response = await fetch(`/api/district-boundary?admCd=${admCd}&year=2025`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as DistrictBoundaryResponse & { message?: string };

        if (!response.ok) throw new Error(data.message || '경계를 불러오지 못했습니다.');
        setBoundary(data);
      } catch (fetchError) {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return;
        setBoundaryError(
          fetchError instanceof Error ? fetchError.message : '경계를 불러오지 못했습니다.',
        );
      }
    };

    void loadBoundary();
    return () => controller.abort();
  }, [address]);

  useEffect(() => {
    if (!map || boundary) return;
    let cancelled = false;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (results, status) => {
      if (cancelled || status !== kakao.maps.services.Status.OK || !results[0]) return;
      map.setCenter(new kakao.maps.LatLng(Number(results[0].y), Number(results[0].x)));
      map.setLevel(address.includes(' ') ? 7 : 10);
    });
    return () => {
      cancelled = true;
    };
  }, [address, boundary, map]);

  useEffect(() => {
    if (!map || !boundary) return;

    const bounds = new kakao.maps.LatLngBounds();
    boundary.polygons.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach(({ lat, lng }) => bounds.extend(new kakao.maps.LatLng(lat, lng)));
      });
    });
    map.setBounds(bounds);
  }, [boundary, map]);

  if (error) {
    return (
      <div className='flex h-full items-center justify-center rounded-xl bg-neutral-100'>
        지도를 불러오지 못했습니다.
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center rounded-xl bg-neutral-100'>
        지도를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <div className='relative min-h-150 overflow-hidden rounded-xl bg-neutral-100'>
      <Map
        center={{ lat: 37.5172, lng: 127.0473 }}
        level={7}
        onCreate={setMap}
        className='absolute inset-0 h-full w-full'
      >
        {showBoundary &&
          boundary?.polygons.map((polygon, index) => (
            <Polygon
              key={`${boundary.districtName}-${index}`}
              path={polygon}
              strokeWeight={2}
              strokeColor='#FF3B30'
              strokeOpacity={1}
              fillColor='#FF6B6B'
              fillOpacity={0.28}
            />
          ))}
      </Map>
      {showBoundary && boundaryError && (
        <p className='absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-white px-4 py-3 text-semantic-800 shadow typo-caption-2'>
          {boundaryError}
        </p>
      )}
    </div>
  );
};

export default KakaoMap;
