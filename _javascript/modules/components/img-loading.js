const ATTR_DATA_SRC = 'data-src';
const ATTR_DATA_LQIP = 'data-lqip';

function switchLQIP() {
  const src = this.getAttribute(ATTR_DATA_SRC);
  this.setAttribute('src', encodeURI(src));
  this.removeAttribute(ATTR_DATA_SRC);
}

export function loadImg() {
  document
    .querySelectorAll(`article img[${ATTR_DATA_LQIP}="true"]`)
    .forEach((lqip) => {
      switchLQIP.call(lqip);
    });
}
