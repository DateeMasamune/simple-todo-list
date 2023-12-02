const addListener = (target, type, set) => {
  target.addEventListener(type, (event) => {
    set(event.target.value)
  })
}

const displayInput = () => {
  let productName
  let productCount

  const [buttonAdd] = document.getElementsByClassName('todo-list__input-display__button')
  const [inputProductName] = document.getElementsByClassName('todo-list__input-display__title')
  const [inputProductCount] = document.getElementsByClassName('todo-list__input-display__count')


  const setProductName = (value) => productName = value
  const setProductCount = (value) => productCount = value

  const getProductName = () => productName
  const getProductCount = () => productCount

  const clearField = () => {
    inputProductName.value = ''
    inputProductCount.value = ''
  }

  const handlerClick = (addList) => {
    addListener(buttonAdd, 'click', addList)
  }

  addListener(inputProductName, 'input', setProductName)
  addListener(inputProductCount, 'input', setProductCount)

  return {
    clearField,
    productName,
    productCount,
    handlerClick,
    getProductName,
    getProductCount,
  }
}

const todoList = () => {
  let list = []
  const [todoContainer] = document.getElementsByClassName('todo-list__items_container')
  const { handlerClick, getProductCount, getProductName, clearField } = displayInput()

  const removeProduct = (productId) => {
    list = list.filter(({ id }) => id !== productId)
    render(list)
  }

  const setRemoveHandler = () => {
    const removeButtons = document.querySelectorAll('.todo-list__item__remove')

    for (const button of removeButtons) {
      addListener(button, 'click', () => removeProduct(button.dataset.id))
    }
  }

  const addList = () => {
    const productName = getProductName()
    const productCount = getProductCount()
    const idProduct = `${list.length + 1}-${Math.floor(Math.random() * list.length + 1)}-${productCount}`

    list.push({
      id: idProduct,
      name: productName,
      count: productCount
    })

    clearField()
    render(list)
  }

  handlerClick(addList)

  const render = (todoList) => {
    todoContainer.innerHTML = todoList.map(({ name, count, id }) =>
      `<section class="todo-list__item">
  <div class="todo-list__item__container">
    <div class="todo-list__item__count">
      ${count}
    </div>
    <span class="todo-list__item__name-product">${name}</span>
  </div>
  <div class="todo-list__item__remove" data-id=${id}>
    <img src="./public/close.svg">
  </div>
</section>`).join(' ')
    setRemoveHandler()
  }
}

const init = () => todoList()
init()

const taska = () => {
  const inData = "user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue&experiments.theme=dark"

  const parseGetParams = (getParams) => {
    return getParams.split('&').reduce((curr, next) => {
      const parseDeepParam = next.split('.')
      let currentObj = curr

      for (let key of parseDeepParam) {
        const [paramKey, paramValue] = key.split('=')

        if (paramValue) {
          currentObj[paramKey] = decodeURIComponent(paramValue)
          currentObj = curr
        } else if (key in currentObj) {
          currentObj = currentObj[key]
        } else {
          currentObj[key] = {}
          currentObj = currentObj[key]
        }

      }
      return curr
    }, {})
  }
  parseGetParams(inData)
}
taska()