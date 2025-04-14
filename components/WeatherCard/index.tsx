import React from 'react'
import { Card, Group, Text, ThemeIcon, SimpleGrid, Grid, Center, Container, Box } from '@mantine/core';
import { IconTemperature, IconWind, IconDroplet, IconEye } from '@tabler/icons-react';
import Image from 'next/image';
import getWeatherGradient from '@/utils/getCardGradient';
import { CachedWeatherData } from '@/types/cache';


interface WeatherCardProps {
    cachedData: CachedWeatherData
}

const WeatherCard = ({ cachedData }: WeatherCardProps) => {

    const { data } = cachedData

    const temperature: string = Number(data.main.temp).toFixed(1);
    const windSpeed: string = Number(data.wind.speed).toFixed(1);
    const visibility: string = (data.visibility / 1000).toFixed(1);
    const iconName: string = data.weather[0].icon

    const backgroundGradient: string = getWeatherGradient(cachedData.data.weather[0].id)

    return (
        <Container size={600} p={20}>
            <Card shadow="lg" padding="lg" radius="md" withBorder style={{
                background: backgroundGradient,
                height: 330
            }}>
                <Box style={{ position: "absolute", top: 7, right: 10 }}>
                    <Text style={{ color: "gray", fontSize: 12 }}>
                        last updated {new Date(cachedData.timestamp).toLocaleTimeString()}
                    </Text>
                </Box>
                <Center>
                    <SimpleGrid cols={1} spacing={0}>
                        {/* Name and weather details */}
                        <Center>
                            <Text component='h1' fw={700} style={{ fontSize: "1.7rem" }}>{cachedData.data.name}</Text>
                        </Center>

                        {/* Temperature details */}
                        <Center>
                            <Group gap={10}>
                                <Image src={`https://openweathermap.org/img/wn/${iconName}@2x.png`} alt="weather-icon" width={140} height={140}></Image>
                                <Grid>
                                    <Grid.Col span={12} p={0}>
                                        <Text component='h2' size="xl" style={{ fontSize: "2.5rem", fontWeight: 700, width: 0 }}>{temperature}°C</Text>
                                    </Grid.Col>

                                    <Grid.Col span={12} p={0}>
                                        <Text component='span' style={{ fontSize: "1.5rem", fontWeight: 700, width: 0 }}>{data.weather[0].description}</Text>
                                    </Grid.Col>
                                </Grid>
                            </Group>
                        </Center>

                        {/* Weather details */}
                        <Grid>
                            <Grid.Col span={8}>
                                <WeatherDetail
                                    icon={<IconWind size={23} />}
                                    label="Wind"
                                    textContent={`${windSpeed} m/s`}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <WeatherDetail
                                    icon={<IconDroplet size={23} />}
                                    label="Humidity"
                                    textContent={`${data.main.humidity}%`}
                                />
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <WeatherDetail
                                    icon={<IconEye size={23} />}
                                    label="Visibility"
                                    textContent={`${visibility} km`}
                                />
                            </Grid.Col>
                            <Grid.Col span={4}>
                                <WeatherDetail
                                    icon={<IconTemperature size={23} />}
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
            <Box>
                <Text size="xs" color="dimmed">{label}</Text>
                <Text size="sm">{textContent}</Text>
            </Box>
        </Group>
    );
}

export default WeatherCard;