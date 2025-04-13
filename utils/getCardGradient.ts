const getWeatherGradient = (weatherId: number): string => {
    const statusCode : string = Number(weatherId / 100).toFixed() + "xx"

    if(weatherId === 800)
        return 'linear-gradient(to right bottom, #87CEEB, #00BFFF)';

    switch(statusCode){
        case "2xx":
            // thunder
            return 'linear-gradient(155deg,rgba(80, 36, 89, 0.85) 0%, rgba(80, 36, 89, 0.85) 56%, rgba(80, 36, 89, 0.85) 100%';
        case "3xx":
            // drizzle
            return 'linear-gradient(0deg,rgba(214, 214, 214, 0.85) 9%, rgba(132, 102, 250, 0.85) 100%)';
        case "5xx":
            // rain
            return ' linear-gradient(180deg,rgba(58, 16, 125, 0.85) 17%, rgba(0, 212, 255, 0.85) 100%)';
        case "6xx":
            // snow
            return 'radial-gradient(circle,rgba(238, 174, 202, 0.85) 0%, rgba(148, 187, 233, 0.85) 100%)';
        case "7xx":
            // fog and etc
            return 'linear-gradient(90deg,rgba(153, 153, 153, 0.85) 0%, rgba(153, 153, 153, 0.85) 100%)';
        case "8xx":
            // clouds
            return 'linear-gradient(155deg,rgba(227, 227, 227, 0.85) 5%, rgba(140, 140, 140, 0.85) 100%)';
    }
    // default
    return 'linear-gradient(to right bottom, #ffffff, #f0f0f0)';
};

export default getWeatherGradient