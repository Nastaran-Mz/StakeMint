import React from 'react'
import { Button, ButtonProps, useWalletModal} from '@nguyenphu27/uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Button style={{backgroundColor:'#0FD17A'}} onClick={onPresentConnectModal} {...props}>
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
