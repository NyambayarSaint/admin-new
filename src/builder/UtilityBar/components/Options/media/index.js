import React from 'react';
import styledComponents from 'styled-components';
import DialogWindow from "../../../../components/DialogWindow"
import MediaLibrary from '../../../../components/MediaLibrary';
import { AiOutlineClose } from 'react-icons/ai';
import { Player } from 'video-react';
import videoReactCss from './video-react.css'

const Media = ({ object, forwardKey, forwardChange }) => {

    const [showMediaLibrary, setShowMediaLibrary] = React.useState(false)
    const onMediaSelect = (media) => {
        forwardChange(forwardKey, media)
        setShowMediaLibrary(false)
    }

    return (
        <Container videoReactCss={videoReactCss}>
            {object.kind === "photo"
                ?
                <img src={object.value} alt="preview_img" />
                :
                <Player
                    src={object.value}
                    playsInline
                    className="preview_video"
                />
            }
            <button onClick={() => setShowMediaLibrary(true)}>
                Choose {object.kind}
            </button>
            {showMediaLibrary && <DialogWindow onClose={() => setShowMediaLibrary(false)} >
                <div className='dialog_wrap'>
                    <MediaLibrary onMediaSelect={onMediaSelect} kind={object.kind} />
                    <div className='close_wrap' onClick={() => setShowMediaLibrary(false)}><AiOutlineClose /></div>
                </div>
            </DialogWindow>}
        </Container>
    );
};

export default Media;

const Container = styledComponents.div`
    ${({videoReactCss}) => videoReactCss};
    display:flex;
    align-items:center;
    gap:15px;
    img[alt="preview_img"]{
        max-width:50%;
        object-fit:cover;
        height:60px;
        border-radius:4px;
        flex:1;
    }
    .preview_video{
        max-width:50%;
        object-fit:cover;
        border-radius:4px;
        flex:1;
    }
    button{
        border:0;
        background:0;
        font-weight:500;
        color:rgba(26, 115, 232, 1);
        font-size:14px;
        padding:8px;
        cursor:pointer;
        flex:1;
    }
    .dialog_wrap{
        background:white;
        padding:30px;
        position:relative;
        .close_wrap{
            cursor:pointer;
            top:30px;
            right:30px;
            font-size:20px;
            position:absolute;
        }
    }
`;