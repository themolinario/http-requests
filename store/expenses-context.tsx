import {Context, createContext, useReducer} from "react";
import {IExpenses} from "../components/ExpensesOutput/ExpensesOutput";

type ContextProps = {
    expenses: IExpenses[],
    addExpense: ({description, amount, date}: IExpenses) => void,
    setExpenses: (expenses: IExpenses[]) => void,
    deleteExpense: (id: string) => void,
    updateExpense: (id: string, {description, amount, date}: IExpenses) => void
}

const expensesArray: IExpenses[] = [];

export const ExpensesContext: Context<ContextProps> = createContext({
    expenses: expensesArray,
    addExpense: ({description, amount, date}: IExpenses) => {},
    setExpenses: (expenses: IExpenses[]) => {},
    deleteExpense: (id: string) => {},
    updateExpense: (id: string, {description, amount, date}: IExpenses) => {}
});

function expensesReducer(state: IExpenses[], action: any): IExpenses[] {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense: IExpenses) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload );
        case 'SET':
            return action.payload.reverse();
        default:
            return state;
    }
}

function ExpensesContextProvider({children}: any) {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData:  IExpenses) {
        dispatch({ type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id: string) {
        dispatch({ type: 'DELETE', payload: id});
    }

    function updateExpense(id: string, expenseData: IExpenses){
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    function setExpenses(expenses: IExpenses[]) {
        dispatch({type: 'SET', payload: expenses})
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;

}

export default ExpensesContextProvider;