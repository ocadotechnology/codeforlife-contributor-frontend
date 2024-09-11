import { type FC } from "react"
import { App as _ } from "codeforlife/components"

import { Header } from "./components"
import routes from "./routes"
import store from "./app/store"
import theme from "./app/theme"

export interface AppProps {}

const App: FC<AppProps> = () => (
  <_ store={store} theme={theme} routes={routes} header={<Header />} />
)

export default App
