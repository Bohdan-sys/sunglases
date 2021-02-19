export class Button {
    constructor(width, height, background, value, borderRadius) {
        this.width = width + 'px';
        this.height = height + 'px';
        this.background = background;
        this.value = value;
        this.borderRadius = borderRadius + 'px';
    }
    render(text, parentElement) {
        let parent = document.querySelector(parentElement);
        let newBtn = document.createElement("button");
        newBtn.style.width = this.width;
        newBtn.style.height = this.height;
        newBtn.style.background = this.background;
        newBtn.value = this.value;
        newBtn.style.borderRadius = this.borderRadius;
        newBtn.textContent = text;
        parent.appendChild(newBtn);
        return newBtn
    };
}