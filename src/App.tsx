import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import { useMediaQuery, useObjectState } from 'services'

export interface Props {}
interface State {
  isNotSupported: boolean
}

const App: FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isNotSupported }, setState] = useObjectState<State>({
    isNotSupported: false
  })
  const { sm } = useMediaQuery()

  const get = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // @ts-ignore
        const map = new kakao.maps.Map(ref.current, {
          // @ts-ignore
          center: new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          level: 3
        })
      })
    } else {
      setState({ isNotSupported: true })
    }
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <>
      {isNotSupported && (
        <div className="fixed top-0 h-10 w-full bg-black">
          <div className="flex h-full items-center justify-center text-xs sm:text-sm">
            해당 브라우저는 위치 기반 API를 사용할 수 없습니다.
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-4xl pt-10">
        <div className="mb-5">
          <img src="/kidow-menu.svg" alt="" className="h-7 pl-6 sm:pl-0" />
        </div>
      </div>

      <div className="sticky top-0">
        <div className="container sticky top-0 mx-auto max-w-4xl pb-20">
          <div
            className="h-96 border border-neutral-800"
            style={sm ? undefined : { height: window.innerWidth }}
          ></div>
        </div>
      </div>

      <a
        href="https://github.com/kidow/menu"
        rel="noreferrer"
        className="fixed top-2 right-2"
        target="_blank"
      >
        <button>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-neutral-400 hover:fill-neutral-200"
          >
            <g>
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
            </g>
          </svg>
        </button>
      </a>
    </>
  )
}

export default App
