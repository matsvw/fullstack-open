let token = null

const setToken = (newToken) => {
  if (newToken) {
    token = `Bearer ${newToken}`
  } else {
    token = null
  }
}

export default { token, setToken }
