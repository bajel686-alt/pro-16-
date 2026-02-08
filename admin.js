// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    loadStatsForm();
    displayNewsList();
});

// Проверка авторизации
function checkAuthentication() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const userRole = sessionStorage.getItem('userRole');
    const username = sessionStorage.getItem('username');
    
    if (!isAuthenticated || isAuthenticated !== 'true') {
        // Перенаправляем на главную страницу, если не авторизован
        window.location.href = 'index.html';
        return;
    }
    
    // Отображаем информацию о пользователе
    document.getElementById('userInfo').textContent = `👤 ${userRole}: ${username}`;
}

// Выход из системы
function logout() {
    if (confirm('Сиз чындап эле системадан чыгуу каалайсызбы?')) {
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('username');
        window.location.href = 'index.html';
    }
}

// Загрузка статистики в форму
function loadStatsForm() {
    document.getElementById('students').value = schoolStats.students;
    document.getElementById('teachers').value = schoolStats.teachers;
    document.getElementById('classrooms').value = schoolStats.classrooms;
    document.getElementById('clubs').value = schoolStats.clubs;
}

// Обновление статистики
function updateStats(event) {
    event.preventDefault();
    
    schoolStats.students = document.getElementById('students').value;
    schoolStats.teachers = document.getElementById('teachers').value;
    schoolStats.classrooms = document.getElementById('classrooms').value;
    schoolStats.clubs = document.getElementById('clubs').value;
    
    saveData();
    showSuccessMessage();
}

// Отображение списка новостей в админ-панели
function displayNewsList() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    
    if (newsData.length === 0) {
        newsList.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 2rem;">Жаңылыктар жок</p>';
        return;
    }
    
    newsData.forEach((news) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <div class="news-item-header">
                <div style="flex: 1;">
                    <div class="news-item-date">${news.icon} ${news.date}</div>
                    <h3>${news.title}</h3>
                </div>
                <div class="news-item-actions">
                    <button class="btn btn-primary btn-small" onclick="editNews(${news.id})">
                        ✏️ Өзгөртүү
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteNews(${news.id})">
                        🗑️ Өчүрүү
                    </button>
                </div>
            </div>
            <p class="news-item-desc">${news.description}</p>
        `;
        
        newsList.appendChild(newsItem);
    });
}

// Добавление новой новости
function addNews(event) {
    event.preventDefault();
    
    const icon = document.getElementById('newsIcon').value;
    const date = document.getElementById('newsDate').value;
    const title = document.getElementById('newsTitle').value;
    const description = document.getElementById('newsDescription').value;
    
    // Находим максимальный ID
    const maxId = newsData.length > 0 ? Math.max(...newsData.map(n => n.id)) : 0;
    
    const newNews = {
        id: maxId + 1,
        icon: icon,
        date: date,
        title: title,
        description: description,
        link: '#'
    };
    
    newsData.unshift(newNews); // Добавляем в начало массива
    saveData();
    displayNewsList();
    
    // Очищаем форму
    document.getElementById('addNewsForm').reset();
    showSuccessMessage();
}

// Редактирование новости
function editNews(id) {
    const news = newsData.find(n => n.id === id);
    if (!news) return;
    
    document.getElementById('editNewsId').value = news.id;
    document.getElementById('editNewsIcon').value = news.icon;
    document.getElementById('editNewsDate').value = news.date;
    document.getElementById('editNewsTitle').value = news.title;
    document.getElementById('editNewsDescription').value = news.description;
    
    document.getElementById('editNewsModal').classList.add('active');
}

// Сохранение отредактированной новости
function saveEditedNews(event) {
    event.preventDefault();
    
    const id = parseInt(document.getElementById('editNewsId').value);
    const newsIndex = newsData.findIndex(n => n.id === id);
    
    if (newsIndex === -1) return;
    
    newsData[newsIndex].icon = document.getElementById('editNewsIcon').value;
    newsData[newsIndex].date = document.getElementById('editNewsDate').value;
    newsData[newsIndex].title = document.getElementById('editNewsTitle').value;
    newsData[newsIndex].description = document.getElementById('editNewsDescription').value;
    
    saveData();
    displayNewsList();
    closeEditModal();
    showSuccessMessage();
}

// Удаление новости
function deleteNews(id) {
    if (confirm('Сиз чындап эле бул жаңылыкты өчүрүүнү каалайсызбы?')) {
        newsData = newsData.filter(n => n.id !== id);
        saveData();
        displayNewsList();
        showSuccessMessage();
    }
}

// Закрытие модального окна редактирования
function closeEditModal() {
    document.getElementById('editNewsModal').classList.remove('active');
}

// Показать сообщение об успехе
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('active');
    
    setTimeout(() => {
        message.classList.remove('active');
    }, 3000);
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('editNewsModal');
    if (event.target === modal) {
        closeEditModal();
    }
}

// Закрытие модального окна по клавише ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEditModal();
    }
});