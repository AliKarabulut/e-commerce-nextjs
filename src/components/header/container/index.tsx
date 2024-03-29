'use client'
import { useEffect, useState } from 'react'

import CategoryList from '@/components/header/category'
import HeaderActionGroup from '@/components/header/actions'
import Search from '@/components/header/search'
import cn from '@/utils/cn'

const HeaderContainer = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isUpScroll, setIsUpScroll] = useState<boolean>(false)
  let lastScrollPosition = 0

  const checkScroll = () => {
    const currentScrollPosition = window.scrollY
    if (currentScrollPosition <= 154) {
      setIsScrolled(false)
    } else if (currentScrollPosition > 154) {
      setIsScrolled(true)
    }
    if (currentScrollPosition < lastScrollPosition && currentScrollPosition >= 26) {
      setIsUpScroll(true)
    } else {
      setIsUpScroll(false)
    }
    lastScrollPosition = currentScrollPosition
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <div className={cn('header-wrapper group/container', { scrolled: isScrolled, upscrolled: isUpScroll })}>
      <div className="header-container group/container">
        <div className="header-sub-wrapper">
          <div className="header-brand">E commerce</div>
          <Search />
          <HeaderActionGroup />
        </div>
        <CategoryList />
      </div>
    </div>
  )
}

export default HeaderContainer
