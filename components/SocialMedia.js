import React from 'react'
import { config } from 'config'
import { Twitter, GitHub, CodePen, StackOverflow } from 'components/icons'

export const SocialMedia = (props) => (
  <nav className="SocialMedia" {...props}>
    { /* <a href={config.twitter} title="twitter"><Twitter /></a> */ }
    <a href={config.github} title="github"><GitHub /></a>
    <a href={config.codepen} title="codepen"><CodePen /></a>
    <a href={config.stackoverflow} title="stack overflow"><StackOverflow /></a>
  </nav>
)
