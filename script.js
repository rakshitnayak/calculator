class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {  
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //this is beacause to clear all the values in calcualtor and set the values to zero or default values.
    }  
                                                       // which is going to take all the inputs and functions for calculating
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    } //this function is going to clear all different variables

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    } //this function will remove single numbers 


    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return//this actually stops "." to display in screen multiple times
        this.currentOperand = this.currentOperand.toString() + number.toString()
    } //everytime when you click number it joins the numbers(ex: 2233) ,here we have parsed (number) in the function

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }//this function selects different operations you click,here we have parsed (operation) in the function

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) //parseFloat is used to convert string into number
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return

        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    } //this function takes value inside our calculator and compute single value for what we need to display in the calculator

    getDisplayNumber(number) { 
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = '';

        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`

        } else {
            return integerDisplay
        }

    }//dislays whatever the function is returned
    
    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    } //this is going to update display in calculator


}







//The querySelectorAll() method returns all elements in the document that matches a specified CSS selector(s)
const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,
    currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText) //append whatever is inside the button so button.innerText
        calculator.updateDisplay() //this will update the clicked numbers evertime we click the buttons
    })
})


//similarly with oeartaions
operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })

})

//similarly with computing
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//similarly with clearing
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//similarly for deleteing
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})




