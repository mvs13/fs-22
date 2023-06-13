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


async function getData(url)
{
    let result="nothing";
    try {
        const {data} = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error)
        result = "";
        return result;
    }
    
}

function writeData(filename, data)
{
    fileSystem.writeFile(path.resolve(__dirname,filename), JSON.stringify(data), 'utf-8', (err)=>{
        if (err) {
            throw err;
        }else{
            console.log(`Write file ${filename} was done!`);
        }
    });
}

async function prepareResponse(url, filename)
{
    let response = "";
    let answer = await getData(url);
    if (answer != ""){
        response = `Data get OK`;
        console.log(answer);
        writeData(filename, answer);
    }else{
        response = `Errors occurred while receiving data`;
    }
    return response;
}

// Запуск веб-сервера на порту 3000
http
    .createServer(async (request, response) => {
        let responseText = "";
        let url = "";
        response.setHeader("Content-Type","text/html; charset=utf-8;")
        switch (request.url) {
            case '/':
                response.write(`<h1>Root</h1>`);
                response.write(`<ul>`);
                response.write(`<li><a href="/user">User</a></li>`);
                response.write(`<li><a href="/posts">Posts</a></li>`);
                response.write(`</ul>`);
                break;
            case '/user':
                url = "https://jsonplaceholder.typicode.com/users";
                responseText = await prepareResponse(url, "users.json")
                response.write(`<h1>User</h1>`);
                response.write(`<p>${responseText}</p>`)
                response.write(`<a href="/">Root</a>`);
                break;
            case '/posts':
                url = "https://jsonplaceholder.typicode.com/posts";
                responseText = await prepareResponse(url, "posts.json")
                response.write(`<h1>Post</h1>`);
                response.write(`<p>${responseText}</p>`)
                response.write(`<a href="/">Root</a>`);
                break;
            default:
                response.write(`Unknown request. (${request.url})`);
                break;
        }
        response.end();

    })
    .listen(3000);