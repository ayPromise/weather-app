import { Button, Center, Group, Input } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import React, { KeyboardEvent } from 'react'

interface SearchBarProps {
    value: string,
    handleSubmit: () => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({ value, handleSubmit, handleChange }: SearchBarProps) => {

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleSubmit()
    }

    return (
        <Center pt={100}>
            <Group gap={10}>
                <Input type='text' placeholder='Your city' w={500} value={value} onChange={handleChange} onKeyDown={handleEnter}></Input>
                <Button w={50} style={{ background: 'gray' }} p={0} onClick={handleSubmit}>
                    <IconSearch size={20}></IconSearch>
                </Button>
            </Group>
        </Center>
    )
}

export default SearchBar