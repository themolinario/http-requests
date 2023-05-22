import axios from "axios";
import {IExpenses} from "../components/ExpensesOutput/ExpensesOutput";

const BACKEND_URL = 'https://react-native-course-33840-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense (expenseData: IExpenses) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.name;

    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(BACKEND_URL + '/expenses.json');

    const expenses: IExpenses[] = [];

    console.log(response.data);

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }

    return expenses;
}

export function updateExpense(id: string, expenseData: IExpenses) {
    return axios.put(BACKEND_URL +  `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id: string) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}