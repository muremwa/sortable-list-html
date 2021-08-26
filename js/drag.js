let toItem = null;
const mainId = 'drag-one';
const ghost = document.getElementById('drag-ghost');
const orderSpan = document.getElementById('order');

// select items for add dragging effects
const liItems = (id, drgs = false) => {
    const home = document.getElementById(id);
    const fFunc = drgs? (child) => child.draggable: (child) => child.classList.contains('drg-item');
    return [...home.children].filter(fFunc);
};

function getNewOrder (id, paint = true) {
    const ids = liItems(id, true).map((child) => child.dataset.id);
    if (paint) {
        orderSpan.innerText = ids.join(', ');
    } else {
        return ids;
    }
};

function rearrangeItems (item) {
    if (toItem !== null) {
        if (toItem.nextElementSibling) {
            item.parentElement.insertBefore(item, toItem.nextElementSibling);
        } else {
            item.parentElement.appendChild(item)
        };
        toItem.classList.remove('drg-item-wild')
        getNewOrder(mainId, )
    };
};

liItems(mainId).forEach((e_) => {
    e_.addEventListener('dragenter', (e) => {
        toItem = e_;
        e_.classList.add('drg-item-wild')
    })

    e_.addEventListener('dragleave', () => {
        e_.classList.remove('drg-item-wild')
    })

    e_.addEventListener('dragover', (e) => {
        e.preventDefault();
    })

    e_.addEventListener('dragstart', (e) => {
        ghost.innerText = `${e_.innerText} • now`
        e.dataTransfer.setDragImage(ghost, 0, 0);
    })
    
    e_.addEventListener('dragend', (e) => {
        ghost.innerText = ''
        rearrangeItems(e_);
    })
});

