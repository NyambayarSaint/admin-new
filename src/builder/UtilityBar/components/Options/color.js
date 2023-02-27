import React from 'react';
import styledComponents from 'styled-components';
import { SketchPicker } from 'react-color'
import { BsCheckLg } from 'react-icons/bs'

const Color = ({ object, forwardKey, forwardChange }) => {
    const itself = React.useRef()
    const [value, setValue] = React.useState(object.value)
    const [showPicker, setShowPicker] = React.useState(false)
    const handleChange = (e) => {
        setValue(e.hex)
        forwardChange(forwardKey, e.hex)
    }
    React.useEffect(() => {
        if (showPicker) {
            const picker = itself.current.querySelector('.sketch-picker')
            const appending_bar = document.createElement('div')
            appending_bar.classList.add('appending_bar')
            appending_bar.addEventListener('click', () => setShowPicker(false))
            appending_bar.innerHTML = "✓"
            picker.appendChild(appending_bar)
        }
    }, [showPicker])
    return (
        <Container ref={itself} color={value}>
            <div className='show_color' tabIndex={0} onClick={() => setShowPicker(!showPicker)}></div>
            {showPicker && <SketchPicker color={value} onChange={handleChange} />}
        </Container>
    );
};

export default Color;

const Container = styledComponents.div`
    .show_color{
        height:36px;
        width:36px;
        background:${({ color }) => color};
        border:1px solid rgba(0,0,0,0.2);
        border-radius:4px;
        box-sizing:border-box;
        cursor:pointer;
        &:focus{
            border-color: #40a9ff;
            box-shadow: 0 0 0 2px #40a9ff40;
        }
    }
    .sketch-picker{
        margin-top:10px;
        position:relative;
    }
    .appending_bar{
        width:25px;
        height:25px;
        border-radius:100%;
        background:#15AA0C;
        color:white;
        display:flex;
        justify-content:center;
        align-items:center;
        border:1px solid rgba(0,0,0,0.1);
        cursor:pointer;
        position:absolute;
        right:20px;
        top:20px;
        font-size:10px;
        -webkit-animation: slide-in-bck-center 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s both;
	    animation: slide-in-bck-center 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s both;
    }
`