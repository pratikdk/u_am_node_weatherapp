const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
})

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.use(express.static(path.join(__dirname, "../public")))

// app.get('/', (req, res) => {
//     res.send('<h1>Hello express</h1>');
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: "Adam"
//         }, 
//         {
//             name: "Eve"
//         }
//     ]);
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>');
// })


app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        author: "Pratik D"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        author: "Pratik D"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        helptext: "This is some help text",
        author: "Pratik D"
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            errorText: "No address specified as query parameter."
        })
    }
    
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                errorText: error
            })
        }
        forecast(longitude, latitude, (error, forecastedMessage) => {
            if (error) {
                return res.send({
                    errorText: error
                })
            }
            return res.send({
                location: location,
                forecast: forecastedMessage,
                address: address
            })
        })
    });
    // res.send({
    //     forecast: "Smoke",
    //     location: "Mumbai",
    //     address: req.query.address
    // });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorText: "404 error, 'Help' Resource not found",
        author: "Pratik D"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        errorText: "404 error, Resource not found",
        author: "Pratik D"
    })
})