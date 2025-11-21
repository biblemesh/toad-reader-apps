import * as Updates from 'expo-updates'

const useUpdates = () => {
  // Use the official Updates.useUpdates() hook from Expo SDK 52
  const {
    // currentlyRunning,
    isUpdateAvailable,
    isUpdatePending,
    isChecking,
    isDownloading,
    // availableUpdate,
    // downloadedUpdate,
    // checkError,
    // downloadError,
    // lastCheckForUpdateTimeSinceRestart,
  } = Updates.useUpdates()

  return {
    isUpdateAvailable,
    isUpdatePending,
    isChecking,
    isDownloading,
    // Additional useful properties from the new hook (commented out until needed)
    // currentlyRunning,
    // availableUpdate,
    // downloadedUpdate,
    // checkError,
    // downloadError,
    // lastCheckForUpdateTimeSinceRestart,
  }
}

export default useUpdates