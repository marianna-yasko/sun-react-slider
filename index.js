class SunReactSlider extends React.Component {

    constructor(props) {
        super(props);
        this.sliderStyles = {
            padding: '8px 20px',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'space-between'
        };
        this.state = {
            activeSlideId: 0
        };
        props.items.then((items) => {
            items.json().then((data) => {
                this.state._reposes = data.map((item) => {
                    item.position = 0;
                    return item;
                });
            });
        });
    }

    render() {
        const showSlideInfo = (event) => {
            console.log('slide info: ', event.target);
        };
        const slideElement = options => React.createElement('div', {
            className: `slide-item${options.key !== 0 ? ' hidden' : ''}`,
            id: `item-${options.key}`,
            key: options.key,
            onClick: showSlideInfo
        }, [this.props.childItemName + '\n' + options.key, this._controls.left, this._controls.right]);
        const slidesTemplate = new Array(3).fill(null);
        const Slides = slidesTemplate.map((slide, index) => {
            return Object.assign({}, slideElement({
                className: 'slider-box',
                key: index
            }), { position: 0 });
        });
        this._slides = Slides;
        return React.createElement('section', {
            style: this.sliderStyles
        }, Slides);
    }

    get _controls() {
        return {
            right: React.createElement('button', {
                className: 'slider-move-control --left',
                onClick: (e) => this.moveSlider('left', e.target)
            }),
            left: React.createElement('button', {
                className: 'slider-move-control --right',
                onClick: (e) => this.moveSlider('right', e.target)
            })
        }
    }

    moveSlider(destany, { parentNode }) {
        function applyHiddenToAllItems() {
            document.querySelectorAll('.slide-item').forEach((slideItem) => slideItem.className = 'slide-item hidden');
        }
        this._slides.map((slide) => {
            if (destany === 'left') {
                if (!document.querySelector(`#item-${Number(parentNode.id.replace('item-', '')) - 1}`)) {
                    return console.log('No can turn below zero.');
                }
                applyHiddenToAllItems();
                document.querySelector(`#item-${Number(parentNode.id.replace('item-', '')) - 1}`).className = 'slide-item';
            } else if (destany === 'right') {
                if (!document.querySelector(`#item-${Number(parentNode.id.replace('item-', '')) + 1}`)) {
                    return console.log('No can turn high then zero.');
                }
                applyHiddenToAllItems();
                document.querySelector(`#item-${Number(parentNode.id.replace('item-', '')) + 1}`).className = 'slide-item';
            }
        });
    }
}
