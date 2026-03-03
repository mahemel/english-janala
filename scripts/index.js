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
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(json => {
            displayLevelWord(json.data)
        })
}

const displayLevelWord = (levelWords) => {

    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    /*
{
    "id": 60,
    "level": 3,
    "word": "Jubilant",
    "meaning": "আনন্দে উৎফুল্ল",
    "pronunciation": "জুবিলান্ট"
}


    */

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
            <h2 class="text-2xl font-bold">${word.word}</h2>
            <p>Meaning /Pronounciation</p>
            <div class="font-bangla font-semibold text-xl">"${word.meaning} / ${word.pronunciation}"</div>

            <div class="flex justify-between items-center">
                <button class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/40" type="button"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn btn-square bg-[#1A91FF]/10 hover:bg-[#1A91FF]/40" type="button"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.appendChild(card)
    })
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    lessons.forEach((lesson) => {
        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>            
        `;

        levelContainer.appendChild(btnDiv)
    })
}

loadLessons();