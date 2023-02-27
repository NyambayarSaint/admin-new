import React, { createContext } from 'react'
import Library from 'cubix_library'
import { isEqual, makeTrackable } from './miscs';
import axios from 'axios';
import Req from 'utils/Req';

export const getBuilderContext = createContext();
export class BuilderContextProvider extends React.Component {

    state = {
        expansion: null,
        utility: 'Options',
        selectedComponent: null,
        elements: [],
        compositionReady: false,
        composition: [],
        viewPort: 'desktop',
        destinationApi: this.props.api,
        destinationSlug: this.props.slug
    }
    selectComponent = (indices) => {
        if (!indices) return this.setState({ selectedComponent: null })
        let targetComponent
        this.extractComponentInfo(this.state.composition, indices.split('-'), ({ trackReference }) => {
            targetComponent = Object.getComponentByReference(this.state.composition, trackReference)
        })
        this.setState({ selectedComponent: { ...targetComponent, indices } })
    }
    extractComponentInfo = (givenComponentList, indices, makeTransfer, round, selectorArray) => {

        const thisIndex = indices[0]
        if (typeof round === "undefined") round = -1; round++

        if (thisIndex) {
            indices.shift()

            if (selectorArray) selectorArray.push(`.children[${thisIndex}]`)
            else selectorArray = [`[${thisIndex}]`]

            this.extractComponentInfo(givenComponentList, indices, makeTransfer, round, selectorArray)
        } else {
            makeTransfer({ trackReference: selectorArray.join('') })
        }
    }
    handleMoveComponent = (clonedCompositionData, sourceIndex, targetIndex, lastPointer) => {
        let storedComponent
        const trackableClone = makeTrackable(clonedCompositionData, true)
        const removedClone = this.componentRemoveReducer(trackableClone, sourceIndex, (arg) => { storedComponent = { ...arg } })
        const insertedClone = this.componentInsertReducer(removedClone, targetIndex, storedComponent, lastPointer)
        this.setState({ composition: insertedClone })
    }
    componentRemoveReducer = (array, sourceIndex, skipAndStore) => {
        return array.reduce((acc, item) => {
            const newItem = item;
            if (item.children) newItem.children = this.componentRemoveReducer(item.children, sourceIndex, skipAndStore);
            if (!isEqual(newItem.track, sourceIndex)) acc.push({ ...newItem })
            else skipAndStore(newItem)
            return acc;
        }, []);
    };
    componentInsertReducer = (array, targetIndex, instanceCopy, lastPointer) => {
        return array.reduce((acc, item) => {
            const newItem = item;
            if (item.children) newItem.children = this.componentInsertReducer(item.children, targetIndex, instanceCopy, lastPointer)
            if (isEqual(newItem.track, targetIndex)) {
                if (lastPointer === "m") acc.push({ ...newItem, track: null, children: [{ ...instanceCopy }] })
                else {
                    if (lastPointer === "u") acc.push({ ...instanceCopy, track: null })
                    acc.push({ ...newItem, track: null });
                    if (lastPointer === "d") acc.push({ ...instanceCopy, track: null })
                }
            } else acc.push({ ...newItem, track: null })
            return acc;
        }, []);
    };
    componentEditReducer = (array, targetIndex, instanceCopy) => {
        return array.reduce((acc, item) => {
            const newItem = item;
            if (item.children) newItem.children = this.componentEditReducer(item.children, targetIndex, instanceCopy)
            if (isEqual(newItem.track, targetIndex)) {
                const spreadComponent = { ...newItem, style: instanceCopy.style, options: instanceCopy.options, track: null }
                this.setState({ selectedComponent: { ...spreadComponent, indices: targetIndex.join('-') } })
                acc.push(spreadComponent)
            } else acc.push({ ...newItem, track: null })
            return acc;
        }, []);
    }
    componentDeleteReducer = (array, targetIndex) => {
        return array.reduce((acc, item) => {
            const newItem = item;
            if (item.children) newItem.children = this.componentDeleteReducer(item.children, targetIndex)
            if (!isEqual(newItem.track, targetIndex)) acc.push({ ...newItem, track: null })
            return acc;
        }, []);
    }
    moveComponent = (source, target, lastPointer) => {
        const clonedCompositionData = [...this.state.composition]
        const sourceIndex = source.split('-')
        const targetIndex = target.split('-')
        if (!isEqual(sourceIndex, targetIndex))
            this.handleMoveComponent(clonedCompositionData, sourceIndex, targetIndex, lastPointer)
    }
    addComponent = (element, target, lastPointer) => {
        const targetIndex = target.split('-')
        const trackableClone = makeTrackable([...this.state.composition], true)
        const insertedClone = this.componentInsertReducer(trackableClone, targetIndex, element, lastPointer)
        this.setState({ composition: insertedClone })
    }
    editComponent = (element, target) => {
        const targetIndex = target.split('-')
        const trackableClone = makeTrackable([...this.state.composition], true)
        const editedClone = this.componentEditReducer(trackableClone, targetIndex, element)
        this.setState({ composition: editedClone })
    }
    deleteComponent = (target) => {
        const targetIndex = target.split('-')
        const trackableClone = makeTrackable([...this.state.composition], true)
        const deletedClone = this.componentDeleteReducer(trackableClone, targetIndex)
        this.setState({ composition: deletedClone })
    }
    handleSetState = (arg) => this.setState(arg)
    componentDidMount() {
        this.fillDummyData()
        this.goFetchCompositionData()
    }
    async goFetchCompositionData() {
        const pageResult = await Req('get', { url: '/' + this.state.destinationApi + `?slug=` + this.state.destinationSlug })
        const composition = pageResult.data[0].composition
        this.setState({ composition: composition ? composition : [] })
    }
    async saveTemplate(templateComposition) {
        return new Promise(async (resolve, reject) => {
            try {
                delete templateComposition.indices
                await Req('post', { url: '/templates', body: templateComposition })
                resolve()
            } catch (e) {
                reject(new Error('Failed to save template', e))
                window.alert('Failed to save template')
            }
        })
    }
    async fillDummyData() {
        const ArrayToExtractElements = []
        const typeKeys = Object.keys(Library)
        typeKeys.forEach(typeKey => {
            const componentKeys = Object.keys(Library[typeKey])
            const storeComponents = []
            componentKeys.forEach(componentKey => {
                const { propData } = Library[typeKey][componentKey]
                storeComponents.push({
                    component: componentKey,
                    type: typeKey,
                    appendable: propData.appendable?.defaultValue ?? false,
                    style: propData.style?.defaultValue ?? {},
                    options: propData.options?.defaultValue ?? {}
                })

            })
            ArrayToExtractElements.push({ type: typeKey, components: storeComponents })
        })
        const response = await Req('get', { url: '/templates' })
        const templates = response.data.map(c => {
            const arg = { ...c }
            delete arg.id
            delete arg.track
            return arg
        })
        this.setState({ elements: [...ArrayToExtractElements, { type: 'My templates', components: templates }] })
    }
    render() {
        return (
            <getBuilderContext.Provider value={{
                ...this.state,
                setContext: this.handleSetState,
                moveComponent: this.moveComponent,
                addComponent: this.addComponent,
                selectComponent: this.selectComponent,
                editComponent: this.editComponent,
                deleteComponent: this.deleteComponent,
                saveTemplate: this.saveTemplate
            }}>
                {this.props.children}
            </getBuilderContext.Provider>
        )
    }
}

Object.getComponentByReference = (o, s) => {
    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o
}