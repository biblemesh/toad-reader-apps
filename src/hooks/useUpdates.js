import * as Updates from 'expo-updates'

const useUpdates = () => {
  // Use the official Updates.useUpdates() hook from Expo SDK 52
  const {
    currentlyRunning,
    isUpdateAvailable,
    isUpdatePending,
    isChecking,
    isDownloading,
    availableUpdate,
    downloadedUpdate,
    checkError,
    downloadError,
    lastCheckForUpdateTimeSinceRestart,
  } = Updates.useUpdates()

  return {
    isUpdateAvailable,
    isUpdatePending: isUpdatePending,
    isChecking,
    isDownloading,
    // Legacy compatibility - map the new API to the old expected interface
    setUpdates: () => {
      // This was used to manually set update info, but with the new hook
      // the state is managed internally by expo-updates
      console.warn('setUpdates is deprecated and no longer needed with Updates.useUpdates()')
    },
    // Additional useful properties from the new hook
    currentlyRunning,
    availableUpdate,
    downloadedUpdate,
    checkError,
    downloadError,
    lastCheckForUpdateTimeSinceRestart,
  }
}

export default useUpdates