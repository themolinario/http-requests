import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableWithoutFeedback,
    View,
    ViewStyle
} from "react-native";
import {GlobalStyles} from "../../constants/styles";

interface InputProps {
    label: string,
    textInputConfig: TextInputProps,
    style?: ViewStyle,
    invalid: boolean
}
function Input ({invalid,label, textInputConfig, style}: InputProps) {

    let inputStyles: any = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (invalid) {
        inputStyles.push(styles.errorInput)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.inputContainer, style]}>
                <Text style={[styles.label, invalid && styles.errorLabel]}>{label}</Text>
                <TextInput style={inputStyles} {...textInputConfig} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
        flex: 1
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: GlobalStyles.colors.primary700
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    errorLabel: {
        color: GlobalStyles.colors.error500
    },
    errorInput: {
        color: GlobalStyles.colors.error50
    }
})