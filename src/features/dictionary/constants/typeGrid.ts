import DBFS from '@/assets/image/DBFS.webp';
import DBFV from '@/assets/image/DBFV.webp';
import DBPS from '@/assets/image/DBPS.webp';
import DBPV from '@/assets/image/DBPV.webp';
import DCFS from '@/assets/image/DCFS.webp';
import DCFV from '@/assets/image/DCFV.webp';
import DCPS from '@/assets/image/DCPS.webp';
import DCPV from '@/assets/image/DCPV.webp';
import GBFS from '@/assets/image/GBFS.webp';
import GBFV from '@/assets/image/GBFV.webp';
import GBPS from '@/assets/image/GBPS.webp';
import GBPV from '@/assets/image/GBPV.webp';
import GCFS from '@/assets/image/GCFS.webp';
import GCFV from '@/assets/image/GCFV.webp';
import GCPS from '@/assets/image/GCPS.webp';
import GCPV from '@/assets/image/GCPV.webp';

const types = [
  'GBFS',
  'GBFV',
  'GBPS',
  'GBPV',
  'GCFS',
  'GCFV',
  'GCPS',
  'GCPV',
  'DBFS',
  'DBFV',
  'DBPS',
  'DBPV',
  'DCFS',
  'DCFV',
  'DCPS',
  'DCPV',
] as const;

const characterImages = {
  DBFS,
  DBFV,
  DBPS,
  DBPV,
  DCFS,
  DCFV,
  DCPS,
  DCPV,
  GBFS,
  GBFV,
  GBPS,
  GBPV,
  GCFS,
  GCFV,
  GCPS,
  GCPV,
} as const;

const axisLabels: Record<string, string> = {
  G: '성장형',
  D: '쇠퇴형',
  B: '균형형',
  C: '편중형',
  F: '빈도형',
  P: '객단가형',
  S: '안정형',
  V: '변동형',
};

const typeDetails: Record<(typeof types)[number], { name: string; description: string }> = {
  GBFS: {
    name: '안정 성장형',
    description: '재방문형 생활 업종에 유리한 안정 성장 상권',
  },
  GBFV: {
    name: '계절 수요 변동형',
    description: '유동은 좋지만 성수기, 비수기 대응이 필요',
  },
  GBPS: {
    name: '프리미엄 성장형',
    description: '객단가가 높은 프리미엄 매장으로 확장할 모델을 검토할 만함',
  },
  GBPV: {
    name: '겉바속망형',
    description: '매출은 좋아 보여도 고액 소비 변동에 취약',
  },
  GCFS: {
    name: '단골 고착형',
    description: '단골의 반복 구매로 성장하지만, 고객층이 고정되어 확장성 약함',
  },
  GCFV: {
    name: '인플루언서 원툴형',
    description: '유행에는 강하지만 트렌드 변화에 빠르게 흔들림',
  },
  GCPS: {
    name: '프리미엄 성채형',
    description: '소수 고객의 높은 지출이 뒷받침하는 고급 상권',
  },
  GCPV: {
    name: '한방 핫플형',
    description: '대박 가능성은 크지만 고정비가 큰 창업은 위험',
  },
  DBFS: {
    name: '조용한 침몰형',
    description: '급락은 없지만 일상 소비 기반이 서서히 약화',
  },
  DBFV: {
    name: '수요 이탈형',
    description: '방문 수가 줄고 있어 단기 매출 방어도 어려움',
  },
  DBPS: {
    name: '소수 큰손 의존형',
    description: '이용자는 줄었지만 소수 고객의 고액 지출로 버티는 상태',
  },
  DBPV: {
    name: '가격 거품 경보형',
    description: '고액 소비마저 불안정해 매출 방어력이 낮음',
  },
  DCFS: {
    name: '단골 소진형',
    description: '좁은 단골층은 있으나 신규 고객 유입이 약함',
  },
  DCFV: {
    name: '유행 먹튀형',
    description: '특정 고객의 유행성 방문이 빠져나가는 단계',
  },
  DCPS: {
    name: '단골 인질형',
    description: '소수 단골의 고액 지출에 생존이 묶여 있음',
  },
  DCPV: {
    name: '한 방 붕괴형',
    description: '가장 높은 소비력을 잃어 신규 진입보다 회피, 전환 권고',
  },
};

export const marketTypes = types.map((type) => {
  const axes = [...type].map((axis) => ({ axis, label: axisLabels[axis] }));

  return {
    type,
    imageSrc: characterImages[type],
    axes,
    ...typeDetails[type],
  };
});
