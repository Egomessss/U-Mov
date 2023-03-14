import {
  AdjustmentsVerticalIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"

export default function BottomNav() {
  const iconStyle = "h-6 w-6 mx-2 inline-block"
  const spanStyle = "text-xs"

  return (
    <div className="h-[50px] z-30 flex w-full items-center justify-center gap-4 bg-white py-2 shadow dark:bg-darkgray md:hidden">
      <Link href="/">
        <button
          className="focus:text-red-500 flex flex-col items-center"
          aria-label="search"
        >
          <MagnifyingGlassIcon className={iconStyle} />
          <span className={spanStyle}>Explore</span>
        </button>
      </Link>
      <button
        className="focus:text-red-500 flex flex-col items-center"
        aria-label="favorite"
      >
        <HeartIcon className={iconStyle} />
        <span className={spanStyle}>Wishlist</span>
      </button>

      <button
        className="focus:text-red-500 flex flex-col items-center"
        aria-label="account"
      >
        <AdjustmentsVerticalIcon className={iconStyle} />
        <span className={spanStyle}>Log in</span>
      </button>
      <button
        className="focus:text-red-500 flex flex-col items-center"
        aria-label="account"
      >
        <UserCircleIcon className={iconStyle} />
        <span className={spanStyle}>Log in</span>
      </button>
    </div>
  )
}
