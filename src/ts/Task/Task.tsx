import React from 'react';

export class Task extends React.Component<{}, {}> {
  render(): React.ReactElement {
    return (
      <div className="border">
        <p>
          Приложение для учета расходов Цель: В результате работы вы создадите
          прототип приложения для учета расходов Здесь вы на практике
          используйте свои наработки из прошлых заданий, плюс поработаете с
          подключением и использвоанием новых библиотек
        </p>
        <p>В процессе работы вы потренируете</p>
        <p>
          использование сторонних (и своих) библиотек работу с клиентским
          роутингом в реакте Нужно сделать приложение для учета расходов: На
          странице настроек можно заводить категории, и у каждой могут быть
          подкатегории (вложенность категорий можно ограничить 2, но, если очень
          хочется, то можно и не ограничивать) В каждую категорию или
          подкатегорию на определенную дату можно вносить сумму которую
          пользователь потратил, если в подкатегории есть расходы, то они должны
          учитываться и в категории.
        </p>
        <p>
          Например: Категория &quot;Машина&quot; имеет 2 подкатегории
          &quot;Сервис&quot; &quot;Заправка&quot;
        </p>
        <p>
          Если на одно и тоже число на &quot;сервис&quot; потрачено 20 единиц, а
          на &quot;заправку&quot; 10 единиц, то суммарные затраты на это число
          для категории &quot;машина&quot; должны быть 20 + 10 =30 единиц. Если
          на это число пользователь не выбрал подкатегорию и занес затраты 5
          единиц просто в категорию “машина”, то эти затраты должны тоже
          учитываться и тогда суммарные затраты - 20 + 10 + 5 = 35 единиц
        </p>
        <p>
          Нужно иметь возможность выводить расходы за день за неделю за месяц и
          за произвольный промежуток времени вывод таблицей и диаграммой (pie
          chart) Для IOS есть похожее приложение{' '}
          <a href="https://www.dropbox.com/sh/ayn0gfelhele0nc/AABnZcOcGcIowrGzqZehUSESa/Screenshots/Russian?dl=0#/">
            https://www.dropbox.com/sh/ayn0gfelhele0nc/AABnZcOcGcIowrGzqZehUSESa/Screenshots/Russian?dl=0#/
          </a>
        </p>
        <p>
          не стоит возиться с дизайном, можно просто взять 1 из тем с{' '}
          <a href="https://bootswatch.com/">https://bootswatch.com/</a>
        </p>
        <p>
          Хранение данных должно быть сделано в базе Firebase ({' '}
          <a href="https://react-firebase-js.com/">
            https://react-firebase-js.com/
          </a>{' '}
          ). База должна быть независимой для каждого пользователя (поддержка
          авторизации через react-firebase)
        </p>
        <p>Ожидаемые страницы:</p>
        <p>
          ** главная (с заглушкой для не зарегистрированных пользователей) о
          проекте страница логина / регистрации
        </p>
        <p>Остальные страницы должны быть доступны после авторизации:</p>
        <p>
          настройки главная (где можно добавлять доходы и расходы, просматривать
          данные за последнюю неделю) просмотр данных за
          неделю/месяц/произвольный период. Просмотр в виде таблицы или
          диаграммы (
          <a href="https://react-google-charts.com/">
            https://react-google-charts.com/
          </a>
          ) - период и тип * просмотра должен отображаться на урл, чтобы
          состояние можно было сохранить При попытке входа на страницу без
          регистрации должен быть редирект на страницу логина
        </p>
        <p>Задание выполняется в новом репозитории Критерии оценки:</p>
        <p>Критерии оценки</p>
        <p>
          приложение поддерживает авторизацию приложение поддерживает создание
          категорий и под-категорий приложение поддерживает ввод данных
          приложение поддерживает просмотр статистики приложение хранит данных
          отдельно для каждого пользователя покрытие кода от 60% приложение
          доступно для просмотра и проверки на github pages Задание не
          проверяется при не соответствии базовым требованиям к заданию
        </p>
      </div>
    );
  }
}
