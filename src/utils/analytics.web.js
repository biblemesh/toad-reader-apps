import {
  identify,
  Identify,
  init,
  reset,
  setUserId,
  track,
} from '@amplitude/analytics-browser';
import Constants from 'expo-constants';

import { isStaging, isBeta, getQueryString } from './toolbox';

const { AMPLITUDE_API_KEY } = Constants.expoConfig.extra;

const on = !!(!__DEV__ && AMPLITUDE_API_KEY && !isStaging() && !isBeta());

if (on) {
  init(AMPLITUDE_API_KEY, null, {
    minIdLength: 1,
  });
}

export const logEvent = async ({ eventName, properties }) => {
  const query = getQueryString();

  if (query.widget) {
    properties = {
      ...properties,
      widget: true,
    };
  }

  if (on) {
    track(eventName, properties || {});
  } else if (__DEV__) {
    console.log('logEvent', eventName, properties);
  }
};

export const setUser = async ({ userId = null, properties = {} } = {}) => {
  if (on) {
    if (userId) {
      setUserId(userId);
      const identifyObj = new Identify();
      for (let property in properties) {
        identifyObj.set(property, properties[property]);
      }
      identify(identifyObj);
    } else {
      reset();
    }
  } else if (__DEV__) {
    console.log('setUser', userId, properties);
  }
};
