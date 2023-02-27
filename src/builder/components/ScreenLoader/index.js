import React from 'react';
import styledComponents from 'styled-components';
import { getReferenceContext } from '../../contexts/reference';
import spinnerGif from './spinner.gif'

const ScreenLoader = () => {
    const { ScreenLoader: itself } = React.useContext(getReferenceContext)
    React.useEffect(() => {
        itself.current.addEventListener('lockScreen', lockScreen)
        itself.current.addEventListener('unlockScreen', unlockScreen)
        // eslint-disable-next-line
    }, [])
    const lockScreen = () => {
        itself.current.style.display = "flex";
    }
    const unlockScreen = () => {
        itself.current.style.display = "none"
    }
    return (
        <Container ref={itself}>
            <p>Hold on dude... We're running just for it!</p>
            <img alt='loader' src={spinnerGif.src} />
        </Container>
    );
};

export default ScreenLoader;

const Container = styledComponents.div`
    position:fixed;
    z-index:10;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background:rgba(255,255,255,0.8);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-weight:500;
    font-size:18px;
    display:none;
`