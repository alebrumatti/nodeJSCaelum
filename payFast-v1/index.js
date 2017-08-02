const app = require('./config/custom-express')()

app.listen(3001, function(){
  console.log(`Servidor em pé em: http://localhost:3001 as ${new Date}`);
  console.log('Para derrubar o servidor: ctrl+c')
})
