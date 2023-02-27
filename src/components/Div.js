import React from 'react';

const Div = ({ c, children, ...props }) => {
    return (
        <div className={c} {...props}>
            {children}
        </div>
    );
};

export default Div;