console.log("script çalıştı")
const weatherForm = document.querySelector('form');
const weatherInput = document.querySelector('input');
const paragraf = document.querySelector('#p1');
const paragraf2 = document.querySelector('#p2');
const paragraf3 = document.querySelector('#p3');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle
    console.log(weatherInput.value); // Kullanıcının girdiği adresi konsola yazdır
    //const address = weatherInput.value;
});

// Harici bir API'den veri alma ve konsolda görüntüleme
fetch('https://puzzle.mead.io/puzzle')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Yerel sunucudan hava durumu verilerini alma
fetch('/weather?address=istanbul')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.location);
        console.log(data.forecast.temperature);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // 2.Çalışma: Form gönderildiğinde hava durumu verilerini alma (dinamik fetch isteği) !!rapora eklenecektir.
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle

    const address = weatherInput.value.trim(); // Kullanıcının girdiği adresi al

    if (!address) {
        paragraf.textContent = "Hata: Lütfen bir şehir adı girin. ";
        return console.log("Lütfen bir şehir adı girin.");
    }

    // Dinamik fetch isteği
    fetch(`/weather?address=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                paragraf.textContent = "Hata: " + data.error;
                //console.error('Hata:', data.error);
                return //console.error("Hata:", data.error);
            }
            // Başarıyla veri alındı
            paragraf.textContent = "Konum: " + data.location;
            paragraf2.textContent = "Sıcaklık: " + data.forecast.temperature + "°C";
            //console.log("Konum:", data.location);
            //console.log("Sıcaklık:", data.forecast.temperature);
        })
        .catch(error => {
            paragraf.textContent = "Hata: " + error.message;
            //console.error('İstek sırasında hata:', error);
        });
});