import {StyleSheet, View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

export interface IExpenses extends Object{
    amount: number,
    id: string,
    description: string,
    date: Date,
}
interface ExpensesOutputProps {
    expenses?: IExpenses[],
    expensesPeriod: string
}



function ExpensesOutput ({expenses, expensesPeriod}: ExpensesOutputProps) {
     return (
         <View style={styles.container}>
             <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
             <ExpensesList expenses={DUMMY_EXPENSES} />
         </View>
     )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        backgroundColor: GlobalStyles.colors.primary700
    }
})