let apiKey = "552e9247-acc5-4355-8315-d42a75eb9df1";

function remote(request){
    return fetch('https://geocode-maps.yandex.ru/1.x/?apikey=' + apiKey + '&format=json&geocode=' + encodeURI(request)).then((response) => {
        if(response.status !== 200){
            return response.text().then(function(text){
                throw new Error(text);
            });
        }

        return response.json();
    });
}

function points(request1, request2){
    // console.log(request1);
    // console.log(request2);
    // console.log('https://geocode-maps.yandex.ru/1.x/?apikey=' + apiKey + '&format=json&geocode=' + encodeURI(request1) + ',' + encodeURI(request2));
    return fetch('https://geocode-maps.yandex.ru/1.x/?apikey=' + apiKey + '&format=json&geocode=' + encodeURI(request1) + ',' + encodeURI(request2) + '&lang=ru-Ru').then(response => {
        if(response.status !== 200){
            return response.text().then(function(text){
                throw new Error(text);
            });
        }

        return response.json();
    });
}

export { remote, points };