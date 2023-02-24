const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSumm() {
            return this.amount * this.price
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')

    product[parentId].amount++
    basket()
}
function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            productIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            totalCount += po.amount
            productIndecator.classList.add('active')
            basketBtnCount.classList.add('active')
            productIndecator.innerHTML = po.amount
        } else {
            productIndecator.classList.remove('active')
            productIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct().toLocaleString('ru-RU')
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSumm
        total.toLocaleString('ru-RU')
    }
    return total
}
function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
        total.toLocaleString('ru-RU')
    }
    return total
}

function cardItemBurger(productData) {
    const { name, totalSumm, amount, img } = productData
    return ` <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
        <img src="${img}" alt="" class="wrapper__navbar-productImage">
        <div class="wrapper__navbar-sub">
            <p class="wrapper__navbar-infoName">${name}</p>
            <p class="wrapper__navbar-infoPrice">${totalSumm.toLocaleString('ru-RU')}</p>
        </div>
    </div>
    <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
        <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        <output class="wrapper__navbar-count">${amount}</output>
        <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
    </div>
</div>`
}


window.addEventListener('click', function (e) {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') {
                product[idProduct].amount--
            } else {
                product[idProduct].amount++
            }
            basket()

        }
    }
})



basketBtn.addEventListener('click', function () {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', function () {
    basketModal.classList.remove('active')
})

btnCard.addEventListener('click', function () {
    print__body.innerHTML = ''
    for (const key in product) {
        const { name, totalSumm, amount } = product[key]
        if (amount) {
            print__body.innerHTML += `
            <div class="print__body-item">
            <p class="print__body-item_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
            </p>
            <p class="print__body-item_sum">${totalSumm}</p>
        </div>`
        } else if (name) {
            print__body.innerHTML += ''
        }
    }
    print__footer.innerHTML = totalSummProduct()
    window.print()
})