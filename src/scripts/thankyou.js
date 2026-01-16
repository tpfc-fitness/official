import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/thankyou.css';

import { svgRequire, lazyLoadFun, hdScroll, deviceType } from '_prototype.js';
import store from '_store.js';

// const $ = window.jQuery;

/* 一次載入使用到的 svg */
svgRequire();

window.PetiteVue.createApp({
  store,
  slider: null,
  commentSlider: null,
  memberResultSlider: null,
  mounted() {
    lazyLoadFun();
    this.$nextTick(() => {
      setTimeout(() => {
        AOS.init({
          offset: 120,
          duration: 800,
          easing: 'ease-in-out',
          once: true
        });

        window.addEventListener('resize', this.debouncedResize);

        setTimeout(() => {
          AOS.refreshHard();
        }, 300);
      }, 300);
    });

    const fireLead = () => {
      if (typeof window.fbq === 'function') {
        // 防呆：避免重整 thank-you 重複算
        if (!sessionStorage.getItem('lead_fired')) {
          window.fbq('track', 'Lead');
          sessionStorage.setItem('lead_fired', '1');
        }
        return true;
      }
      return false;
    };
  
    if (!fireLead()) {
      const t = setInterval(() => {
        if (fireLead()) clearInterval(t);
      }, 200);
  
      // 最多等 5 秒，避免一直 interval
      setTimeout(() => clearInterval(t), 5000);
    }
    
    store.load.finish();
  },

  // 📌 debounce for resize
  debouncedResize() {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this.initSliders();
    }, 150);
  },
}).mount('.jWrap');