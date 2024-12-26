import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const urlApi = 'https://v2.jokeapi.dev/joke/Any?amount=1';

app.set('view engine','ejs');
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req,res) => {
    const response = await axios.get(urlApi);
    const result = response.data;
    res.render('index.ejs',{
        setup: JSON.stringify(result.setup),
        delivery: JSON.stringify(result.delivery)
    });
});

app.post('/', async (req, res) => {
    try{
        const option = req.body.options;
        if(option){
        const response = await axios.get(`${urlApi}&lang=${req.body.status}&blacklistFlags=${option}`);
        const result = response.data;
        res.render('index.ejs',{
            setup: JSON.stringify(result.setup),
            delivery: JSON.stringify(result.delivery)
        })} else{
            const response = await axios.get(`${urlApi}&lang=${req.body.status}`);
            const result = response.data;
            res.render('index.ejs',{
                setup: JSON.stringify(result.setup),
                delivery: JSON.stringify(result.delivery)})
        }
        
    }catch(error){
        res.render('index.ejs', {
            setup: 'could not get the Jolke ',
            delivery: 'please try again',
        });
        console.log(error);
    }
});



app.listen(port, () => {
    console.log('server running on port: ',port);
});