import './style.scss'
import React from 'react'
export { default as BylineIcon } from 'components/lineicons/SoftwarePen'
export { default as TimeIcon } from 'components/lineicons/BasicWatch'
export { default as TagIcon } from 'components/lineicons/EcommerceSales'

export const Icon = ({ viewBox, name = 'Social', path, style = {}, ...props }) => (
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
  "viewBox": "0 0 64 64",
  "codepen": "m 4.428,23.059 27.885,18.577 0,18.577 L 4.428,41.636 m 27.885,0 27.885,-18.577 0,18.577 -27.885,18.577 m 27.885,-18.577 -27.885,-18.577 0,-18.577 27.885,18.577 m -27.885,0 -27.885,18.577 0,-18.577 L 32.313,4.482",
  "github": "m 24.285,59.211 c -0.015,-1.577 -0.022,-7.273 -0.022,-8.462 l -1.077,0.190 c -3.962,0.731 -9.569,-0.038 -11.077,-4.462 l -0.465,-1.077 c -0.758,-1.758 -1.931,-3.158 -3.527,-4.192 l -0.328,-0.240 c -1.312,-0.927 -1.400,-1.977 0.562,-1.977 l 0.938,0.138 c 1.869,0.373 3.677,1.985 4.616,3.573 2.231,3.915 6.462,4.942 10.500,3.012 0.292,-2.100 1.058,-3.715 2.312,-4.846 -12.760,-1.346 -23.116,-16.347 -12.731,-27.501 -1.160,-2.846 -1.077,-6.769 0.300,-10.311 3.038,-0.938 7.577,2.077 9.962,3.720 5.846,-1.639 12.193,-1.639 18.039,0 l 1.792,-1.131 c 2.019,-1.246 5.616,-3.389 8.116,-2.589 1.408,3.542 1.538,6.731 0.372,9.577 10.385,11.193 -0.007,26.155 -12.808,27.501 1.627,1.415 2.450,3.639 2.450,6.692 l 0,12.287",
  "stackoverflow": "m 44.968,40.983 -27.462,-5.577 m 4.192,-12.847 25.270,11.808 m 3.754,-5.923 -21.424,-17.885 M 39.183,1.174 55.722,23.521 m -39.616,24.501 27.885,0 m -36.155,-8.346 0,19.539 44.232,0 0,-19.539",
  "twitter": "m 63.622,13.659 c -1.750,2.615 -3.962,4.923 -6.500,6.731 C 58.337,49.891 25.275,69.622 0.255,53.289 7.159,54.071 14.198,52.148 19.621,47.879 13.890,47.763 9.090,43.994 7.428,38.801 c 1.962,0.377 3.969,0.304 5.885,-0.219 -5.962,-1.192 -10.693,-6.808 -10.462,-12.962 1.769,0.962 3.769,1.577 5.885,1.615 C 3.120,23.467 1.274,15.736 4.832,9.887 11.428,17.809 21.044,23.001 31.852,23.539 28.929,10.885 45.083,2.116 53.929,11.616 c 2.962,-0.581 5.746,-1.665 8.269,-3.162 -0.962,3.077 -3.042,5.612 -5.904,7.245 2.465,-0.307 4.981,-1.006 7.327,-2.040 z",
}

export const GitHub = (props) => <Icon
  name="GitHub Social"
  viewBox={data.viewBox} path={data.github} { ...props }
/>
export const Twitter = (props) => <Icon
  name="Twitter Social"
  viewBox={data.viewBox} path={data.twitter} { ...props }
/>
export const GooglePlus = (props) => <Icon
  name="GooglePlus Social"
  viewBox={data.viewBox} path={data.googleplus} { ...props }
/>
export const StackOverflow = (props) => <Icon
  name="StackOverflow Social"
  viewBox={data.viewBox} path={data.stackoverflow} { ...props }
/>
export const CodePen = (props) => <Icon
  name="CodePen Social"
  viewBox={data.viewBox} path={data.codepen} { ...props }
/>

