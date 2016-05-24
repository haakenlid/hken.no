const getPos = () => {
  if (typeof window !== 'object') { return 0 }
  return document.body.scrollTop || document.documentElement.scrollTop
}

const scrollTo = (to, duration) => {
  const tick = 5
  if (typeof window !== 'object' || duration <= 0 || getPos() === to) {
    return
  }
  setTimeout(() => {
    window.scrollTo(0, getPos() + tick * (to - getPos()) / duration)
    scrollTo(to, duration - tick)
  }, tick)
}

const scrollTop = ({ to = 0, duration = 100 }) => scrollTo(to, duration)

export { scrollTop, scrollTo, getPos }
