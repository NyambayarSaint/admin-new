import React from 'react';
import styledComponents from 'styled-components';
import { getReferenceContext } from '../contexts/reference';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'

const Indicator = () => {
    const [position, setPosition] = React.useState(null)
    const { Indicator: itself, Highlight, lastPointer } = React.useContext(getReferenceContext)

    const draw = (e) => {
        const { dragOverEvent } = e.detail
        const positionInfo = getIndicatorPosition(dragOverEvent.target, dragOverEvent.clientY)
        if (!positionInfo) return clear()
        setPosition({
            x: positionInfo.clientRect.left,
            width: positionInfo.clientRect.width,
            y: positionInfo.positionY
        })
        lastPointer.current = positionInfo.pointingAt
        Highlight.current.dispatchEvent(new CustomEvent('highlightDraw', {
            detail: {
                target: dragOverEvent.target,
                title: dragOverEvent.target.title
            }
        }))
    }

    const getIndicatorPosition = (target, y) => {
        if (target.classList.contains('dragging')) return null
        let isAppendable = false
        if (target.dataset.appendable === 'true') if (!target.hasChildNodes()) isAppendable = true
        const box = target.getBoundingClientRect()
        const middleOfBoxY = box.top + box.height / 2

        if (y < box.bottom && y > box.top) {

            let pointingAt
            let positionY
            // y === middleOfBoxY
            if (middleOfBoxY - 10 < y && middleOfBoxY + 10 > y) pointingAt = isAppendable ? 'm' : 'd'
            else if (y < middleOfBoxY) pointingAt = 'u'
            else if (y > middleOfBoxY) pointingAt = 'd'

            switch (pointingAt) {
                case 'm':
                    positionY = middleOfBoxY
                    break;
                case 'u':
                    positionY = box.top
                    break;
                case 'd':
                    positionY = box.bottom
                    break;
                default:
                    positionY = box.bottom
            }

            return { clientRect: box, positionY, middleOfBoxY, pointingAt }

        }
    }

    const clear = () => setPosition(null)

    React.useEffect(() => {
        itself.current.addEventListener('indicatorDraw', draw)
        itself.current.addEventListener('indicatorClear', clear)
        // eslint-disable-next-line
    }, [])

    return (
        <Container position={position} ref={itself}>
            <AiFillCaretRight style={{ marginLeft: -6 }} />
            <AiFillCaretLeft style={{ marginRight: -6 }} />
        </Container>
    );
};

export default Indicator;

const Container = styledComponents.div`
    position:absolute;
    height:3px;
    pointer-events:none;
    justify-content:space-between;
    align-items:center;
    font-size:20px;
    color:red;
    background:red;
    display:none;
    ${({ position }) => position && `
        top: ${position.y}px;
        left: ${position.x}px;
        width: ${position.width}px;
        display: flex;
    `};
`