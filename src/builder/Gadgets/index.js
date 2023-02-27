import React from 'react';
import Highlight from './Highlight';
import Indicator from './Indicator';
import SelectedBlock from './SelectedBlock';

const index = () => {
    return (
        <React.Fragment>
            <Highlight />
            <Indicator />
            <SelectedBlock />
        </React.Fragment>
    );
};

export default index;