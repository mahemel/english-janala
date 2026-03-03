const pronounceWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

//loading all the lessons
const loadLessons = async () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';

    // const response = await fetch(url);
    // const json = await response.json();
    fetch(url)
        .then(response => response.json())
        .then(json => {
            displayLesson(json.data);
        })
}
//Loading level word
const loadLevelWord = (id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(json => {
            removeActive();
            const clickedBtn = document.getElementById(`lesson-btn-${id}`);
            clickedBtn.classList.add('active');

            displayLevelWord(json.data);
            manageSpinner(false);
        })
}
const removeActive = () => {
    const btns = document.querySelectorAll('.lesson-btn');

    btns.forEach(btn => {
        btn.classList.remove('active')
    })
}

const displayLevelWord = (levelWords) => {

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(levelWords.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full font-bangla space-y-2">
            <img src="assets/alert-error.png" class="mx-auto" alt="" />
            <p class="font-medium text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-xl font-bold">নেক্সট Lesson এ যান</h2>
        </div>        
        `;

        return;
    }

    levelWords.forEach(word => {

        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white text-center rounded-xl shadow-sm py-8 px-6 space-y-4">
            <h2 class="text-xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p>Meaning /Pronounciation</p>
            <div class="font-bangla font-semibold text-xl">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'Pronounciation পাওয়া যায়নি'}"</div>

            <div class="flex justify-between items-center">
                <button class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/40" type="button" onclick="loadWordDetail(${word.id})"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/40" type="button" onclick="pronounceWord('${word.word}')"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.appendChild(card)
    })
}
const loadWordDetail = async (id) => {
    // my_modal_5.showModal()
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const response = await fetch(url);
    const details = await response.json();

    displayWordDetails(details.data)
}

const manageSpinner = (status) => {
    if(status) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    } else {

        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}

const displayWordDetails = (word) => {
    console.log(word)
    const detailsContainer = document.getElementById('details-container');
    
    const synonymsArr = word.synonyms;
    let synonymsHTMLElms = 'সমার্থক শব্দ পাওয়া যায়নি';

    if(synonymsArr.length > 0) {
        const synonymsElms = synonymsArr.map(element => `<span class="btn bg-blue-100 text-black">${element}</span>`);
        synonymsHTMLElms = synonymsElms.join('');
    }

    detailsContainer.innerHTML = `
        <div class="space-y-4">
            <h2 class="text-xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation ? word.pronunciation : 'Pronounciation পাওয়া যায়নি'})</h2>
            <div>
                <h3 class="font-semibold">Meaning</h3>
                <p class="font-bangla">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'}</p>
            </div>

            <div>
                <h3 class="font-semibold">Example</h3>
                <p>${word.sentence ? word.sentence : 'Example পাওয়া যায়নি'}</p>
            </div>

            <div>
                <h3 class="font-bangla font-semibold">সমার্থক শব্দ গুলো</h3>
                <div class="synonyms flex flex-wrap gap-4">
                    ${synonymsHTMLElms}
                </div>
            </div>
        </div>
    `;

    document.getElementById('word_modal').showModal();

}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    lessons.forEach((lesson) => {
        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>            
        `;

        levelContainer.appendChild(btnDiv)
    })
}

loadLessons();

document.getElementById('btn-serach').addEventListener('click', () => {
    removeActive()
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(response => response.json())
        .then(json => {
            const allwords = json.data;

            if(searchValue.length < 1) {
                displayLevelWord([]);
                return;
            }

            const filterWords = allwords.filter(word => 
                word.word.trim().toLowerCase().includes(searchValue)
            );

            displayLevelWord(filterWords)
        })
})