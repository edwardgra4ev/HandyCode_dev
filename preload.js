// Все из Node.js API доступны в процессе предварительной загрузки.
// Он имеет ту же песочницу, что и расширение Chrome.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


function Readjson(){
  // Чтение json файла
  var fs = require('fs');
  var tree_json = JSON.parse(fs.readFileSync(`${__dirname}\\dist\\json\\tree.json`, 'utf8'));
  return tree_json
}

function getIcons(language){
  var fs = require('fs');
  var icons_json = JSON.parse(fs.readFileSync(`${__dirname}\\dist\\json\\material-icons.json`, 'utf8'));
  for(i in icons_json["iconDefinitions"]){
    if(language == i)
    {
      return icons_json["iconDefinitions"][i]["iconPath"]
    }
  }
}


window.onload = function JsonParser({tree_json = Readjson()}){
  // парсинг json
  // находим онсовной див  
  var main = document.createElement("div")
  main.setAttribute("id", "main")
  var tree = document.getElementById("tree")
  var div = document.createElement("div")
  for(language in tree_json){
    var div = document.createElement("div")
    div.setAttribute("id", language)
    // создаем тег h
    var h = document.createElement("h4")
    // получаем путь жо иконки
    var icon = getIcons(tree_json[language]["icon"]);
    // создаем тег img
    var img = document.createElement("img")
    // вставляем в img иконку
    img.setAttribute("src",`${__dirname}/${icon}`)
    // вставляем в h текст
    h.textContent = language
    // добавляем в h 
    h.appendChild(img)
    h.setAttribute("class", "language_title")
    // добавляем h в основной div
    div.appendChild(h)
    // проходимся по всем заметкам  в языке
    for(cild in tree_json[language]["snippets"]){
      var cildren = tree_json[language]["snippets"][cild];
      for(i in cildren){
        // получаем название заметки
        // создаем тег p
        var p = document.createElement("p")
        var title = i
        // создаем кнопку
        var button = document.createElement("button")
        // устанавливаем текст кнопки
        button.appendChild(document.createTextNode(title));
        button.setAttribute("id", "snippets_button")
        // добавляем кнопку в основной p
        p.appendChild(button)
        // добавляем p в основной div
        div.appendChild(p)
        // получаем теги заметки 
        var tag = cildren[i]["tag"]
        // получаем описание заметки
        var description = cildren[i]["description"]
        // получаем код из заметки 
        var code = cildren[i]["code"]
      }
    }
    main.appendChild(div)
    tree.appendChild(main)
  }  
// поиск по древу
  var search = document.getElementById('search_tree');
  search.oninput = function () {
    //получаем результат работы функции
    result =  searchTreeJSON(search.value)
    //если результат пустой
    if(result == false){
    //  проверяем есть ли div main
      if( document.getElementById("main")){
        // если есть то удаляем
        document.getElementById("main").remove();
      }
      // загружаем стандарнтый json
      JsonParser()
    }
  }
}

function searchTreeJSON(search){
  var text = search.toLowerCase()
  var tree_json = Readjson()
  // есть совпадение
  var search = false;
  // проходимся по языкам
  for(language in tree_json){
    // если текст не соответсвует языку
    if(language.toLowerCase().indexOf(text) == -1){
      search = false;
      // delete tree_json[language];
      // JsonParserSearch(tree_json)
      // проходимся по заметкам
      for(cild in tree_json[language]["snippets"]){
        var cildren = tree_json[language]["snippets"][cild];
          for(i in cildren){
          // если название заметки не совпадает с тестом
            if(i.toLowerCase().indexOf(text) == -1){
              search = false;
            // если описание не соответсвует тексту
              if(cildren[i]["description"].toLowerCase().indexOf(text) == -1){
                search = false;
              // проходимся по тегам
                for(j in cildren[i]["tag"]){
                // если тэг соответсвует тексту
                  if(cildren[i]["tag"][j].toLowerCase().indexOf(text) == 0){
                    search = true
                  }
                }  
              }
            else{
              search = true
            }
          }
          else{
            search = true
          }
          if(search == false){
            // если заметка не подошла то удаляем
            delete tree_json[language]["snippets"][0][i];
            }
        }
      }
    }
    else{
      search = true
    }
    if (JSON.stringify(tree_json[language]["snippets"][0]).length == 2) {
      // если в языке нет заметки то удаляем язык
      delete tree_json[language];
    }
    
  } 
  // если не пустой то отрисоываем его
  if(JSON.stringify(tree_json).length > 2){
    JsonParserSearch(tree_json)
    return true
  }
  else{
    return false
  }
}



function JsonParserSearch(tree_json){
  try{
    if(document.getElementById("main")){
    document.getElementById("main").remove();
    }
  }
  finally{
  // парсинг json
  var main = document.createElement("div")
  main.setAttribute("id", "main")
  // находим онсовной див  
  var tree = document.getElementById("tree")
  var div = document.createElement("div")
  for(language in tree_json){
    var div = document.createElement("div")
    div.setAttribute("id", language)
    // создаем тег h
    var h = document.createElement("h4")
    // получаем путь жо иконки
    var icon = getIcons(tree_json[language]["icon"]);
    // создаем тег img
    var img = document.createElement("img")
    // вставляем в img иконку
    img.setAttribute("src",`${__dirname}/${icon}`)
    // вставляем в h текст
    h.textContent = language
    // добавляем в h 
    h.appendChild(img)
    h.setAttribute("class", "language_title")
    // добавляем h в основной div
    div.appendChild(h)
    // проходимся по всем заметкам  в языке
    for(cild in tree_json[language]["snippets"]){
      var cildren = tree_json[language]["snippets"][cild];
      for(i in cildren){
        // получаем название заметки
        // создаем тег p
        var p = document.createElement("p")
        var title = i
        // создаем кнопку
        var button = document.createElement("button")
        // устанавливаем текст кнопки
        button.appendChild(document.createTextNode(title));
        button.setAttribute("id", "snippets_button")
        // добавляем кнопку в основной p
        p.appendChild(button)
        // добавляем p в основной div
        div.appendChild(p)
        // получаем теги заметки 
        var tag = cildren[i]["tag"]
        // получаем описание заметки
        var description = cildren[i]["description"]
        // получаем код из заметки 
        var code = cildren[i]["code"]
      }
    }
    main.appendChild(div)
    tree.appendChild(main)
  }
}  
}