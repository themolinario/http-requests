import {Alert, StyleSheet, Text, View} from "react-native";
import Input from "./Input";
import {useState} from "react";
import Button from "../UI/Button";
import {IExpenses} from "../ExpensesOutput/ExpensesOutput";
import {GlobalStyles} from "../../constants/styles";

function ExpenseForm (this: string, {onCancel, onSubmit, submitButtonLabel, defaultValues}:
    {
        onCancel: () => void,
        onSubmit: ( {amount, date, description}: {amount: number, date: Date, description: string}) => void,
        submitButtonLabel: string,
        defaultValues?: {amount: number, date: Date, description: string}
    }) {
    const [inputValues, setInputValues] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: !!defaultValues
        },
        date: {
            value: defaultValues ? defaultValues.date.toDateString() : '',
            isValid: !!defaultValues
        },
        description:{
            value: defaultValues ? defaultValues.description.toString() : '',
            isValid: !!defaultValues
        }
    });
    function inputChangeHandler (inputIdentifier: string, enteredValue: string) {
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    function submitHandler () {
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            description: inputValues.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputValues((curInputValues) => {
                return {
                    amount: { value: curInputValues.amount.value, isValid: amountIsValid },
                    date: { value: curInputValues.date.value, isValid: dateIsValid },
                    description: { value: curInputValues.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    label="Amount"
                    invalid={!inputValues.amount.isValid}
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: 'numbers-and-punctuation',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues['amount'].value
                }} />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    invalid={!inputValues.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues['date'].value
                }} />
            </View>
            <View style={styles.rowInput}>
                <Input label="Description"
                       invalid={!inputValues.description.isValid}
                       textInputConfig={{
                           multiline: true,
                           onChangeText: inputChangeHandler.bind(this, 'description'),
                           value: inputValues['description'].value,
                       }}
                />
            </View>
                {formIsInvalid && <Text style={styles.errorText}> Invalid Input </Text>}

            <View style={styles.buttons}>
                <Button style={styles.button} onPress={onCancel} mode="flat" >Cancel</Button>
                <Button style={styles.button} onPress={submitHandler} >{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
        flex:1,
    },
    errorText: {
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },
    inputsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    }
})