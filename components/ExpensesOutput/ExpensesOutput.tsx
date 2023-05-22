import {StyleSheet, Text, View} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import {GlobalStyles} from "../../constants/styles";

export interface IExpenses extends Object{
    amount: number,
    id?: string,
    description: string,
    date: Date,
}
interface ExpensesOutputProps {
    expenses?: IExpenses[],
    expensesPeriod: string,
    fallbackText: string
}



function ExpensesOutput ({expenses, expensesPeriod, fallbackText}: ExpensesOutputProps) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>;

    if (expenses && expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

     return (
         <View style={styles.container}>
             <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
             <ExpensesList expenses={expenses} />
         </View>
     )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        backgroundColor: GlobalStyles.colors.primary700,
        paddingBottom: 36
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: "center",
        marginTop: 32
    }
})