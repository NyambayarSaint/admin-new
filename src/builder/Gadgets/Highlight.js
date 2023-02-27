import React from 'react';
import styledComponents from 'styled-components';
import { getReferenceContext } from '../contexts/reference';

const Highlight = () => {
    const { Highlight: itself } = React.useContext(getReferenceContext)
    const [title, setTitle] = React.useState('')
    React.useEffect(() => {
        itself.current.addEventListener('highlightDraw', draw)
        itself.current.addEventListener('highlightClear', clear)
        // return function cleanup() {
        //     if (itself.current) {
        //         itself.current.removeEventListener('highlight-draw', draw)
        //         itself.current.removeEventListener('highlight-clear', clear)
        //     }
        // }
        // eslint-disable-next-line
    }, [])
    const draw = (element) => {
        const Highlight = itself.current
        const { target, title } = element.detail
        const { top, left, width, height } = target.getBoundingClientRect()

        Highlight.style.top = top + 'px'
        Highlight.style.left = left + 'px'
        Highlight.style.width = width + 'px'
        Highlight.style.height = height + 'px'

        Highlight.style.display = "block"

        setTitle(title)
    }
    const clear = () => {
        itself.current.style.display = "none";
        setTitle('')
    }
    return (
        <Rectangle ref={itself}>
            <div>{title}</div>
        </Rectangle>
    );
};

export default Highlight;

const Rectangle = styledComponents.div`
    position:absolute;
    background:rgba(0,0,255,0.03);
    border:1px solid rgba(255,0,0,0.5);
    pointer-events:none;
    box-sizing:border-box;
    display:none;
    div{
        width:fit-content;
        padding:6px 16px;
        background:#93CAED;
        color:white;
        font-weight:bold;
        margin-top:-29px;
    }
`