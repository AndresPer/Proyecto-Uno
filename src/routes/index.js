const { Router} = require('express');
const router = Router();
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://registro-de-usuarios-f5837.firebaseio.com/'
});

const db = admin.database();

router.get('/home', (req, res) => {
    res.render('home'); 
});

router.get('/', (req, res) => {
        res.render('index'); 
     
});

router.get('/vendedor', (req, res) => {
    db.ref('comprador').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('vendedor', { comprador: data}); 
    });
     
});

router.get('/comprador', (req, res) => {
    db.ref('vendedor').once('value', (snapshot) => {
        const data = snapshot.val();
        res.render('comprador', { vendedor: data}); 
    });
     
});

router.get('/formcomprador', (req, res) => {
        res.render('formcomprador'); 
});

router.get('/formvendedor', (req, res) => {
    res.render('formvendedor'); 
});

router.post('/novo-comprador', (req, res) => {
    console.log(req.body);
    const novoUsuarioC = {
        inputCompra: req.body.inputCompra,
        inputNome4: req.body.inputNome4,
        inputEmail4: req.body.inputEmail4,
        inputFone: req.body.inputFone,
        inputCelfone: req.body.inputCelfone,
        inputPassword4: req.body.inputPassword4,
        inputConfPassword4: req.body.inputConfPassword4,
        inputRaSoc: req.body.inputRaSoc,
        inputEndFis: req.body.inputEndFis,
        inputAddress: req.body.inputAddress,
        inputCity: req.body.inputCity,
        inputEstado: req.body.inputEstado,
        inputCEP: req.body.inputCEP,
        inputRamo: req.body.inputRamo,
        inputDes: req.body.inputDes,
        inputProduto: req.body.inputProduto
    };

    db.ref('comprador').push(novoUsuarioC);
        res.redirect('/vendedor');
})

router.post('/novo-vendedor', (req, res) => {
    console.log(req.body);
    const novoUsuarioV = {
        inputVenda: req.body.inputVenda,
        inputNome4: req.body.inputNome4,
        inputEmail4: req.body.inputEmail4,
        inputFone: req.body.inputFone,
        inputCelfone: req.body.inputCelfone,
        inputPassword4: req.body.inputPassword4,
        inputConfPassword4: req.body.inputConfPassword4,
        inputRaSoc: req.body.inputRaSoc,
        inputEndFis: req.body.inputEndFis,
        inputAddress: req.body.inputAddress,
        inputCity: req.body.inputCity,
        inputEstado: req.body.inputEstado,
        inputCEP: req.body.inputCEP,
        inputRamo: req.body.inputRamo,
        inputDes: req.body.inputDes,
        inputProduto: req.body.inputProduto
    };
    db.ref('vendedor').push(novoUsuarioV);
        res.redirect('/comprador'); 
})

module.exports = router;