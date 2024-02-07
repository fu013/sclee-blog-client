### Pal-world API를 활용한 팰월드 백과사전 및 개인 블로그 제작하기

버전정보
node: 20.0.0
Front-end: Next 13.5.4
Back-end: Spring 3.2

- Tailwind CSS IntelliSense - tailwind를 통한 css 작업을 도와주는 extension

- Board 쪽에 태그 붙이기
- 우아한 형제들처럼 그림보다는 이쁜 글씨 위주로(매번 썸넬 그림 선정하느라 블로그 글 올리는게 귀찮아질 수 있음)

- data fetch, api call => page
- 각 컴포넌트로 전달
- 페이지에 html은 쓰지 않고 컴포넌트로 분리해서 최종 결과물만 controller와 비슷한 역할로, 컴포넌트로 파라미터만 전달함

Stack
frontend: typescript, nextjs, tailwind
backend: java, spring, jpa
deploy: docker, jenkins, Home-server

태그 조회 SQL(테이블을 따로 태그로 파서 관리할까 생각했는데, 조인도 필요하고, 쿼리로 사용해서 하는게 특별히 중복검사를 못하는 상황도 안나와서, 단순한 테이블 구조로 가져가되, 쿼리를 복잡하게 쓰는편이 효율이 좋다고 생각했음)

<!-- SELECT *
FROM post
WHERE FIND_IN_SET('ci-cd', REPLACE(tags, ', ', ',')) > 0; -->
