export const addRipple = (e) => {

    const target = e.target
    const circle = document.createElement("span")
    const diameter = Math.max(target.clientWidth, target.clientHeight)
    const radius = diameter / 2;
    const clientRect = target.getBoundingClientRect()

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (clientRect.left + radius)}px`;
    circle.style.top = `${e.clientY - (clientRect.top + radius)}px`;
    circle.classList.add("ripple")

    const ripple = target.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    target.appendChild(circle)
}
