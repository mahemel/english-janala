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

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    lessons.forEach((lesson) => {
        const btnDiv = document.createElement('div');

        btnDiv.innerHTML = `
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>            
        `;

        levelContainer.appendChild(btnDiv)
    })
}

loadLessons()