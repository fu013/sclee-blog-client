/*
 * [SSG] force-store 옵션(Default 옵션이므로 생략 가능)은 빌드 타임에 데이터를 생성한 후, CDN에 캐싱하여 재생성없이 계속해서 재사용한다.
 */
const baseURL = process.env.NEXT_PUBLIC_SERVER_URL as string;

const SSGfetch: typeof fetch = async (endpoint) => {
  const res = await fetch(baseURL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
    cache: "force-cache",
  });
  return res;
};

/*
 * [SSR] no-store 옵션은 캐싱 작업을 하지 않고, 사용자가 요청할때마다, 데이터를 새롭게 불러오도록 설정한다.
 */
const SSRfetch: typeof fetch = async (endpoint) => {
  const res = await fetch(baseURL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  return res;
};

/*
 * [ISR] 설정한 시간마다 페이지를 새로 랜더링한다.
 */
const ISRfetch: typeof fetch = async (endpoint) => {
  const res = await fetch(baseURL + endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 10,
    },
  });
  return res;
};

export { SSGfetch, SSRfetch, ISRfetch };
