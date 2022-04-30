import type { FC } from 'react'

export interface Props {}
interface State {}

const App: FC<Props> = () => {
  return (
    <div className="container max-w-4xl pt-10 pb-20 mx-auto">
      <div>
        <img src="/kidow-menu.svg" alt="" className="pl-6 h-7 sm:pl-0" />
      </div>
    </div>
  )
}

export default App
