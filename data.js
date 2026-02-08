// Данные для сайта (редактируются только через админ-панель)

// Учетные данные (ВАЖНО: В реальной системе это должно храниться на сервере!)
const ADMIN_CREDENTIALS = {
    director: {
        username: 'director',
        password: 'director2026',
        role: 'Директор'
    },
    admin: {
        username: 'admin',
        password: 'admin2026',
        role: 'Администратор'
    }
};

// Статистика школы
let schoolStats = {
    students: '800+',
    teachers: '50+',
    classrooms: '15+',
    clubs: '10+'
};

// Новости
let newsData = [
    {
        id: 1,
        icon: '📚',
        date: '2 Февраль, 2026',
        title: 'Жаңы окуу жылы башталды',
        description: '2025-2026 окуу жылы ийгиликтүү башталды. Бардык окуучуларга жаңы жетишкендиктерди каалайбыз!',
        link: '#'
    },
    {
        id: 2,
        icon: '🏆',
        date: '28 Январь, 2026',
        title: 'Олимпиададагы жетишкендиктер',
        description: 'Окуучуларыбыз математика олимпиадасында бирден-бир орундарды ээледи. Алар менен сыймыктанабыз!',
        link: '#'
    },
    {
        id: 3,
        icon: '💻',
        date: '15 Январь, 2026',
        title: 'STEM кабинетинин ачылышы',
        description: 'Жаңы STEM кабинетибиз ачылды. Окуучулар азыр заманбап технологиялар менен иштей алышат.',
        link: '#'
    }
];

// Функция для сохранения данных в localStorage
function saveData() {
    localStorage.setItem('schoolStats', JSON.stringify(schoolStats));
    localStorage.setItem('newsData', JSON.stringify(newsData));
}

// Функция для загрузки данных из localStorage
function loadData() {
    const savedStats = localStorage.getItem('schoolStats');
    const savedNews = localStorage.getItem('newsData');
    
    if (savedStats) {
        schoolStats = JSON.parse(savedStats);
    }
    
    if (savedNews) {
        newsData = JSON.parse(savedNews);
    }
}

// Загружаем данные при загрузке страницы
loadData();