import { NextRequest, NextResponse } from 'next/server';
import proj4 from 'proj4';

const SGIS_AUTH_URL = 'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json';
const SGIS_BOUNDARY_URL = 'https://sgisapi.kostat.go.kr/OpenAPI3/boundary/hadmarea.geojson';
const EPSG_5179 =
  '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';
const WGS84 = 'EPSG:4326';
const SGIS_ADDRESS_URL = 'https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json';
const regionAliases: Record<string, string> = {
  강원특별자치도: '강원도',
  전북특별자치도: '전라북도',
};
const boundaryCache = new Map<string, { expiresAt: number; data: SgisBoundaryResponse }>();
let regionCache: { expiresAt: number; data: Array<{ cd: string; addr_name: string }> } | null =
  null;

type SgisPosition = [number, number];
type SgisPolygon = SgisPosition[][];
type SgisMultiPolygon = SgisPosition[][][];

interface SgisAuthResponse {
  errCd: number;
  errMsg: string;
  result?: {
    accessToken: string;
    accessTimeout: string;
  };
}

interface SgisBoundaryResponse {
  errCd: number;
  errMsg: string;
  features?: Array<{
    geometry:
      | { type: 'Polygon'; coordinates: SgisPolygon }
      | { type: 'MultiPolygon'; coordinates: SgisMultiPolygon };
    properties: {
      adm_cd: string;
      adm_nm: string;
    };
  }>;
}

let cachedAccessToken: { value: string; expiresAt: number } | null = null;
let accessTokenRequest: Promise<string> | null = null;

const getSgisAccessToken = async () => {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.value;
  }

  if (accessTokenRequest) return accessTokenRequest;

  accessTokenRequest = (async () => {
    const consumerKey = process.env.SGIS_CONSUMER_KEY;
    const consumerSecret = process.env.SGIS_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      throw new Error('SGIS 환경변수가 설정되지 않았습니다.');
    }

    const url = new URL(SGIS_AUTH_URL);
    url.searchParams.set('consumer_key', consumerKey);
    url.searchParams.set('consumer_secret', consumerSecret);

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('SGIS 인증 요청에 실패했습니다.');

    const data = (await response.json()) as SgisAuthResponse;
    if (data.errCd !== 0 || !data.result) {
      throw new Error(data.errMsg || 'SGIS 인증에 실패했습니다.');
    }

    cachedAccessToken = {
      value: data.result.accessToken,
      expiresAt: Number(data.result.accessTimeout),
    };

    return cachedAccessToken.value;
  })();

  try {
    return await accessTokenRequest;
  } finally {
    accessTokenRequest = null;
  }
};

const convertPosition = ([x, y]: SgisPosition) => {
  const [lng, lat] = proj4(EPSG_5179, WGS84, [x, y]);
  return { lat, lng };
};

export const GET = async (request: NextRequest) => {
  const region = request.nextUrl.searchParams.get('region');
  const district = request.nextUrl.searchParams.get('district') ?? '';
  let admCd = request.nextUrl.searchParams.get('admCd') ?? '';
  const year = request.nextUrl.searchParams.get('year') ?? '2025';

  if (
    !/^\d{4}$/.test(year) ||
    (region
      ? region.length > 30 || district.length > 30
      : !/^\d{2,8}$/.test(admCd))
  ) {
    return NextResponse.json(
      { message: '행정구역 코드 또는 기준연도가 올바르지 않습니다.' },
      { status: 400 },
    );
  }

  try {
    const accessToken = await getSgisAccessToken();
    if (region) {
      if (!regionCache || regionCache.expiresAt <= Date.now()) {
        const addressUrl = new URL(SGIS_ADDRESS_URL);
        addressUrl.searchParams.set('accessToken', accessToken);
        addressUrl.searchParams.set('pg_yn', '0');
        const response = await fetch(addressUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error('행정구역 목록을 불러오지 못했습니다.');
        const addresses = (await response.json()) as {
          errCd: number;
          result?: Array<{ cd: string; addr_name: string }>;
        };
        if (addresses.errCd !== 0 || !addresses.result)
          throw new Error('행정구역 목록을 불러오지 못했습니다.');
        regionCache = { data: addresses.result, expiresAt: Date.now() + 86_400_000 };
      }
      const matched = regionCache.data.find(
        (item) => item.addr_name === region || item.addr_name === regionAliases[region],
      );
      if (!matched)
        return NextResponse.json(
          { message: '해당 지역의 경계 정보를 제공하지 않습니다.' },
          { status: 404 },
        );
      admCd = matched.cd;
    }
    const lowSearch = region && district && district !== region ? '1' : '0';
    const url = new URL(SGIS_BOUNDARY_URL);
    url.searchParams.set('accessToken', accessToken);
    url.searchParams.set('year', year);
    url.searchParams.set('adm_cd', admCd);
    url.searchParams.set('low_search', lowSearch);

    const cacheKey = `${year}:${admCd}:${lowSearch}`;
    const cached = boundaryCache.get(cacheKey);
    let data = cached && cached.expiresAt > Date.now() ? cached.data : null;
    if (!data) {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('SGIS 경계 요청에 실패했습니다.');
      data = (await response.json()) as SgisBoundaryResponse;
      if (data.errCd !== 0 || !data.features?.length)
        throw new Error(data.errMsg || '행정구역 경계를 찾지 못했습니다.');
      if (boundaryCache.size >= 40) boundaryCache.delete(boundaryCache.keys().next().value!);
      boundaryCache.set(cacheKey, { data, expiresAt: Date.now() + 86_400_000 });
    }

    // Match within the selected province, and include all constituent wards of a city.
    const features =
      data.features?.filter((feature) => {
        if (!region || !district || district === region) return true;
        const name = feature.properties.adm_nm
          .replace(new RegExp(`^(${region}|${regionAliases[region] ?? region})\\s*`), '')
          .trim();
        return name === district || name.startsWith(`${district} `);
      }) ?? [];
    if (!features.length)
      return NextResponse.json(
        {
          message: `${year}년 기준 ${region} ${district}의 경계 정보를 제공하지 않습니다.`,
        },
        { status: 404 },
      );
    const sourcePolygons: SgisMultiPolygon = features.flatMap((feature) =>
      feature.geometry.type === 'Polygon'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates,
    );
    const polygons = sourcePolygons.map((polygon) =>
      polygon.map((ring) => ring.map(convertPosition)),
    );

    return NextResponse.json({
      admCd: features.map((feature) => feature.properties.adm_cd).join(','),
      districtName: region
        ? [region, district !== region ? district : ''].filter(Boolean).join(' ')
        : features[0].properties.adm_nm,
      polygons,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '행정구역 경계를 불러오지 못했습니다.';
    return NextResponse.json({ message }, { status: 502 });
  }
};
