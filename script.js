//Link:  https://dictionaryapi.dev/

const resultDiv = document.querySelector('.result');
const wordElement = document.querySelector('.word');
const phonetics = document.querySelector('.phonetics');
const audio = document.querySelector('audio');
const wordDefinition = document.querySelector('.word-definition');
const synonyms = document.querySelector('.synonyms');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

const handle = async (e) => {
    if (e.keyCode === 13) {
        const word = e.target.value;
        // calling by API
        const result = await fetch(url + word);
        if (!result.ok) {
            alert('No definition found!! :)');
            return;
        }
        const data = await result.json();

        resultDiv.style.display = 'block';
        // document.write(JSON.stringify(data));
        wordElement.innerText = data[0].word;
        phonetics.innerText = data[0].phonetics[0].text;
        audio.src = data[0].phonetics[0].audio;
        wordDefinition.innerText = data[0].meanings[0].definitions[0].definition;

        const synonymsArray = data[0].meanings[0].definitions[0].synonyms;
        if (synonymsArray) {
            let synonymsData = "";
            for (let i = 0; i < synonymsArray.length; i++) {
                synonymsData += `<p class="pills">${synonymsArray[i]}</p>`;
            }
            synonyms.innerHTML = synonymsData;
        }
        else{
            synonyms.innerHTML='<p class="pills">No synonyms available</p>';
        }
    }
}
