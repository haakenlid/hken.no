const STEPS = 100
const getPos = () => {
  if (typeof window !== 'object') { return 0 }
  return document.body.scrollTop || document.documentElement.scrollTop
}

const getIdPos = (id) => {
  if (typeof window !== 'object') { return 0 }
  const element = document.getElementById(id)
  return getPos() + element.getBoundingClientRect().top - 10
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

const scrollTop = ({ to = 0, duration = STEPS }) => {
  scrollTo(to, duration)
}
const scrollToId = (id) => {
  scrollTo(getIdPos(id), STEPS)
}

export { scrollTop, scrollTo, getIdPos, getPos, scrollToId }
