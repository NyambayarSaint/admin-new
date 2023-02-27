import axios from 'axios';
import React from 'react';
import styledComponents from 'styled-components';
import Req, { Url } from 'utils/Req';
import { getReferenceContext } from '../../contexts/reference';

const readURL = file => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};


const Recents = ({ onMediaSelect }) => {
    const [entries, setEntries] = React.useState([])
    const [files, setFiles] = React.useState([])
    const { ScreenLoader } = React.useContext(getReferenceContext)
    React.useEffect(() => {
        fetchImages()
    }, [])
    React.useEffect(() => {
        console.log(entries, 'entries')
    }, [entries])
    const uploadFiles = async () => {
        ScreenLoader.current.dispatchEvent(new CustomEvent('lockScreen'))
        const formData = new FormData()
        files.map(file => {
            const newFile = new File([file], file.rename + file.extensionString, { type: file.type })
            formData.append("files", newFile)
        })
        await Req('post', { url: '/files', body: formData, headers: { "Content-Type": "multipart/form-data" } })
        fetchImages()
        setFiles([])
        ScreenLoader.current.dispatchEvent(new CustomEvent('unlockScreen'))
    }

    const fetchImages = async () => {
        try {
            const { data } = await Req('get', { url: '/files' })
            setEntries(data)
        } catch (e) {
            console.log(e, 'error fetchImages')
        }
    }
    const handleInputChange = async (e) => {
        const array = Array.from(e.target.files)
        await Promise.all(array.map(async (img, i) => {
            const result = await readURL(img)
            array[i].rename = img.name.slice(0, img.name.lastIndexOf('.'))
            array[i].extensionString = img.name.slice(img.name.lastIndexOf('.'), img.name.length)
            array[i].url = 'data:image/png;base64, ' + result.slice(result.indexOf(',') + 1, result.length)
        }))
        setFiles([...array])

    }
    return (
        <Container>
            <input className="custom-file-input" type="file" multiple onChange={handleInputChange} />
            <div className='images_wrapper upload'>
                {files.map((file, i) => (
                    <div className='instance' key={'file' + i}>
                        <img src={file.url} />
                    </div>
                ))}
            </div>
            {files.length ? <>
                <button onClick={() => setFiles([])}>Cancel</button>
                <button onClick={uploadFiles}>Upload</button>
            </> : ''}
            <div className='images_wrapper'>
                {entries.map(entry => (
                    <div className='instance' key={entry.id} onClick={() => onMediaSelect(Url + entry.url)}>
                        <img src={Url + entry.url} />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Recents;

const Container = styledComponents.div`
    background:rgba(0,0,0,0.05);
    padding:15px;
    height:calc(100vh - 400px);
    overflow-y:scroll;
    .images_wrapper{
        display:flex;
        flex-wrap:wrap;
        position:relative;
        .instance{
            width:30%;
            cursor:pointer;
            transition:0.3s ease;
            box-sizing:border-box;
            &:hover{
                border:1px solid rgba(0,0,0,0.2);
                opacity:0.5;
            }
            img{
                width:100%;
                height:100%;
                object-fit:cover;
            }
        }
    }
    .images_wrapper.upload{
        margin-top:10px;
        margin-bottom:10px;
        .instance{
            width:15%;
        }
    }
    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
    }
    .custom-file-input::before {
        content: 'Add new';
        display: inline-block;
        background: linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
        width:100%;
        text-align:center;
    }
    .custom-file-input:hover::before {
        border-color: black;
    }
    .custom-file-input:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
`