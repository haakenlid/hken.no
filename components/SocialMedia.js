import React from 'react'
import { config } from 'config'
import { GitHub, CodePen, StackOverflow } from 'components/icons'

const SocialMedia = () => (
  <section className="SocialMedia" >
    <a href={config.github} title="github"><GitHub /></a>
    <a href={config.codepen} title="codepen"><CodePen /></a>
    <a href={config.stackoverflow} title="stack overflow"><StackOverflow /></a>
  </section>
)

export { SocialMedia }
