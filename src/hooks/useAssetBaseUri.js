import Constants from 'expo-constants'

import useRouterState from "./useRouterState"
import { getDataOrigin, getIDPOrigin } from '../utils/toolbox'

const {
  DEV_USE_DEVELOPMENT_BACKEND,
} = Constants.expoConfig.extra

const useAssetBaseUri = ({
  idps,
  accounts,
  forceCookieInUri,
}) => {

  const { routerState } = useRouterState()
  const { widget } = routerState

  const idp = Object.values(idps)[0]

  return (
    ((__DEV__ && DEV_USE_DEVELOPMENT_BACKEND) || widget || forceCookieInUri)
      ? `${getDataOrigin(idp)}/c/${Object.values(accounts)[0].cookie}`
      : `${getIDPOrigin(idp)}`
  )

}

export default useAssetBaseUri
