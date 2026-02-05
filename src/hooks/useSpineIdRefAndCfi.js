import { useMemo } from 'react'

const useSpineIdRefAndCfi = latest_location => {

  const spineIdRefAndCfi = useMemo(
    () => {
      try {

        const latestLocation = JSON.parse(latest_location)

        const spineIdRef = latestLocation.idref
        const cfi = latestLocation.elementCfi

        return {
          spineIdRef,
          cfi,
        }

      } catch(e) {  // eslint-disable-line @typescript-eslint/no-unused-vars
        return {}
      }

    },
    [ latest_location ],
  )

  return spineIdRefAndCfi

}

export default useSpineIdRefAndCfi
