/* eslint-disable */
const localStoragePlugin = (store: any) => {
  store.subscribe((mutation: any, { wg, user }: any) => {
    if (user) {
      localStorage.setItem('WG_USER', JSON.stringify(user))
    }
    if (wg) {
      localStorage.setItem('WG', JSON.stringify(wg))
    }
  })
}

export default [localStoragePlugin]
