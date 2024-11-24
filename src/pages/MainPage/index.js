import React from 'react';
import requests from '../../api/requests';

function MainPage() {
  return (
    <div>
      <Banner />
      <Row
        title='TOP 10 시리즈'
        id='TV'
        fetchUrl={requests.fetchNetfilxOriginals}
        isLargeRow
      />
      <Row
        title='지금 뜨는 콘텐츠'
        id='TN'
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title='공개 예정 콘텐츠'
        id='TR'
        fetchUrl={requests.fetchUpcoming}
      />
      <Row
        title='액션 영화'
        id='AM'
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title='코미디 영화'
        id='CM'
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title='공포 영화'
        id='HM'
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title='로맨스 영화'
        id='RM'
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title='다큐멘터리'
        id='DM'
        fetchUrl={requests.fetchDocumentariesMovies}
      />
    </div>
  );
}

export default React.memo(MainPage);