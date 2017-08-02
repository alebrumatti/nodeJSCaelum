const app = require('./config/custom-express')()

app.listen(3000, function(){
  console.log(`Servidor em pé em: http://localhost:3000 as ${new Date}`);
  console.log('Para derrubar o servidor: ctrl+c')
})
