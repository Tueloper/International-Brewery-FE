import { css } from 'styled-components';

const sizes = {
  xbigScreen: 2310,
  bigScreen: 1990,
  xsbigScreen: 1880,
  xxlarge: 1820,
  xlargePc: 1680,
  largePc: 1560,
  screen1559: 1559,
  xlargeScreen: 1440,
  xxmidLarge: 1380,
  xmidLarge: 1352,
  semiLarge: 1300,
  screen1288: 1288,
  midLarge: 1240,
  largeScreen: 1200,
  midScreen: 1191,
  screen1140: 1140,
  screen1125: 1125,
  screen1113: 1113,
  pc: 1024,
  screen1008: 1008,
  screen993: 993,
  screen936: 936,
  screen916: 916,
  screen903: 903,
  screen874: 874,
  screen820: 820,
  screen798: 798,
  tablet: 768,
  screen762: 762,
  screen700: 700,
  screen696: 696,
  screen670: 670,
  screen666: 666,
  screen643: 643,
  screen640: 640,
  screen630: 630,
  miniTablet: 600,
  mini590: 590,
  mini560: 560,
  screen527: 527,
  screen516: 516,
  largePhone: 480,
  xPhone: 460,
  screen425: 425,
  screen415: 415,
  midPhone: 430,
  iphone8: 414,
  screen411: 411,
  phone: 376,
  screen360: 360,
  smallPhone: 330,
};

// iterate through the sizes and create a media template
export const screen = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default screen;
