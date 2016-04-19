const tick = 5
export const getPos = () => (
  document.body.scrollTop || document.documentElement.scrollTop)

export const scrollTo = (to, duration) => {
  if (duration <= 0 || getPos() === to) return
  setTimeout(() => {
    window.scrollTo(0, getPos() + tick * (to - getPos()) / duration)
    scrollTo(to, duration - tick)
  }, tick)
}

export const scrollTop = ({ to = 0, duration = 100 }) => scrollTo(to, duration)
