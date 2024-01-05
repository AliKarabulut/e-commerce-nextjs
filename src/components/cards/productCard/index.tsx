'use client'
import Image from 'next/image'
import Star from '@/ui/star'
import HeartIcon from '@/icons/e-commerce/heart'
import EyeIcon from '@/icons/e-commerce/eye'

const DummyData = {
  name: 'Iphone Bilmem Kaç',
  price: 550,
  image: '/products/phone1.png',
  image2: '/products/phone3.png',
  colors: ['#ff3b30', '#fed700', '#dddddd', '#333e48'],
  discount: 20,
  rate: 4.3,
}

const ProductCard = ({ className }: { className: string }) => {
  return (
    <div className={`group relative h-fit cursor-pointer px-4 text-dark hover:z-10 ${className}`}>
      <div className="relative mb-2 mt-4 h-full text-2xl sm:my-4 ">
        <Image
          src={DummyData.image}
          width={720}
          height={660}
          alt="phone"
          className="h-full object-contain transition-all duration-500 group-hover:opacity-0"
        />
        <Image
          src={DummyData.image2}
          width={720}
          height={660}
          alt="phone"
          className="absolute left-0 top-0 h-full w-full object-contain opacity-0 transition-all duration-500 group-hover:opacity-100"
        />
        <div className="bg-gray-100 invisible absolute -right-1 top-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-grayLighter pt-0.5 opacity-0 shadow-md duration-300 hover:border-yellow hover:bg-yellow group-hover:visible group-hover:opacity-100">
          <HeartIcon size={24} />
        </div>
        {DummyData?.discount && (
          <div className="absolute -left-1 top-0 flex h-10 w-10 flex-col items-center justify-center rounded-full bg-yellow pt-0.5 text-sm font-semibold ">
            {DummyData.discount}%
          </div>
        )}
      </div>
      <div>
        <div className="mb-2 w-3/4 truncate text-base font-medium capitalize">{DummyData.name}</div>
        <div className="flex items-center gap-1">
          <Star rate={DummyData.rate} />
          <span className="leading-0 text-xs">{DummyData.rate}</span>
        </div>
        <div className="flex items-center gap-2">
          {DummyData?.discount ? (
            <>
              <div className="text-lg text-redDark">${((DummyData.price * (100 - DummyData?.discount)) / 100).toFixed(2)}</div>
              <div className="text-xs text-grayDark line-through">${DummyData.price.toFixed(2)}</div>
            </>
          ) : (
            <div className="text-lg font-medium">${DummyData.price.toFixed(2)}</div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 -bottom-8 z-10 hidden w-full rounded-lg border border-grayLight bg-transparent shadow-md group-hover:block">
        <div className="absolute bottom-0 flex h-fit w-full items-center justify-center gap-0.5 rounded-lg bg-white py-2 text-xs font-medium text-grayDark hover:text-yellow">
          <EyeIcon className="shrink-0 stroke-2 transition-all" />
          <p className="transition-all">View</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
