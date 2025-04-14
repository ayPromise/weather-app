import { Box, Group, ThemeIcon, Text } from '@mantine/core';
import React from 'react'

interface WeatherDetailProps {
    icon: React.ReactNode;
    label: string;
    textContent: string;
}

const WeatherDetail = ({
    icon,
    label,
    textContent
}: WeatherDetailProps) => {
    return (
        <Group>
            <ThemeIcon size="md" variant="light" color="blue">
                {icon}
            </ThemeIcon>
            <Box>
                <Text size="xs" color="dimmed">{label}</Text>
                <Text size="sm">{textContent}</Text>
            </Box>
        </Group>
    );
}
export default WeatherDetail