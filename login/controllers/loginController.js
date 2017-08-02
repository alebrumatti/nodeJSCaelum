class loginController {
  constructor(app) {
    this.app = app
  }

  app.buscaPorToken(token, (req,res)=>{
    const token = req.body
    const host = req.headers.host

    if(token || host == 'localhost:3002'){
        res.json({msg:'Sucesso, Token Válido!'})
    }else{
        res.status(500).json({msg:'Erro, Token Inválido'})
    }
  })


}
