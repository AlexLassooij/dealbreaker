import React from 'react'
import { Text, useColorScheme } from 'react-native'
import { AppStyles } from "../AppStyles";

function H1({text}) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Text style={[isDarkMode ? AppStyles.darkFontColor : AppStyles.lightFontColor, {fontSize: AppStyles.fontSize.content}]}>
            {text}
        </Text>
    )
}

export default H1;


