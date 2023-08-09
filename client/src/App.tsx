import React, { useState } from 'react'
import { AppContext } from './core/context/AppContext';
import { AccessType, AppPops, GeneralAdv, ProcessType } from './core/enums/main';
import { Portal } from './Portal';
import { AppState } from './core/AppState';

const App = () => {
  const [app, setApp] = useState({
    access: AccessType.Guest,
    appState: AppState.FETCHING_NONE,
    currentInput: {},
    isMailVerified: undefined,
    advType: GeneralAdv.None,
    profile: {},
    appPops: AppPops.NONE,
    process: ProcessType.None,
    progressPecent: 10,
    application: {}
  });

  return <AppContext.Provider value={{ app, setApp }}>
    <Portal />
  </AppContext.Provider>

}

export default App