import { Card, Center, Loader } from '@mantine/core'
import React from 'react'

const SkeletonCard = () => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Center>
                <Loader />
            </Center>
        </Card>
    )
}

export default SkeletonCard