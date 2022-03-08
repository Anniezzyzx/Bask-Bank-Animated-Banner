(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
     !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  var browser = getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  var log = {
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  };
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      log.debug = true; // set to false before publishing

      var dom = domIds(); ////////////////////////////////////////////////////// ANIMATION //////////////////////////////////////////////////////

      function frameStart() {
        if (es5()) {
          frame0();
        } else {
          dom.backup.classList.add('backup');
        }
      }

      function frame0() {
        gsap.set("#polygon", {
          attr: {
            points: "80,0 80,0 160,1000 160,1000 0,1000 0,1000"
          }
        }); // gsap.set("#logo",{scale:0.53})
        // gsap.set("#logo_white",{scale:0.53})

        var tl = gsap.timeline({
          defaults: {
            ease: 'power3.inOut'
          },
          onComplete: addRollover
        });
        tl // .from('#txt_2', .5, {height:0, ease:Cubic.easeInOut})
        .staggerFrom(["#wing", "#txt_1"], .6, {
          autoAlpha: 0,
          x: 300
        }, .10).from('#txt_2', 0.6, {
          autoAlpha: 0,
          y: -20,
          force3D: false
        }, "+=.3") // .to('#txt_2', 1, {y:+26, ease:Cubic.easeInOut})
        .from("polygon", 1, {
          y: "+=600",
          ease: Strong.easeInOut
        }, "+=.4").to("#polygon", 1, {
          attr: {
            points: "80,0 80,0 160,0 160,600 0,600 0,0"
          },
          ease: Strong.easeInOut
        }, "-=0.3");
        dom.ad_content.classList.remove('invisible');
      } ////////////////////////////////////////////////////// EVENT HANDLERS //////////////////////////////////////////////////////


      function addRollover() {
        dom.ad_content.addEventListener('mouseenter', function () {
          gsap.to('#cta', 1, {
            autoAlpha: 0
          });
          gsap.to('#cta-bg', 0.01, {
            autoAlpha: 1,
            scaleX: 1.05,
            ease: Sine.easeInOut
          });
          gsap.to('#cta_ef', 0.01, {
            autoAlpha: 1
          });
        });
        dom.ad_content.addEventListener('mouseleave', function () {
          gsap.to('#cta-bg', 0.1, {
            scaleX: 1
          });
        });
      }

      function adClickThru() {
        dom.ad_content.addEventListener('click', function () {
          window.open(window.clickTag || window.clickTAG);
        });
      } ////////////////////////////////////////////////////// INIT //////////////////////////////////////////////////////


      adClickThru();
      frameStart();
    }
  };

  window.onload = function () {
    window.requestAnimationFrame(Banner.init);
  };

}());
