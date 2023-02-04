document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    console.log(input);

    if (input !== '') {
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`
        let response = await fetch(url);
        let data = await response.json();
        showWarning('');
        if (data.cod == 200) {
            showInfo({
                name: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                tempIcon: data.weather[0].icon,
                windSpeed: data.wind.speed,
                windAngle: data.wind.deg,
            })
        } else {
            clearInfo();
            showWarning('Cidade não encontrada.')
        }
    } else {
        clearInfo();
        showWarning('Digite alguma cidade!')
    }

})

function showInfo(data) {
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${data.name}, ${data.country}`
    document.querySelector('.tempInfo').innerHTML = `${data.temp.toFixed(1)} ºC`;
    document.querySelector('.ventoInfo').innerHTML = `${data.windSpeed.toFixed(1)} km/h`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${data.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${data.windAngle - 90}deg)`
}

function clearInfo() {
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}