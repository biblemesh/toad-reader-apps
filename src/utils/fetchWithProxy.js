import { Platform } from 'react-native';

/**
 * Simple fetch implementation with better logging
 * This implementation doesn't rely on Constants which can be undefined in some environments
 */
const fetchWithProxy = async (url, options = {}) => {
  if (__DEV__) {
    console.log(`[NETWORK] Fetch request to: ${url}`);
  }
  
  try {
    const response = await fetch(url, options);
    
    if (__DEV__) {
      console.log(`[NETWORK] Fetch response: ${response.status} from ${url}`);
    }
    
    return response;
  } catch (error) {
    console.error(`[NETWORK] Fetch error: ${error.message} for ${url}`);
    
    if (__DEV__) {
      console.error(`[NETWORK] Full error: ${error.toString()}`);
    }
    
    throw error;
  }
};

export default fetchWithProxy;
