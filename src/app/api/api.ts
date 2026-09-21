import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  console.error(
    '[axiosInstance] NEXT_PUBLIC_API_URL 이 설정되어 있지 않습니다. .env.local 을 확인하세요.',
  );
}

// 인스턴스 정의
export const axiosInstance = axios.create({
  baseURL,
});
