const availablePrefixes = ['moz', 'ms', 'webkit'];

function requestAnimationFramePolyfill(): typeof requestAnimationFrame {
  let lastTime = 0;
  // tslint:disable-next-line:only-arrow-functions
  return function(callback: FrameRequestCallback): number {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

function getRequestAnimationFrame(): typeof requestAnimationFrame {
  if (typeof window === 'undefined') {
    return () => 0;
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = availablePrefixes.filter(key => `${key}RequestAnimationFrame` in window)[0];

  return prefix ? (window as any)[`${prefix}RequestAnimationFrame`] : requestAnimationFramePolyfill();
}
export function cancelRequestAnimationFrame(id: number): any {
  if (typeof window === 'undefined') {
    return null;
  }
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id);
  }
  const prefix = availablePrefixes.filter(
    key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
  )[0];

  return prefix
    ? ((window as any)[`${prefix}CancelAnimationFrame`] || (window as any)[`${prefix}CancelRequestAnimationFrame`])
      // @ts-ignore
      .call(this, id)
    : clearTimeout(id);
}

export const reqAnimFrame = getRequestAnimationFrame();
