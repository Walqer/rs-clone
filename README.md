RS CLONE

install dependencies with $ npm i

MiniTrello FrontEnd **+620**
---
#### Главная страница **+80** (Main page)

-   Виджет аутентификации с редиректом на страницу регистрации пользователя. Поле логин виджета, копирует значение в поле логин страницы регистрации **(+20)**
-   Есть прелоадер. Срабатывает при каждом запросе к серверу **(+20)**
-   Реализован роутинг **(+20)**
-   Дизайн адаптивен и  выполнен в едином стиле **(+20)**

---

#### Страница аутентификации **+100** (Log in / Sign up)

-   Регистрация пользователя **(+20)**
-   Аутентификация **(+20)**
-   Валидация формы
    -   Поле не может быть пустым **(+20)**
    -   Поле должно содержать: минимум 3, масимум 20 (для логина и имени), максимум 32 (для пароля) символа **(+20)**
    -   Поля пароль и подтверждение пароля при регистрации должны совпадать **(+20)**

---

#### Страница с досками **+100** (Workspace)

-   Создание доски **(+30)**
-   Выбор цвета доски **(+30)**
-   Удаление доски **(+20)**
-   Возможность добавлять доску в избранное **(+20)**

---

#### Страница доски **+200** (Board)

-   Создание колонки с тасками **(+30)**
-   Удаление колонки **(+20)**
-   Изменение имени колонки **(+20)**
-   Колонки можно перемещать (drag'n'drop) **(+40)**
-   Создание таска **(+20)**
-   Таски можно перемещать внутри колонки, в другие колонки и в пустую колонку (drag'n'drop) **(+40)**
-   Управление доступом к доске, участник может добавить и удалить пользователей к доске, удалить себя или владельца доски невозможно  **(+30)**
---

#### Модальное окно с описание таска **+60** (Task)

-   Имя таска можно изменять при клике на имя. Для подтверждения нужно выйти из фокуса инпута **(+20)**
-   Возможность добавить описание таска. Для подтверждения нужно выйти из фокуса инпута **(+20)**
-   Таск можно удалить **(+20)**

---

#### Кабинет пользователя **+60** (Manage accaunt)

-   Смена имени. Для смены требуется подтверждение пароля **(+20)**
-   Смена пароля. Для смены требуется подтверждения текущего пароля **(+20)**
-   Возможность удалить аккаунт. После удаление происходит редирект на главную страницу **(+20)**

---

#### Страница 404 **+20**

-   При несуществующей старнице происходит редирект на 404 страницу **(+20)**

---
MiniTrello BackEnd 
---
ссылка на back-end - https://github.com/errfrost/final-task-backend

NodeJS + MongoDB

Back-end поднят на сервисах Railway и Render, бесплатные версии которых не отличаются большой скоростью, так же как и бесплатная база данных на MongoDB. Скорость работы приложения напрямую зависит от этих сервисов, поэтому возможны подвисания в работе.

За основу взят Back-end для final-task курса по React - https://github.com/rolling-scopes-school/final-task-backend

Оригинальный back-end был доработан следующим функционалом

-   добавлены поля к доскам:

    -   bgСolor - реализован функционал, позволяющий получать и изменять цвет доски 
    -   bgImg - реализован функционал, позволяющий получать и изменять фоновую картинку у доски 
    -   usersFavourite - реализован функционал, позволяющий получать, добавлять и удалять доски в избранное у пользователя 

-   все имеющиеся функции back-end обновлены с учетом появления новых полей 

-   в оригинальном backend-е не было возможности обновлять поля по отдельности, написан функционал для такого обновления и соответствующие функции:
    -   updateBoardColor 
    -   updateBoardImg 
    -   updateBoardFavourites 
    -   updateBoardUsers 
    -   updateBoardTitle 
    -   updateTaskTitle 
    -   updateTaskDescription 
    -   updateTaskOrder 
    -   updateTaskUsers 
    -   updateTaskColumnId
