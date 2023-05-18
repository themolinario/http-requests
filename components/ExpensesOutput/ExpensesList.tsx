import {FlatList, ListRenderItem, ListRenderItemInfo, Text, View} from "react-native";
import {IExpenses} from "./ExpensesOutput";
import ExpenseItem from "./ExpenseItem";

interface ExpensesListProps {
    expenses: IExpenses[],
}

function renderExpenseItem(itemData: ListRenderItemInfo<IExpenses>) {
    return <ExpenseItem {...itemData.item} />
}

function ExpensesList ({expenses}: ExpensesListProps) {
    return (
        <View>
            <FlatList
                data={expenses}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ExpensesList;