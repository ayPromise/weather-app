import { createTheme, MantineProvider as ManProvider } from '@mantine/core';
import React, { PropsWithChildren } from 'react'


const theme = createTheme({
    fontFamily: "Montserrat",
    autoContrast: true

});

const MantineProvider = ({ children }: PropsWithChildren) => {
    return (
        <ManProvider theme={theme}>
            {children}
        </ManProvider>
    )
}

export default MantineProvider