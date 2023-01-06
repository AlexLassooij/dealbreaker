import React from 'react'
import { Text, useColorScheme } from 'react-native'
import { AppStyles } from "../AppStyles";

function H2({text, style, numberOfLines=2}) {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Text 
            style={[isDarkMode ? AppStyles.darkFontColor : AppStyles.lightFontColor, {fontSize: AppStyles.fontSize.h2}, style]}
            numberOfLines={numberOfLines}
            >
            {text}
        </Text>
    )
}

export default H2;


