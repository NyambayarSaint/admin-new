import React from 'react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
  ]
}

const Richtext = ({ object, forwardChange, forwardKey }) => {

  const [value, setValue] = React.useState(object.value)

  const handleChange = (arg) => {
    setValue(arg)
    forwardChange(forwardKey, arg)
  }

  return (
    <ReactQuill modules={modules} theme="snow" value={value} onChange={handleChange} />
  )
};

export default Richtext;