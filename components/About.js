import React from 'react'
// import { SocialMedia } from 'components'

const About = () => (
  <section className="About">
    <h1>About me</h1>
    My name is Håken Lid. I'm a full stack developer living in Oslo.
    <h2>Some of the tech I've used</h2>
      <ul>
        <li>python3 + django</li>
        <li>ES6 + React.js </li>
        <li>linux + ubuntu</li>
        <li>aws S3</li>
        <li>webpack</li>
        <li>redux</li>
      </ul>
    <h2>Some stuff I want to learn</h2>
      <ul>
        <li>d3.js</li>
        <li>docker</li>
        <li>django channels & websockets</li>
      </ul>
    <h2>Contact</h2>
      <p>I'm <em>haakenlid</em> on github, twitter etc</p>
      <p>Click the icons below to see some of the stuff I've made or get in touch</p>
  </section>
)

export { About }
