import React from 'react'
import { config } from 'config'
import { GitHub, CodePen, StackOverflow } from 'components/icons'

const SocialMedia = () => (
  <section className="SocialMedia">
    <a href={config.stackoverflow} title="my stack overflow profile">
      <StackOverflow />
    </a>
    <a href={config.github} title="my github profile">
      <GitHub />
    </a>
    <a href={config.codepen} title="some codepen projects">
      <CodePen />
    </a>
  </section>
)

export { SocialMedia }
