import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinuDays} from "../util/date";

function AllExpenses () {
    const expensesCtx= useContext(ExpensesContext);

    return (
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No expenses" />
    )
}

export default AllExpenses;