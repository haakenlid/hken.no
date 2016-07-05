const STEPS = 10
const TICK = 10

const getPos = () => {
  if (typeof window !== 'object') { return 0 }
  return document.body.scrollTop || document.documentElement.scrollTop
}

const getIdPos = (id) => {
  if (typeof window !== 'object') return 0
  if (id.replace('#', '') === '') return 0
  const element = document.getElementById(id.replace('#', ''))
  if (!element) {
    return getPos()
  }
  return getPos() + element.getBoundingClientRect().top
}


const scrollTo = (to, duration) => {
  // console.log(to, duration)
  const pos = getPos()
  if (typeof window !== 'object' || duration <= 0 || pos === to) {
    return
  }
  if (duration === 1) {
    window.scrollTo(0, to)
  }
  setTimeout(() => {
    window.scrollTo(0, pos + (to - pos) / duration)
    scrollTo(to, duration - 1)
  }, TICK)
}

const scrollTop = (to = 0, duration = STEPS) => {
  // console.log('scrollTop')
  scrollTo(to, duration)
}
const scrollToId = (id, duration = STEPS) => {
  const to = getIdPos(id)
  // console.log(id, to)
  scrollTo(to, duration)
}

export { scrollTop, scrollTo, getIdPos, getPos, scrollToId }
