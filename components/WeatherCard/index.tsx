import React from 'react'
import { Card, Group, Text, ThemeIcon, SimpleGrid, Grid, Center, Container } from '@mantine/core';
import { IconTemperature, IconWind, IconDroplet, IconEye } from '@tabler/icons-react';
import Image from 'next/image';
import getWeatherGradient from '@/utils/getCardGradient';
import { WeatherAPIResponse } from '@/types/weather';


interface WeatherCardProps {
    data: WeatherAPIResponse
}

const WeatherCard = ({ data }: WeatherCardProps) => {

    const temperature: string = Number(data.main.temp).toFixed(1);
    const windSpeed: string = Number(data.wind.speed).toFixed(1);
    const visibility: string = (data.visibility / 1000).toFixed(1);
    const iconName: string = data.weather[0].icon

    const backgroundGradient: string = getWeatherGradient(data.weather[0].id)

    return (
        <Container size={600} p={20}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{
                background: backgroundGradient,
                height: 300
            }}>
                <Center>
                    <SimpleGrid cols={1} spacing={0}>
                        {/* Name and weather details */}
                        <Center>
                            <Text component='h1' fw={700} style={{ fontSize: "1.7rem" }}>{data.name}</Text>
                        </Center>

                        {/* Temperature details */}
                        <Center>
                            <Group gap={0}>
                                <Image src={`https://openweathermap.org/img/wn/${iconName}@2x.png`} alt="weather-icon" width={120} height={120}></Image>
                                <Text component='h2' size="xl" style={{ fontSize: "2.5rem", fontWeight: 700 }}>{temperature}°C</Text>
                            </Group>
                        </Center>

                        {/* Weather details */}
                        <Grid>
                            <Grid.Col span={8}>
                                <WeatherDetail
                                    icon={<IconWind size={20} />}
                                    label="Wind"
                                    textContent={`${windSpeed} m/s`}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <WeatherDetail
                                    icon={<IconDroplet size={20} />}
                                    label="Humidity"
                                    textContent={`${data.main.humidity}%`}
                                />
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <WeatherDetail
                                    icon={<IconEye size={20} />}
                                    label="Visibility"
                                    textContent={`${visibility} km`}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <WeatherDetail
                                    icon={<IconTemperature size={20} />}
                                    label="Pressure"
                                    textContent={`${data.main.pressure} hPa`}
                                />
                            </Grid.Col>
                        </Grid>
                    </SimpleGrid>
                </Center>
            </Card>
        </Container>
    );
}

function WeatherDetail({
    icon,
    label,
    textContent
}: {
    icon: React.ReactNode;
    label: string;
    textContent: string;
}) {
    return (
        <Group>
            <ThemeIcon size="md" variant="light" color="blue">
                {icon}
            </ThemeIcon>
            <div>
                <Text size="xs" color="dimmed">{label}</Text>
                <Text size="sm">{textContent}</Text>
            </div>
        </Group>
    );
}

export default WeatherCard;