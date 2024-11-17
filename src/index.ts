import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routerDiosezy from './routes/routeDiosezy';
import mysql from "mysql2"

dotenv.config();
const app =express();

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "skoto",

})

// route
app.get('/', (req, res) => { res.json('ok ok')  });

// diosezy
app.get('/diosezy', (req, res) => {
    
    const sql = "SELECT * FROM diosezy";
    db.query(sql,(err, data) => {
        if(err) return res.json(err)

        return res.json(data);
    })
})

app.post('/diosezy/create', (req, res) => {
    const {nom_diosezy, filoha} = req.body;
    const sql = "INSERT INTO diosezy (nom_diosezy, filoha) VALUES(?,?)";
    db.query(sql,[nom_diosezy, filoha],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data saved successfully"});
    })
})

app.delete('/diosezy/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM diosezy WHERE id = ?";
    db.query(sql,[id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})

app.put('/diosezy/update/:id', (req, res) => {
    const { id } = req.params;
    const {nom_diosezy, filoha } = req.body
    const sql = "UPDATE diosezy SET nom_diosezy = ?, filoha = ? WHERE id = ?";
    db.query(sql,[nom_diosezy, filoha, id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})



// faritra
app.get('/faritra', (req, res) => {
    
    const sql = "SELECT faritra.id, faritra.nom_faritra, faritra.filoha, diosezy.id as diosezy_id, diosezy.nom_diosezy FROM faritra LEFT JOIN diosezy ON faritra.id_diosezy = diosezy.id";
    db.query(sql,(err, data) => {
        if(err) return res.json(err)

        return res.json(data);
    })
})


app.post('/faritra/create', (req, res) => {
    const {nom_faritra, filoha, id_diosezy} = req.body;
    const sql = "INSERT INTO faritra (nom_faritra, filoha, id_diosezy) VALUES(?,?,?)";
    db.query(sql,[nom_faritra, filoha, id_diosezy],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data saved successfully"});
    })
})

app.delete('/faritra/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM faritra WHERE id = ?";
    db.query(sql,[id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})

app.put('/faritra/update/:id', (req, res) => {
    const { id } = req.params;
    const {nom_faritra, filoha, id_diosezy } = req.body
    const sql = "UPDATE faritra SET nom_faritra = ?, filoha = ?, id_diosezy = ? WHERE id = ?";
    db.query(sql,[nom_faritra, filoha, id_diosezy, id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})


// vondrona
app.get('/fivondronana', (req, res) => {
    
    const sql = "SELECT fivondronana.id, fivondronana.nom, fivondronana.filoha, faritra.id as faritra_id, faritra.nom_faritra, COUNT(mpikatroka.id) as nombre_mpikatroka, COALESCE(SUM(categorie.tarif), 0) as total_a_payer FROM fivondronana LEFT JOIN faritra ON fivondronana.id_faritra = faritra.id LEFT JOIN mpikatroka ON mpikatroka.id_fivondronana = fivondronana.id LEFT JOIN categorie ON mpikatroka.id_categorie = categorie.id_categorie GROUP BY fivondronana.id,fivondronana.nom";
    db.query(sql,(err, data) => {
        if(err) return res.json(err)

        return res.json(data);
    })
})


app.post('/fivondronana/create', (req, res) => {
    const {nom, filoha, id_faritra} = req.body;
    const sql = "INSERT INTO fivondronana (nom, filoha, id_faritra) VALUES(?,?,?)";
    db.query(sql,[nom, filoha, id_faritra],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data saved successfully"});
    })
})

app.delete('/fivondronana/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM fivondronana WHERE id = ?";
    db.query(sql,[id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})

app.put('/fivondronana/update/:id', (req, res) => {
    const { id } = req.params;
    const {nom, filoha, id_faritra } = req.body
    const sql = "UPDATE fivondronana SET nom = ?, filoha = ?, id_faritra = ? WHERE id = ?";
    db.query(sql,[nom, filoha, id_faritra, id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})


// catégories
app.get('/categories', (req, res) => {
    const sql = "SELECT * FROM categorie";
    db.query(sql,(err, data) => {
        if(err) return res.json(err)

        return res.json(data);
    })
})

app.post('/categorie/create', (req, res) => {
    const {nom_categorie, tarif} = req.body;
    const sql = "INSERT INTO categorie (nom_categorie, tarif) VALUES(?,?)";
    db.query(sql,[nom_categorie, tarif],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data saved successfully"});
    })
})

app.delete('/categorie/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM categorie WHERE id_categorie = ?";
    db.query(sql,[id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})

app.put('/categorie/update/:id', (req, res) => {
    const { id } = req.params;
    const {nom_categorie, tarif } = req.body
    const sql = "UPDATE categorie SET nom_categorie = ?, tarif = ? WHERE id_categorie = ?";
    db.query(sql,[nom_categorie, tarif, id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})


// Mpikatroka
app.get('/mpikatroka', (req, res) => {

    const sql = "SELECT mpikatroka.nom_mpikatroka, categorie.nom_categorie, fivondronana.nom  FROM mpikatroka LEFT JOIN categorie ON categorie.id_categorie = mpikatroka.id_categorie LEFT JOIN fivondronana ON fivondronana.id = mpikatroka.id_fivondronana";

    db.query(sql,(err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.post('/mpikatroka/create', (req, res) => {
    const {nom_mpikatroka, id_fivondronana, id_categorie} = req.body;

    const sql = "INSERT INTO mpikatroka (nom_mpikatroka, id_fivondronana, id_categorie) VALUES(?,?,?)";

    db.query(sql,[nom_mpikatroka, id_fivondronana, id_categorie],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data saved successfully"});
    })
})

app.delete('/mpikatroka/delete/:id', (req, res) => {

    const { id } = req.params;
    const sql = "DELETE FROM mpikatroka WHERE id_categorie = ?";

    db.query(sql,[id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})

app.put('/mpikatroka/update/:id', (req, res) => {
    const { id } = req.params;
    const {nom_categorie, tarif } = req.body
    const sql = "UPDATE mpikatroka SET nom_categorie = ?, tarif = ? WHERE id_categorie = ?";
    db.query(sql,[nom_categorie, tarif, id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})



// Cotisation
app.get('/cotisations', (req, res) => {

    const sql = "SELECT * FROM cotisation";

    db.query(sql,(err, data) => {
        if(err) return res.json(err)

        return res.json(data);
    })
})

app.post('/cotisation/create', (req, res) => {
    const {id_mpikatroka, id_fivondronana, date} = req.body;

    const sql = "INSERT INTO cotisation (id_mpikatroka, id_fivondronana, date) VALUES(?,?,?)";

    db.query(sql,[id_mpikatroka, id_fivondronana, date],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data saved successfully"});
    })
})

app.delete('/mpikatroka/delete/:id', (req, res) => {

    const { id } = req.params;
    const sql = "DELETE FROM mpikatroka WHERE id_categorie = ?";

    db.query(sql,[id],(err, result) => {
        if(err) return res.json(err)
        return res.status(200).json({message : "Data deleted"});
    })
})


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,

// })



db.connect((err) => {
    if(err) {
        console.log("error database");
    } else {
        console.log("connected");
    }
      
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log('Server runing');

})
.on('error', function (err){
    process.once("SIGUSR2"  ,   function () {
        process.kill(process.pid, "SIGUSR2")
    });
    process.once("SIGINT"  ,   function () {
        process.kill(process.pid, "SIGINT")
    })
});