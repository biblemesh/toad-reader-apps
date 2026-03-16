const Animated = {
  View: 'Animated.View',
  Text: 'Animated.Text',
  Image: 'Animated.Image',
  ScrollView: 'Animated.ScrollView',
  createAnimatedComponent: (Component) => Component,
  call: () => {},
  Value: function (initial) {
    this._value = initial;
  },
  event: () => () => {},
  timing: () => ({
    start: (cb) => {
      if (cb) cb({ finished: true });
    },
  }),
  spring: () => ({
    start: (cb) => {
      if (cb) cb({ finished: true });
    },
  }),
};

module.exports = {
  __esModule: true,
  default: Animated,
  Animated,
  useSharedValue: (init) => ({ value: init }),
  useAnimatedStyle: () => ({}),
  withTiming: (val) => val,
  withSpring: (val) => val,
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  Easing: { linear: (t) => t, ease: (t) => t, out: (easing) => easing },
  interpolate: (_val, _inputRange, outputRange) => outputRange[0],
  Extrapolate: { CLAMP: 'clamp' },
  FadeIn: { duration: () => ({}) },
  FadeOut: { duration: () => ({}) },
};
