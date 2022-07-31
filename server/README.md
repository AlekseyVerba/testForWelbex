## Интерфейсы
- IUser
```json
{
    "id": "number",
    "name": "string",
    "entries": "IEntry[]"
}
```

- IEntry
```json
{
    "id": "number",
    "message": "string",
    "files": "string[]",
    "createdAt": "Date",
    "user": "IUser"
}
```

## Список API endpoint

**auth**
    
**POST** /auth/registration - **Регистрация пользователя**

```json
{
    "name": {
        "required": true,
        "minLength": 3,
        "type": "string"
    },
    "password": {
        "required": true,
        "minLength": 3,
        "maxLength": 15,
        "type": "string"
    }
}
```


EXAMPLE:
```json
{
  "name": "user",
  "password": "qwerty1234",
}
```

RETURN:

STATUS: 201 - Пользователь успешно создан
```json
{
  "status": true,
  "message": "Успешно",
}
```

ИЛИ

STATUS: 409 - Пользователь уже существует
```json
{
  "status": false,
  "message": "Пользователь с данным name уже существует"
}
```

---
**POST** /auth/login - **Вход в систему**

```json
{
    "name": {
        "required": true,
        "minLength": 3,
        "type": "string"
    },
    "password": {
        "required": true,
        "minLength": 3,
        "maxLength": 15,
        "type": "string"
    }
}
```

EXAMPLE:
```json
{
  "name": "user",
  "password": "qwerty1234",
}
```

RETURN:

STATUS: 201 - Данные верны
```json
{
  "status": true,
  "message": "Успешно",
  "data": {
      "user": IUser,
      "token": "string"
  }
}
```

ИЛИ

STATUS: 400 - Данные не верны
```json
{
  "status": false,
  "message": "Неверные данные"
}
```

---
**GET** /auth/check - **Проверка пользователя на авторизованность**
  
  HEADER: ```Authorization: Bearer {token}```

RETURN:

STATUS: 200 - Пользователь авторизован

```json
{
  "status": true,
  "message": "Успешно",
  "data": {
      "user": IUser,
      "token": "string"
  }
}
```

ИЛИ

STATUS: 403 - Пользователь не авторизован
```json
{
   "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
```

**entry**


---
**GET** /entry?offset=10&limit=10 - **Получить записи**
- 
- **offset, limit** - опциональны
- **offset** - отступ поиска
- **limit** - количество записей


RETURN:

STATUS: 200 - Записи получены
```json
{
    "status": true,
    "message": "Успешно",
    data: IEntry[]
}
```

---
**GET** /entry/{id} - **Получить запись по id**
  
  RETURN:

STATUS: 200 - Запись получена
  ```json
{
    "status": true,
    "message": "Успешно",
    data: IEntry
}
```

ИЛИ

STATUS: 404 - Пост не найден
```json
{
  "status": false,
  "message": "Пост не найден"
}
```

---
**POST** /entry/create - **Создать запись**

**Необходима авторизация**
  HEADER: ```Authorization: Bearer {token}``` 

```json
{
    "message": {
        "required": false,
        "type": "string"
    },
    "files": {
        "required": false,
        "type": File[],
        "max": 5
    }
}
```

EXAMPLE:
```json
{
  "message": "Тестовая запись",
  "files": [
      {
        "fieldname": "files",
        "originalname": 'wallpaperbetter (1).jpg',
        "encoding": '7bit',
        "mimetype": 'image/jpeg',
        "buffer": <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 04 04 04 04 04 04 05 05 05 05 07 07 06 07 07 0a 09 08 08 09 0a 0f 
    0a 0b 0a ... 122477 more bytes>,
        "size": 122527
      },
      {
        "fieldname": 'files',
        "originalname": 'wallpaperbetter.jpg',
        "encoding": '7bit',
        "mimetype": 'image/jpeg',
        "buffer": <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 05 05 05 05 05 05 05 06 06 05 08 08 07 08 08 0b 0a 09 09 0a 0b 11 
    0c 0d 0c ... 426348 more bytes>,
        size: 426398
      }
  ],
}
```

  RETURN:

STATUS: 201 - Запись создана
  ```json
{
    "status": true,
    "message": "Успешно",
    "data": IEntry
}
```


---
**PUT** /entry/{id} - **Редактировать запись**

**Необходима авторизация**
  HEADER: ```Authorization: Bearer {token}``` 
  
  ```json
{
    "message": {
        "required": false,
        "type": "string"
    },
    "files": {
        "required": false,
        "type": File[],
        "max": 5
    }
}
```

EXAMPLE:
```json
{
  "message": "Тестовая запись",
  "files": [
      {
        "fieldname": "files",
        "originalname": 'wallpaperbetter (1).jpg',
        "encoding": '7bit',
        "mimetype": 'image/jpeg',
        "buffer": <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 04 04 04 04 04 04 05 05 05 05 07 07 06 07 07 0a 09 08 08 09 0a 0f 
    0a 0b 0a ... 122477 more bytes>,
        "size": 122527
      },
      {
        "fieldname": 'files',
        "originalname": 'wallpaperbetter.jpg',
        "encoding": '7bit',
        "mimetype": 'image/jpeg',
        "buffer": <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 01 00 00 01 00 01 00 00 ff db 00 84 00 05 05 05 05 05 05 05 06 06 05 08 08 07 08 08 0b 0a 09 09 0a 0b 11 
    0c 0d 0c ... 426348 more bytes>,
        size: 426398
      }
  ],
}
```

  RETURN:

STATUS: 201 - Запись редактирована
  ```json
{
    "status": true,
    "message": "Успешно",
    "data": IEntry
}
```

ИЛИ

STATUS: 404 - Не найдена запись, либо у вас нету прав
  ```json
{
    "status": false,
    "message": "Не найдена запись, либо у вас нету прав",
}
```

---
**DELETE** /entry/{id} - **Удалить запись**

**Необходима авторизация**
  HEADER: ```Authorization: Bearer {token}``` 


  RETURN:

STATUS: 200 - Запись удалена
  ```json
{
    "status": true,
    "message": "Успешно",
}
```

ИЛИ

STATUS: 404 - Не найдена запись, либо у вас нету прав
  ```json
{
    "status": false,
    "message": "Не найдена запись, либо у вас нету прав",
}
```


---
**DELETE** /entry/delete-file/{id} - **Удалить файл у записи**
**Необходима авторизация**
  HEADER: ```Authorization: Bearer {token}``` 

  ```json
{
    "path": {
        "required": true,
        "type": "string"
    }
}
```

EXAMPLE:

  ```json
{
    "path": "jpg/dhdnsfwtyewryer.jpg"
}
```

  RETURN:

STATUS: 200 - Файл удален
  ```json
{
    "status": true,
    "message": "Успешно",
}
```

ИЛИ

STATUS: 404 - Файл не найден
  ```json
{
    "status": false,
    "message": "Файл не найден",
}
```


