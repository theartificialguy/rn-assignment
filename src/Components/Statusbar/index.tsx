import { StatusBar } from 'react-native'
import React from 'react'

import { theme } from '../../utils/theme';

const Statusbar = () => {
  return (
    <StatusBar barStyle={'dark-content'} backgroundColor={theme.background} />
  )
}

export default Statusbar