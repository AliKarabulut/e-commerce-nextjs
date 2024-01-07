'use client'
import { useDispatch, useSelector } from 'react-redux'
import { narrowedAction } from '@/store/admin/isNarrowed'
import TruckDeliveryIcon from '@/icons/admin/truck'
import BasketIcon from '@/icons/admin/basket'
import MailIcon from '@/icons/admin/mail'
import Button from '@/components/admin/left-menu/button'
import HandMoveIcon from '@/icons/admin/hand-move'

type StateProps = {
  isNarrowed: {
    isMobile: boolean
    isClicked: boolean
    isNarrowed: boolean
  }
}

const list = [
  { item: 'New Prouct', href: 'new-product' },
  { item: 'Edit Product', href: 'edit-product' },
  { item: 'Products', href: 'products' },
]

const LeftMenu = () => {
  const isMobile = useSelector((state: StateProps) => state.isNarrowed.isMobile)
  const isClicked = useSelector((state: StateProps) => state.isNarrowed.isClicked)
  const isNarrowed = useSelector((state: StateProps) => state.isNarrowed.isNarrowed)
  const dispatch = useDispatch()

  return (
    <nav
      className={`left-0 top-20 z-10 h-[calc(100vh-80px)] flex-shrink-0 bg-white px-4 py-6 duration-300 max-sm:absolute ${
        isMobile ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-72 '
      } `}
      onMouseEnter={() => isClicked && dispatch(narrowedAction.onNarrowed())}
      onMouseLeave={() => isClicked && dispatch(narrowedAction.offNarrowed())}>
      <Button text="Order" href="order" isMobile={isMobile} isNarrowed={isNarrowed}>
        <TruckDeliveryIcon className="flex-shrink-0" />
      </Button>
      <Button text="E-commerce" subMenuItems={list} isMobile={isMobile} isNarrowed={isNarrowed}>
        <BasketIcon className="flex-shrink-0" />
      </Button>
      <Button text="Mail" href="mail" isMobile={isMobile} isNarrowed={isNarrowed}>
        <MailIcon className="flex-shrink-0" />
      </Button>
      <Button text="Slider" href="slider" isMobile={isMobile} isNarrowed={isNarrowed}>
        <HandMoveIcon className="flex-shrink-0" />
      </Button>
    </nav>
  )
}

export default LeftMenu
