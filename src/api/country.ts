const apikey = 'ZeW4R073W9kDEj98Iah8efSxMGKbJ5MS'; 

const countries = async (lat: number, lon: number) => { 
    const response = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${apikey}`);
    const data = await response.json();
    return data.timelines.daily[0];
}

const result = await countries(9.0820, 8.6753);
console.log(result);