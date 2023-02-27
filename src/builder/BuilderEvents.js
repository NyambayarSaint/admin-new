
export const HighlightDraw = (e) => {
    return new CustomEvent('highlightDraw', {
        detail: {
            target: e.target,
            title: e.target.title
        }
    })
};

export const HighlightClear = (e) => {
    return new CustomEvent('highlightClear', { bubbles: true })
}