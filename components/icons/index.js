import React from 'react'
import './style.scss'

const Icon = ({ viewBox, name='Social', path, style = {}, ...props }) => (
  <svg
    className={`Icon ${name}`}
    style={style}
    viewBox={viewBox}
  >
    <path d={path} {...props} />
  </svg>
)

Icon.propTypes = {
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  viewBox: React.PropTypes.string,
  path: React.PropTypes.string,
  style: React.PropTypes.object,
}

/* eslint-disable max-len, quote-props */
const data = {
  "viewBox": "0 0 200 160",
  "github": "m54.3 10.3c-3.58 9.21-3.87 17.5-.853 24.9-27 29-.0758 68 33.1 71.5-3.26 2.94-5.25 7.14-6.01 12.6-10.5 5.02-21.5 2.35-27.3-7.83-2.44-4.13-7.14-8.32-12-9.29l-2.44-.360c-5.1 0-4.87 2.73-1.46 5.14l.853.625c4.15 2.69 7.2 6.33 9.17 10.9l1.21 2.8c3.92 11.5 18.5 13.5 28.8 11.6l2.8-.493c0 3.09.0189 17.9.0568 24m-26-146c7.9-2.44 19.7 5.4 25.9 9.67 15.2-4.26 31.7-4.26 46.9 0l4.66-2.94c5.25-3.24 14.6-8.81 21.1-6.73 3.66 9.21 4 17.5.967 24.9 27 29.1-.019 68-33.3 71.5 4.23 3.68 6.37 9.46 6.37 17.4v33",
  "twitter": "m163 41.3c6.86-.834 13.4-2.65 19.5-5.34-4.55 6.8-10.3 12.8-16.9 17.5 3.16 76.7-82.8 128-148 85.6m11.7-113c-8.9 15.3-4.1 35.4 10.5 45.2-5.5-.1-10.7-1.7-15.3-4.2-.6 16 11.7 30.6 27.2 33.7-4.98 1.36-10.2 1.55-15.3.569 4.32 13.5 16.8 23.3 31.7 23.6-14.1 11.1-32.4 16.1-50.2 14m146-97.7c6.99-4.21 12.4-10.8 14.9-18.8-6.56 3.89-13.8 6.71-21.5 8.22-23-24.7-65-1.9-57.4 31-28.1-1.4-53.1-14.9-69.9-35.4",
  "googleplus": "m63.8 154c35.1 0 60.2-26.5 60.2-61.3h-59.9m-.303 61.3c-45.3 0-76.7-48.9-56.8-90 18-36.8 68.5-47 99-18.8m36.4 46.4h57.8m-28.9 29v-58",
  "stackoverflow": "m134 107-71.4-14.5m10.9-33.4 65.7 30.7m9.76-15.4l-55.7-46.5m25.7-24.4 43 58.1m-103 63.7h72.5m-94-21.7v50.8h115v-50.8",
  "codepen": "m28.6 60.4 72.5 48.3v48.3l-72.5-48.3m72.5 0 72.5-48.3v48.3l-72.5 48.3m72.5-48.3-72.5-48.3v-48.3l72.5 48.3m-72.5 0-72.5 48.3v-48.3l72.5-48.3",
}

const GitHub = (props) => <Icon
  name="GitHub Social"
  viewBox={data.viewBox} path={data.github} { ...props }
/>
const Twitter = (props) => <Icon
  name="Twitter Social"
  viewBox={data.viewBox} path={data.twitter} { ...props }
/>
const GooglePlus = (props) => <Icon
  name="GooglePlus Social"
  viewBox={data.viewBox} path={data.googleplus} { ...props }
/>
const StackOverflow = (props) => <Icon
  name="StackOverflow Social"
  viewBox={data.viewBox} path={data.stackoverflow} { ...props }
/>
const CodePen = (props) => <Icon
  name="CodePen Social"
  viewBox={data.viewBox} path={data.codepen} { ...props }
/>

export { Icon, GitHub, Twitter, GooglePlus, StackOverflow, CodePen }
