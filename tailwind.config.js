const { setWidth } = require('./tailwind.function.js');
const CONFIG = require('./config.js');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.html', './src/**/*.ejs', './src/**/*.js', './src/**/*.css'],
  darkMode: 'media', // or 'media' or 'class'
  attributify: true,
  theme: {
    screens: {
      notsupport: [
        {
          raw:
            CONFIG.ieVersion === 0
              ? 'screen and (min-width: 0\\0)'
              : '\\0screen\\, screen\\9, all and (min-width: 0\\0) and (min-resolution: 0.001dpcm)',
        },
      ],
      mLandscape: [
        {
          raw: `(max-width: ${CONFIG.mobileMaxWidth - 1}px) and (orientation: landscape) and (min-width: 480px),
        (max-width: 999px) and (max-height: 428px) and (orientation: landscape) and (orientation: landscape) and (min-width: 480px)`,
        },
      ],
      m: [
        {
          raw: `(max-width: 999px) and (max-height: 428px) and (orientation: landscape), (max-width: ${CONFIG.mobileMaxWidth - 1}px)`,
        },
      ],
      t: [
        {
          raw: `(min-width: ${CONFIG.mobileMaxWidth}px) and (max-width: 1001px) and (min-height: 428px),
        (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5)`,
        },
      ],
      tm: [
        {
          raw: '(max-width: 1001px), (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5)',
        },
      ],
      pt: [
        {
          raw: `(min-width: ${CONFIG.mobileMaxWidth}px) and (min-height: 428px)`,
        },
      ],
      pMin: [
        {
          min: '1001px',
          max: `${CONFIG.desktopMinWidth}px`,
        },
      ],
      p: [
        {
          raw: '(min-width: 1001px)',
        },
      ],
      pMax: [
        {
          min: `${CONFIG.desktopMinWidth + 1}px`,
        },
      ],
      firefox: [
        {
          raw: '(min--moz-device-pixel-ratio:0) and (display-mode:browser), (min--moz-device-pixel-ratio:0) and (display-mode:fullscreen)',
        },
      ],
      IE: [
        {
          raw: 'screen and (-ms-high-contrast:active), (-ms-high-contrast:none)',
        },
      ],
    },
    extend: {
      width: {
        ...setWidth(1, 7),
        ...setWidth(1, 8),
        ...setWidth(1, 9),
        ...setWidth(1, 10),
        ...setWidth(1, 11),
      },
      fontFamily: {
        body: [
          '微軟正黑體',
          'Microsoft JhengHei',
          'Heiti TC',
          '黑體',
          'Arial',
          'Helvetica',
          'sans-serif',
        ],
      },
      fontSize: {
        ...{
          vmp: `${(16 / CONFIG.desktopMinWidth) * 100}vw`,
          vmt: `${(16 / 768) * 100}vw`,
          vmm: `${(16 / CONFIG.basicMobileWidth) * 100}vw`,
          vmmls: `${((16 / CONFIG.basicMobileWidth) * 100) / 1.77}vw`,
        },
      },
      lineHeight: {
        default: 1.5,
      },
      keyframes: {
        plantGrow: {
          '0%': { transform: 'scale(0)' },
          '85%': { transform: 'scale(1.2)' },
          '70%, 100%': { transform: 'scale(1)' },
        },
      },
      content: {
        default: "''",
      },
    },
  },
  corePlugins: {
    fontFamily:
      '"微軟正黑體", "Microsoft JhengHei", "Heiti TC", "黑體", Arial, Helvetica, sans-serif',
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
