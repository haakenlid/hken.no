import React from 'react'
import { scrollToId, getIdPos, getPos } from './scroll'

const clickTocHandler = (id) => () => scrollToId(id)

const TocHeader = ({ id, text, tag, isActive }) => (
  <div
    onClick={ clickTocHandler(id) }
    className={`TocHeader ${tag}${isActive ? ' active' : ''}`}
  >{ text }</div>
)
TocHeader.propTypes = {
  id: React.PropTypes.string,
  text: React.PropTypes.string,
  tag: React.PropTypes.string,
  isActive: React.PropTypes.bool,
}

class TableOfContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = { tocIndex: 0 }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    if (typeof window === 'object') {
      window.addEventListener('scroll', this.handleScroll)
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {scrollToId(hash, 1)}, 100)
        setTimeout(() => {scrollToId(hash, 1)}, 1500)
      }
    }
  }
  componentWillUnmount() {
    if (typeof window === 'object') {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
  handleScroll() {
    const where = getPos()
    const { items } = this.props
    const { tocIndex } = this.state
    let index
    for (index = 0; index < items.length; index++) {
      if (index < 0) { continue }
      const item = items[index]
      const itempos = getIdPos(item.id) - 50
      if (itempos >= where) {
        break
      }
    }
    index --
    if (index !== tocIndex) {
      const currentItem = items[index]
      const hashFragment = currentItem ? `#${currentItem.id}` : ''
      window.history.replaceState(null, null, hashFragment)
      this.setState({ tocIndex: index })
    }
  }
  render() {
    const { tocIndex } = this.state
    const { items } = this.props
    return (
      <nav className="TableOfContents">
        { items.map((item, index) => (
          <TocHeader
            isActive={tocIndex === index}
            key={item.id} {...item}
          />))
        }
      </nav>
    )
  }
  }
TableOfContents.propTypes = {
  items: React.PropTypes.array,
}

export { TableOfContents }
