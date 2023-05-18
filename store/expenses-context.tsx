import {createContext, useReducer} from "react";
import {IExpenses} from "../components/ExpensesOutput/ExpensesOutput";

const DUMMY_EXPENSES: IExpenses[] = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 6.99,
        date: new Date('2021-10-09')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}: IExpenses) => {},
    deleteExpense: ({id}: IExpenses) => {},
    updateExpense: (id: string, {description, amount, date}: IExpenses) => {}
});

function expensesReducer(state: IExpenses[], action: any): IExpenses[] {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toDateString() + Math.random().toString();
            return [{ ...action.payload, id: id}, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense: IExpenses) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload )
        default:
            return state;
    }
}

function ExpensesContextProvider({children}: any) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData:  IExpenses) {
        dispatch({ type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id: string) {
        dispatch({ type: 'DELETE', payload: id});
    }

    function updateExpense(id: string, expenseData: IExpenses){
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;

}

export default ExpensesContextProvider;