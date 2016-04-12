import React from 'react'
import './style.scss'

class Handle extends React.Component {
  constructor(props) {
    super(props)
    let classNames = []
    for (const prop of ['top', 'bottom', 'left', 'right']){
      props[prop] && classNames.push(prop)
    }
    this.className = classNames.join(' ')
    this.moveMask = [
      props.left, props.top, props.right, props.bottom
    ].map((value)=>(value?1:0))
  }
  handleMouseDown(event) {
    event.stopPropagation()
    this.props.dragStart(event, this.moveMask, this.className)
  }
  render() {
    return (
      <div
        className={'handle ' + this.className}
        onMouseDown={this.handleMouseDown.bind(this)}
      />
    )
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isResizing: false,
      position: props.box || [0,0,100, 100],
      moveDelta: [0,0,0,0],
      className: '',
      width: 1e6,
      height: 1e6,
    }
  }
  componentDidMount(){
    const r = this.refs.canvas.getBoundingClientRect()
    this.setState({
      height: r.height,
      width: r.width,
    })
  }
  getBox() {
    const p = this.state.position
    const d = this.state.moveDelta
    const numsort = (a, b) => (a - b)
    let horizontal = [
      0, this.state.width, p[0] + d[0], p[2] + d[2]].sort(numsort)
    let vertical = [
      0, this.state.height, p[1] + d[1], p[3] + d[3]].sort(numsort)
    const box = [
      horizontal[1],
      vertical[1],
      horizontal[2],
      vertical[2],
    ]
    return box
  }
  newBox(event) {
    event.stopPropagation()
    const r = this.refs.canvas.getBoundingClientRect()
    console.log(r)
    const x = event.pageX - r.left
    const y = event.pageY - r.top
    this.setState({
      position: [x,y,x,y]
    })
    this.dragStart(event, [1,1,0,0], 'top left')
  }
  dragStart(event, dragMask, className) {
    this.componentDidMount()
    this.setState({
      isResizing: true,
      dragStart: [event.pageX, event.pageY],
      dragMask: dragMask,
      className: className,
    })
  }
  dragMove(event) {
    let dx = event.pageX - this.state.dragStart[0]
    let dy = event.pageY - this.state.dragStart[1]
    let dragMask = this.state.dragMask
    let delta = [dx,dy,dx,dy].map(
      (value, i)=>dragMask[i]*value)
    this.setState({ moveDelta: delta })
  }
  dragEnd(event) {
    this.setState({
      isResizing: false,
      moveDelta: [0,0,0,0],
      position: this.getBox(),
      className: '',
    })
  }
  getHandles(){
    const handlestrings = ['top', 'bottom', 'right', 'left',
      'top left', 'top right', 'bottom right', 'bottom left']
    const handles = handlestrings.map(function(propstring){
      let props = {}
      for (let key of propstring.split(/\s+/)){
        props[key] = true
      }
      return props
    })
    return handles.map((props) => (
      <Handle { ...props } dragStart={this.dragStart.bind(this)} />
    ))
  }
  render() {
    console.log(this.state)
    if (this.state.isResizing) {
      return (
        <div className="resizer" style={{
          backgroundImage: `url(${this.props.src})`,
        }} >
        <div ref="canvas"
          className={"canvas resize " + this.state.className}
          onMouseUp={this.dragEnd.bind(this)}
          onMouseLeave={this.dragEnd.bind(this)}
          onMouseMove={this.dragMove.bind(this)}
          >
          <Box ref="box" box={this.getBox()} />
        </div>
        </div>
      )
    } else {
      return (
        <div className="resizer" style={{
          backgroundImage: `url(${this.props.src})`,
        }} >
        <div ref="canvas"
          onMouseDown={this.newBox.bind(this)}
          className="canvas">
          <Box
            dragStart={this.dragStart.bind(this)}
            ref="box"
            className="move"
            box={this.getBox()}>
            { this.getHandles() }
          </Box>
        </div>
        </div>
      )
    }
  }
}

class Box extends React.Component {
  getStyle() {
    return {
      left: this.props.box[0],
      top: this.props.box[1],
      height: this.props.box[3] - this.props.box[1],
      width: this.props.box[2] - this.props.box[0],
    }
  }
  getRect() {
    return {
      x: this.props.box[0],
      y: this.props.box[1],
      height: this.props.box[3] - this.props.box[1],
      width: this.props.box[2] - this.props.box[0],
    }
  }
  handleMouseDown(event){
    event.stopPropagation()
    this.props.dragStart(event, [1,1,1,1], 'grabbing')
  }
  render(){
    return (
      <div className="box-wrapper">
        <div
          onMouseDown={this.handleMouseDown.bind(this)}
          className={"box " + this.props.className }
          style={this.getStyle()} >
          { this.props.children }
        </div>
        <svg className='cropbox-svg'>
          <g>
          <rect className="outer" />
          <rect
            className="inner"
            style={this.getRect()} />
          </g>
        </svg>

      </div>
    )
  }
}

export default Canvas
