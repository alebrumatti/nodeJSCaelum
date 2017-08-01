class PagamentoController {
  constructor(app) {
    this.app = app
  }

  atualiza(req,res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)
    const pagamento = req.body
    const id = req.params.id

    pagamento.status = 'ALTERADO'
    pagamento.data = new Date

    pagamentoDao.atualiza(id,pagamento, (err, result,fields)=>{
      if(!err){
        res.json(pagamento)
      }else {
        res.json(err)
      }
    })
  }

  exclui(req,res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)
    const id = req.params.id

    pagamentoDao.exclui(id, (err, result,fields)=>{
      if(!err){
        res.json(id)
      }else {
        res.json(err)
      }
    })
  }

  lista(req, res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)

    pagamentoDao.lista((err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }

    })
  }

  buscaPorId(req, res) {
    const connection = this.app.persistencia.connectionFactory()
    const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)
    const id = req.params.id

    pagamentoDao.buscaPorId(id, (err, result, fields) => {
      if (!err) {
        res.json(result)
      } else {
        res.status(404).json(err)
      }
    })
  }

  salva(req, res) {
    const pagamento = req.body
    let errors = false
    pagamento.status = "CRIADO"
    pagamento.date = new Date

    //validação dos dados de entrada
    req.assert("forma_de_pagamento","Campo 'forma_de_pagamento' é de preenchimento obrigatório").notEmpty()
    req.assert("valor","Campo 'valor' é de preenchimento obrigatório").notEmpty()
    req.assert("valor","Campo 'valor' deve ser um decimal").isFloat()
    req.assert("moeda","Campo 'moeda' é de preenchimento obrigatório").notEmpty().len(3,3)
    req.assert("moeda","Campo 'moeda' deve ter 3 caracteres").len(3,3)

    errors = req.validationErrors()

    if(!errors) {
      const connection = this.app.persistencia.connectionFactory()
      const pagamentoDao = new this.app.persistencia.PagamentoDao(connection)
      //const pagamentoDao = new app.persistencia.PagamentoDAOComp(connection)

      //Incluindo resposta 'link' para as demais ações da API
      pagamentoDao.salva(pagamento, (err, result, fields) => {
        if (!err) {
          const resposta = {
            data: pagamento,
            links: [
              {
                method: 'PUT',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'cofirma'
              },
              {
                method: 'DELETE',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'cancelar'
              },
              {
                method: 'GET',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'confirma'
              },
              {
                method: 'PATCH',
                href: `http://localhost:3000/pagamento/${result.insertId}`,
                rel: 'cofirma'
              },
              {
                method: 'OPTION',
                href: `http://localhost:3000/pagamento`,
                rel: 'head'
              }
            ]
          }
          res.status(201).json(resposta)
        } else {
          err.sql = ''
          res.status(400).json(err)
        }
      })
    } else {
      res.status(400).json(errors)
    }
  }
}

module.exports = function() {
  return PagamentoController
}
