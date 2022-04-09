import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilAccountLogout,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { app } from '../../firebase'
import avatar8 from './../../assets/images/avatars/user.png'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('token')
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
