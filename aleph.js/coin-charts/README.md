# Oui Coin Charts

> Coin Charts Community

## Tech Stacks.

- Aleph.js, React, Deno
- Recoil, React Query
- [React Stockcharts](http://rrag.github.io/react-stockcharts/), [uPlot](https://github.com/leeoniya/uPlot)
- Unocss (twind)
- Deno deploy

## Features

### [`Polygon.io`](https://polygon.io) API에서 원하는 코인 시세 데이터를 가져온다

- [ ] 일별 시세 데이터
- [ ] 클라이언트 요청부터 응답까지 최대 1초 이내
- [ ] Polygon.io API의 무료 계정 call limit은 1분당 60회이므로, 코인 ticker X timespan(day, week, month..)에 따라 DB에 저장하여 사용
- [ ] DB에 저장된 경우는 해당 데이터 불러와서 응답
  - timespan별 기간 기본값
  - [ ] daily인 경우 가장 최근 거래일부터 1년 전까지 (약 240일)
    - [ ] 최근 6개월 먼저 호출
    - [ ] 다음 6개월 이어서 호출
  - [ ] weekly인 경우 가장 최근 거래주부터 2년 전까지 (약 100주)
  - [ ] monthly인 경우 가장 최근 거래연도부터 최초 거래 연도까지 전체 호출
- [ ] DB에 저장되지 않은 경우 Polygon.io에서 가져와서 응답
  - [ ] 응답하면서 비동기로 DB에 저장

### 정상적인 시세 데이터가 fetch되면 Candle Chart를 렌더링한다

- [ ] 기본 candle chart 렌더링
  - [ ] 이동평균선 5개
  - [ ] 거래량
  - [ ] 보조지표
- [ ] mouse zoom
- [ ] multi-timespan chart

### fetch 결과 시세 데이터가 비정상이거나 오류가 나면 Chart 대신 에러 발생 UI를 보여준다

### Chart Rotation

- [ ] chart list 생성
- [ ] 해당 list에 있는 chart는 초단위로 Interval을 지정해 rotation할 수 있다

### 채팅 컴포넌트에서 해당 코인에 대한 채팅을 할 수 있다

- [Deno showcase chat app](https://github.com/denoland/showcase_chat)에서는 [`Broadcast Channel API`](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API), `EventSource`를 사용
