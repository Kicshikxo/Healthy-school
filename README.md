<br/>
<p align="center">
  <a href="https://github.com/Kicshikxo/School-health">
    <img src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/public/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Здоровьесберегающая школа</h3>

  <p align="center">
    Система для отслеживания здоровья учащихся школ, которая объединяет педагогические и медицинские подходы.
  </p>
</p>

### <p align="center">[![Stargazers](https://img.shields.io/github/stars/Kicshikxo/School-health?style=social)](https://google.com) ![License](https://img.shields.io/github/license/Kicshikxo/School-health)</p>

## О проекте

>Проект разработан в рамках стратегии развития образования Курской области

<p>Разработанная информационная система объединяет педагогический и медицинский подходы для сохранения и укрепления здоровья детей.</p>
<p>Она представляет собой совокупность пяти компонентов, включающих медицинского работника, педагога, учителя физкультуры, психолога и социального педагога, позволяя проводить диагностику и выявлять проблемы ребенка.</p>
<p>Каждый компонент системы имеет свою функцию и позволяет анализировать определенные аспекты здоровья обучающихся:

* В компоненте медицинского здоровья собирается информация о медицинских показателях, результаты диагностики, информацию о проблемах и рисках, а также сведения о необходимости сбалансированного питания для школьников.
* В физическом компоненте определяются физические нагрузки и занятия спортом, которые необходимы для поддержания здоровья учащихся. 
* В компоненте педагогического здоровья входит работа учителей-дефектологов, логопедов и других специалистов, направленная на преодоление трудностей в обучении и развитие специфических навыков. 
* В компоненте психологического здоровья собираются и анализируются данные о психологическом состоянии учащихся, их эмоциональном благополучии, уровне стресса, адаптации и социальной компетентности. 
* В компоненте социального здоровья анализируются данные о социальных трудностях, с которыми сталкиваются учащиеся и их семьи. </p>
<p>Система позволяет автоматизировать процесс формирования индивидуальных здоровьесберегающих маршрутов для каждого ребенка, предоставляет развернутые рекомендации и возможность генерировать отчеты и статистику с последующим экспортом в формате PDF.</p>
<p>Проект является ценным инструментом для деференциации образовательного процесса, анализа качества деятельности и принятия управленческих решений, основой сохранения и укрепления здоровья учащихся.</p>

><p>Данный проект был представлен заместителю министра просвещения Российской Федерации на открытии Горшеченской СОШ №1 в городе Горшечное. В ходе презентации проекта заместитель министра отметил, что данная информационная система имеет большое будущее в формате Федерального проекта.</p>
## Скриншоты

<div>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/login.png" alt="login-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/students-list.png" alt="students-list-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/medical-component.png" alt="medical-component-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/pedagogue-component.png" alt="pedagogue-component-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/physical-component.png" alt="physical-component-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/psychological-component.png" alt="psychological-component-component-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/social-component.png" alt="social-component-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/statistics.png" alt="statistics-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/add-user.png" alt="add-user-screenshot"/>
  <img width="49%" src="https://raw.githubusercontent.com/Kicshikxo/School-health/main/assets/screenshots/action-logs.png" alt="action-logs-screenshot"/>
</div>

## Инструменты для создания

<p>При создании системы были использованы следующие инструменты:</p>

* Node v18.12.0 (LTS)
* Nuxt 3
* PrimeVue
* PostgreSQL
* Prisma ORM

## Начало работы

Это пример того, как вы можете развернуть проекта локально. Чтобы настроить и запустить локальную копию, выполните следующие простые шаги:

### Подготовка

Перед установкой необходимо развернуть базу данных PostgreSQL, или воспользоваться бесплатными облачными решениями ([Neon](https://neon.tech/), [Supabase](https://supabase.com/))

### Установка

1. Клонируйте репозиторий:

```sh
git clone https://github.com/Kicshikxo/Healthy-school.git
```

2. Установите NPM пакеты:

```sh
npm install
```

3. Настройте переменные окружения (пример [.env](https://github.com/Kicshikxo/School-health/blob/main/.env.example) файла):

```sh
DATABASE_URL='postgresql://<username>:<password>@<host>:5432/<dbname>'
SECRET_KEY='secret_key'
```

4. Синхронизируйте схему базы данных:

```sh
npm run db:push
```

5. Сидируйте базу данных необходимыми медицинского данными и добавьте базовых пользователей используя cli:

```sh
npm run db:cli
```

### Запуск

После установки пакетов и настройки окружения запустите скрипт dev для старта сервера:

```sh
npm run dev
```

### Сборка

Для сборки проекта необходимо около 1280 МБ оперативной памяти, чтобы её начать необходимо запустить скрипт build:

```sh
npm run build
```

После чего запустить собранный проект используя скрипт preview:

```sh
npm run preview
```

## Лицензия

Распространяется по лицензии WTFPL. Смотрите [LICENSE](https://github.com/Kicshikxo/School-health/blob/main/LICENSE.md) для большей информации.
