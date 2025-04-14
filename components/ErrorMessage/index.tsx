import { Card, Center, Text } from '@mantine/core'
import React from 'react'

interface ErrorMessageProps {
    errorMessage: string
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
    return (
        <Center pt={30}>
            <Text style={{ color: "red" }}>{errorMessage || 'Something went wrong'}</Text>
        </Center>
    )
}

export default ErrorMessage