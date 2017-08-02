const app = require('./config/custom-express')()

app.listen(3003, function(){
  console.log(`Servidor de autenticação em pé em: http://localhost:3001 as ${new Date}`);
  console.log('Para derrubar o servidor: ctrl+c')
})
