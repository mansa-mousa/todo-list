// grab all the todo items
const todoItem = document.querySelectorAll('.todoItem')

// grab all the delete buttons
const deleteBtn = document.querySelectorAll('.delBtn')

// grab all the check buttons
const checkBtn = document.querySelectorAll('.checkBtn')

// grab all the uncheck buttons
const unCheckBtn = document.querySelectorAll('.unCheckBtn ')

// make all the delete buttons clickable
Array.from(deleteBtn).forEach((x) => {
    x.addEventListener('click', deleteTodo)
})

// make all the check buttons clickable
Array.from(checkBtn).forEach((x) => {
    x.addEventListener('click', check)
})

// make all the uncheck buttons clickable
Array.from(unCheckBtn).forEach((x) => {
    x.addEventListener('click', unCheck)
})

// delete todo item
async function deleteTodo(){
    // whenever clicked on, grab the text next to it
    const todoText = this.parentNode.childNodes[1].innerText

    // fetch to the database and send along the data
    try{
        const response = await fetch('deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoItem': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// mark todo item as complete
async function check(){
    // whenever clicked on, grab the text next to it
    const todoText = this.parentNode.childNodes[1].innerText

    // fetch to the database and send along the data
    try{
        const response = await fetch('check', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoItem': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// undo completed todo item
async function unCheck(){
    // whenever clicked on, grab the text next to it
    const todoText = this.parentNode.childNodes[1].innerText

    // fetch to the database and send along the data
    try{
        const response = await fetch('unCheck', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoItem': todoText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}