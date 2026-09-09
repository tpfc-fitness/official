import LazyLoad from 'vanilla-lazyload';

export const svgRequire = (req) => {
  const use = Array.prototype.slice.call(document.getElementsByTagName('use'));
  const requires = req || require.context('_svg/', true, /\.svg$/);
  use.forEach((elem) => {
    const { href } = elem;
    const svg = `${/(?!#).*/.exec(href.baseVal)[0]}.svg`;
    const files = {};

    requires.keys().forEach((filename) => {
      if (new RegExp(svg).test(new RegExp(filename))) {
        files[filename] = requires(filename);
      }
    });
  });
};

export const lazyLoadFun = () => {
  return new LazyLoad({
    elements_selector: '.lazy',
    use_native: true,
  });
};

/* device */
export const deviceType = () => {
  const angle = window.screen.orientation ? window.screen.orientation.angle : 0;
  const PCMinWidth = 1024;
  const mobileWidth = 740;
  const userAgent = navigator.userAgent;
  const isPCPad = angle === 0 && window.innerWidth > mobileWidth && window.innerWidth < PCMinWidth; // 在桌機時 resize 模擬 Pad 的尺寸
  const isAndroidPad = /Android|webOS|BlackBerry/i.test(userAgent);
  const is16BelowPad = /iPad/i.test(userAgent); // ios 16 以下的系統
  const is17AbovePad = angle !== 0 && /Mac OS X/i.test(userAgent); // iso 17 以上的系統
  const isAndroidMobile = /Android|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isIPhoneMobile =
    (angle !== 0 && window.innerWidth > 730 && window.innerWidth < 815) ||
    /iPhone/i.test(userAgent);

  if (window.innerWidth <= mobileWidth || isAndroidMobile || isIPhoneMobile) {
    return 'm';
  }
  if (isPCPad || isAndroidPad || is16BelowPad || is17AbovePad) {
    return 't';
  }

  return 'p';
};

export const hdScroll = () => {
  const $hd = $('.jHd');
  let saveScroll = [0, 0];

  $(window).on('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    saveScroll[0] = scrollTop;
    if (saveScroll[0] < saveScroll[1] && $hd.hasClass('--hide')) {
      $hd.removeClass('--hide');
    } else if (
      $hd.height() < scrollTop &&
      saveScroll[0] > saveScroll[1] &&
      !$hd.hasClass('--hide')
    ) {
      $hd.addClass('--hide');
    }
    saveScroll[1] = saveScroll[0];
  });
};
