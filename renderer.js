// Этот файл необходим для index.html файл и завещание
// будет выполняться в процессе визуализации для этого окна.
// Нет Node.js API-интерфейсы доступны в этом процессе, потому что
// `// `Интеграция узлов " отключена. Используйте `preload.js` для
// выборочного включения функций, необходимых для рендеринга
// процесс.

const notification = {
    title: 'Basic Notification',
    body: 'Short message part'
  }
  
  const notificationButton = document.getElementById('add_snippets')
  
  notificationButton.addEventListener('click', () => {
    const myNotification = new window.Notification(notification.title, notification)
  
    myNotification.onclick = () => {
      console.log('Notification clicked')
    }
  })