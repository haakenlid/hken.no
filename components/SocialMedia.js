import React from 'react'
import { config } from 'config'
// import { Twitter, GitHub, CodePen, StackOverflow } from 'components/icons'
import { GitHub, CodePen, StackOverflow } from 'components/icons'
import { EcommerceBath } from 'components/lineicons/EcommerceBath'

const SocialMedia = () => (
  <section className="SocialMedia" >
    <a href={config.github} title="github"><GitHub /></a>
    <a href={config.codepen} title="codepen"><CodePen /></a>
    <a href={config.stackoverflow} title="stack overflow"><StackOverflow /></a>
    <a href={config.stackoverflow} title="stack overflow"><EcommerceBath /></a>
  </section>
)

export { SocialMedia }
