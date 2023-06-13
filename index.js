// Подключение модуля работы с файловой системой, четение/запись файлов(встроенный модуль)
const fileSystem = require('fs');
// Модуль работы с путями к файлам(встроенный модуль)
const path = require('path');
// Пожключение Axios для получения данных по протоколу http (внещний модуль, нужна установка)
const axios = require('axios')
// Модуль базового http-сервера(встроенный модуль)
const http = require('http')

// Использование resolve поможет учесть особенности путей в разных операционных системах ш 
// fileSystem.writeFile(path.resolve('one.txt'),'Hellow, One!','utf-8',(err)=>{
//     if (err) {
//         throw err;
//     }else{
//         console.log('Write file is done!');
//     }
// });

// fileSystem.readFile(path.resolve('one.txt'),'utf-8',(err,data)=>{
//     if (err){
//         throw err;
//     }else{
//         console.log(data)
//     }
// })

// ;()() - позволяет описать и вызвать стрелочную функцию.
// ;(async () => {
//     // {} - деструктуризация объекта для дальнейшей обработки
//     const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
//     fileSystem.writeFile(path.resolve(__dirname, 'one.json'), JSON.stringify(data), 'utf-8', (err)=>{
//         if (err) {
//             throw err;
//         }else{
//             console.log('Write file is done!');
//         }
//     });
// })();

// Запуск веб-сервера на порту 3000
http
    .createServer((request, response) => {
        response.setHeader("Content-Type","text/html; charset=utf-8;")
        switch (request.url) {
            case '/':
                response.write(`Root`);
                break;
            case '/user':
                response.write(`User`);
                break;
            case '/posts':
                response.write(`Post`);
                break;
            default:
                response.write(`Unknown request. (${request.url})`);
                break;
        }
        response.end();

    })
    .listen(3000);