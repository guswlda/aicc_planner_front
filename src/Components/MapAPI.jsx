// import React, { useEffect, useState } from 'react';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// // Google Map 스타일 및 설정
// const mapContainerStyle = {
//   width: '50%',
//   height: '600px',
// };

// // const { isLoaded } = useJsApiLoader({
// //   id: 'google-map-script',
// //   googleMapsApiKey: 'process.env.REACT＿APP＿MAP_API_KEY',
// // });

// // 한반도의 중심 위치 (위도, 경도)
// const center = {
//   lat: 36.5, // 한반도 중심 위도
//   lng: 127.5, // 한반도 중심 경도
// };

// const GoogleMapComponent = () => {
//   return isLoaded ? (
//     <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={7} />
//   ) : (
//     <></>
//   );
// };

// export default GoogleMapComponent;

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const GoogleMapComponent = () => {
  const containerStyle = {
    width: '50%',
    height: '600px',
  };

  // 한반도의 중심 위치 (위도, 경도)
  const center = {
    lat: 36.5, // 한반도 중심 위도
    lng: 127.5, // 한반도 중심 경도
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
