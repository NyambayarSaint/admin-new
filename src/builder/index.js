import React from 'react';
import styledComponents from 'styled-components';
import ToolBar from './ToolBar';
import Main from './Main';
import TopBar from './TopBar';
import UtilityBar from './UtilityBar';
import ScreenLoader from 'builder/components/ScreenLoader';
import styles from './styles';
import { BuilderContextProvider } from './contexts/builder';
import { ReferenceContextProvider } from './contexts/reference';

const PageBuilder = ({ api, slug }) => {
    return (
        <BuilderContextProvider api={api} slug={slug}>
            <ReferenceContextProvider>
                <Container styles={styles}>
                    <TopBar/>
                    <MainLayout>
                        <ToolBar />
                        <Main />
                        <UtilityBar />
                    </MainLayout>
                    <ScreenLoader />
                </Container>
            </ReferenceContextProvider>
        </BuilderContextProvider>
    );
};

export default PageBuilder;

const Container = styledComponents.div`
    display:flex;
    flex-direction:column;
    overflow-y:hidden;
    ${({ styles }) => styles};
`
const MainLayout = styledComponents.div`
    flex:1;
    display:flex;
    max-height:calc(100vh - 47px);
    min-height:calc(100vh - 47px);
`