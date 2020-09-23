const mongoose = require('mongoose')
const Activity = require('../models/activity.model')
const Monument = require('../models/monuments.model')
const User = require("../models/user.model")

const dbtitle = 'Monumentos-Madrid'
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

const bcrypt = require("bcrypt")
const bcryptSalt = 10

Activity.collection.drop()
Monument.collection.drop()
User.collection.drop()

const activities = [
    {
        name: "Encuentra el objeto",
        actType: "Busqueda",
        shortDescription: "Lorem ipsum dolor sit amet.",
        longDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab modi ratione mollitia facilis corporis labore fuga excepturi architecto reprehenderit non minima cum sit eos quisquam, deserunt, enim rerum accusamus.",
        minParticipants: 5,
        maxParticipants: 10,
        minAge: 7,
        maxAge: 15,
        materials: "Papel, Bolis y objeto a ocultar"
    },
    {
        name: "Mide el edificio",
        actType: "Carrera",
        shortDescription: "Lorem ipsum dolor sit amet.",
        longDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab modi ratione mollitia facilis corporis labore fuga excepturi architecto reprehenderit non minima cum sit eos quisquam, deserunt, enim rerum accusamus.",
        minParticipants: 8,
        maxParticipants: 20,
        minAge: 7,
        maxAge: 15
    },
    {
        name: "Resuelve el misterio",
        actType: "Pistas",
        shortDescription: "Lorem ipsum dolor sit amet.",
        longDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab modi ratione mollitia facilis corporis labore fuga excepturi architecto reprehenderit non minima cum sit eos quisquam, deserunt, enim rerum accusamus.",
        minParticipants: 5,
        maxParticipants: 10,
        minAge: 7,
        maxAge: 10,
        materials: "Papel y bolis"
    },
    {
        name: "¿Sabes la historia?",
        actType: "Trivial",
        shortDescription: "Lorem ipsum dolor sit amet.",
        longDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab modi ratione mollitia facilis corporis labore fuga excepturi architecto reprehenderit non minima cum sit eos quisquam, deserunt, enim rerum accusamus.",
        minParticipants: 4,
        maxParticipants: 16,
        minAge: 12,
        maxAge: 14,
        materials: "Tarjetas y gomets"
    },
    {
        name: "Descubre la historia oculta",
        actType: "Pistas",
        shortDescription: "Lorem ipsum dolor sit amet.",
        longDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ab modi ratione mollitia facilis corporis labore fuga excepturi architecto reprehenderit non minima cum sit eos quisquam, deserunt, enim rerum accusamus.",
        minParticipants: 5,
        maxParticipants: 10,
        minAge: 20,
        maxAge: 35,
        materials: "Papel y bolis"
    }
]

const monuments = [

    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302283-almacenes-rodriguez.json",
        originID: 302283,
        title: "Almacenes Rodríguez",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0b08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 3"
        },
        location: {
            type: "Point",
            coordinates: [40.419716000547446, -3.700924275126349]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302283.pdf?idEdificio=0b08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11072416-antigua-fabrica-martini-rossi.json",
        originID: 11072416,
        title: "Antigua Fábrica Martini &amp; Rossi",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=aae94d07192ae610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "San Blas-Canillejas",
            areaURL: "Rejas",
            locality: "MADRID",
            postalCode: 28022,
            street: "AVENIDA ARAGON 328"
        },
        location: {
            type: "Point",
            coordinates: [40.449487715157105, -3.5846718811400415]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11072416.pdf?idEdificio=aae94d07192ae610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303994-ateneo-madrid.json",
        originID: 303994,
        title: "Ateneo de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4218f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle PRADO 21"
        },
        location: {
            type: "Point",
            coordinates: [40.41539811494639, -3.698368894119228]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303994.pdf?idEdificio=4218f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302440-banco-bilbao-vizcaya-argentaria.json",
        originID: 302440,
        title: "Banco Bilbao Vizcaya Argentaria",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2e08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 16"
        },
        location: {
            type: "Point"
            ,
            coordinates: [40.417345829900306, -3.69956773930541]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302440.pdf?idEdificio=2e08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325808-banco-espana.json",
        originID: 325808,
        title: "Banco de España",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2228f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 48"
        },
        location: {
            type: "Point",
            coordinates: [40.418075647306665, -3.6950725920539]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325808.pdf?idEdificio=2228f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302279-banco-matritense.json",
        originID: 302279,
        title: "Banco Matritense",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8a08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 22"
        },
        location: {
            type: "Point",
            coordinates: [40.42015262123508, -3.7002333412022166]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302279.pdf?idEdificio=8a08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307083-basilica-pontificia-san-miguel.json",
        originID: 307083,
        title: "Basílica Pontificia de San Miguel",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e518f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "CALLE SAN JUSTO 4"
        },
        location: {
            type: "Point",
            coordinates: [40.41420531493721, -3.7096614825254437]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307083.pdf?idEdificio=e518f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11071963-biblioteca-central-uned-madrid.json",
        originID: 11071963,
        title: "Biblioteca Central de la UNED Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=131c28649e1ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Casa de Campo",
            locality: "MADRID",
            postalCode: 28008,
            street: "CALLE SENDA DEL REY 8"
        },
        location: {
            type: "Point",
            coordinates: [40.43267260040589, -3.731936574991669]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11071963.pdf?idEdificio=131c28649e1ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11073375-biblioteca-publica-usera-jose-hierro.json",
        originID: 11073375,
        title: "Biblioteca Pública Usera José Hierro",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e7daf2ef5c6ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Usera",
            areaURL: "Pradolongo",
            locality: "MADRID",
            postalCode: 28026,
            street: "AVENIDA RAFAELA YBARRA 43"
        },
        location: {
            type: "Point",
            coordinates: [40.38188230129181, -3.7106157111470615]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11073375.pdf?idEdificio=e7daf2ef5c6ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/317685-bolsa-madrid.json",
        originID: 317685,
        title: "Bolsa de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8d18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "PLAZA LEALTAD 1"
        },
        location: {
            type: "Point",
            coordinates: [40.416869058196646, -3.6921641190883117]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/317685.pdf?idEdificio=8d18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/380003-caixaforum.json",
        originID: 380003,
        title: "CaixaForum",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c428f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "PASEO PRADO 36"
        },
        location: {
            type: "Point",
            coordinates: [40.41100296472787, -3.6933720637143432]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/380003.pdf?idEdificio=c428f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303549-capilla-san-isidro-iglesia-san-andres.json",
        originID: 303549,
        title: "Capilla de San Isidro en la Iglesia de San Andrés",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=00083d43db3a45103d43db3a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "PLAZA SAN ANDRES 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41208167798535, -3.710809418427343]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303549.pdf?idEdificio=00083d43db3a45103d43db3a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/316140-casa-arabe-antiguas-escuelas-aguirre-.json",
        originID: 316140,
        title: "Casa Árabe (antiguas Escuelas Aguirre)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ac18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Recoletos",
            locality: "MADRID",
            postalCode: 28009,
            street: "CALLE ALCALA 62"
        },
        location: {
            type: "Point",
            coordinates: [40.42175951375861, -3.6821165450977644]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/316140.pdf?idEdificio=ac18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302902-casa-villa.json",
        originID: 302902,
        title: "Casa de la Villa",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4f08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "PLAZA VILLA 5"
        },
        location: {
            type: "Point",
            coordinates: [40.41519930383812, -3.7106114421853977]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302902.pdf?idEdificio=4f08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307084-casa-alhajas-antigua-caja-ahorros.json",
        originID: 307084,
        title: "Casa de las Alhajas. Antigua Caja de Ahorros",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0618f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "PLAZA SAN MARTIN 1"
        },
        location: {
            type: "Point",
            coordinates: [40.418158551935534, -3.7069590771872307]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307084.pdf?idEdificio=0618f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/309418-casa-flores.json",
        originID: 309418,
        title: "Casa de las Flores",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "Gaztambide",
            locality: "MADRID",
            postalCode: 28015,
            street: "CALLE RODRIGUEZ SAN PEDRO 72"
        },
        location: {
            type: "Point",
            coordinates: [40.43200253545766, -3.7165599011833264]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/309418.pdf?idEdificio=e818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302349-casa-cura-iglesia-san-jose.json",
        originID: 302349,
        title: "Casa del cura de la iglesia de San José",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8c08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ "
        },
        location: {
            type: "Point",
            coordinates: [40.41918184340614, -3.696887446468761]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302349.pdf?idEdificio=8c08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11015835-casa-sindical-actual-sede-ministerio-sanidad-servicios-sociales-igualdad-.json",
        originID: 11015835,
        title: "Casa Sindical (actual sede del Ministerio de Sanidad, Servicios Sociales e Igualdad)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=9b48062df152d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "PASEO PRADO 18"
        },
        location: {
            type: "Point",
            coordinates: [40.41373002816207, -3.6940288616186012]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11015835.pdf?idEdificio=9b48062df152d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302404-casino-madrid.json",
        originID: 302404,
        title: "Casino de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6d08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE ALCALA 15"
        },
        location: {
            type: "Point",
            coordinates: [40.41777541448619, -3.7002800119895505]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302404.pdf?idEdificio=6d08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067311-casita-principe-pardo-.json",
        originID: 11067311,
        title: "Casita Del Príncipe (El Pardo)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8ccfa8071288e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Fuencarral-El Pardo",
            areaURL: "El Pardo",
            locality: "MADRID",
            postalCode: 28048,
            street: "CALLE ADELINA PATTI 1"
        },
        location: {
            type: "Point",
            coordinates: [40.52371356289907, -3.7793722663684637]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067311.pdf?idEdificio=8ccfa8071288e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11072237-cementerio-almudena.json",
        originID: 11072237,
        title: "Cementerio de la Almudena",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b1300183252ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Ciudad Lineal",
            areaURL: "Ventas",
            locality: "MADRID",
            postalCode: 28017,
            street: "AVENIDA DAROCA 94"
        },
        location: {
            type: "Point",
            coordinates: [40.42662313663575, -3.6461555750010706]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11072237.pdf?idEdificio=b1300183252ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11075282-central-electrica-pacifico-talleres-oficinas-metro.json",
        originID: 11075282,
        title: "Central Eléctrica del Pacífico, talleres y oficinas del Metro",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b32ecef22dcae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "Pacifico",
            locality: "MADRID",
            postalCode: 28007,
            street: "CALLE VALDERRIBAS 49"
        },
        location: {
            type: "Point",
            coordinates: [40.40400482713434, -3.6744688233892404]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11075282.pdf?idEdificio=b32ecef22dcae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11075326-centro-cultural-daoiz-velarde.json",
        originID: 11075326,
        title: "Centro Cultural Daoíz y Velarde",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b4c3cef22dcae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "Pacifico",
            locality: "MADRID",
            postalCode: 28007,
            street: "PLAZA DAOIZ Y VELARDE 4"
        },
        location: {
            type: "Point",
            coordinates: [40.40180567689773, -3.6771876805396864]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11075326.pdf?idEdificio=b4c3cef22dcae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/305459-centro-cultural-corrala-sede-museo-artes-tradiciones-populares-.json",
        originID: 305459,
        title: "Centro Cultural La Corrala (sede del Museo de Artes y Tradiciones Populares)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0418f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28005,
            street: "CALLE CARLOS ARNICHES 3"
        },
        location: {
            type: "Point",
            coordinates: [40.408827275648434, -3.7083241323093614]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/305459.pdf?idEdificio=0418f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302286-centro-ejercito-armada-casino-militar-.json",
        originID: 302286,
        title: "Centro del Ejército y la Armada (Casino Militar)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4b08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 9"
        },
        location: {
            type: "Point",
            coordinates: [40.419523741055684, -3.699943922067412]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302286.pdf?idEdificio=4b08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302169-cine-avenida.json",
        originID: 302169,
        title: "Cine Avenida",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=00083a2ae80a45103a2ae80a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Calle ABADA 11"
        },
        location: {
            type: "Point",
            coordinates: [40.419924992685935, -3.7050756479788833]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302169.pdf?idEdificio=00083a2ae80a45103a2ae80a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302112-cine-callao.json",
        originID: 302112,
        title: "Cine Callao",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Plaza CALLAO 2"
        },
        location: {
            type: "Point",
            coordinates: [40.419980785676174, -3.706266769929261]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302112.pdf?idEdificio=e608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302063-cine-gran-via-hotel-vincci.json",
        originID: 302063,
        title: "Cine Gran Vía y Hotel Vincci",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GARCIA MOLINAS "
        },
        location: {
            type: "Point",
            coordinates: [40.42256029007748, -3.7087338575144777]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302063.pdf?idEdificio=0508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307308-circulo-bellas-artes.json",
        originID: 307308,
        title: "Círculo de Bellas Artes",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a718f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 42"
        },
        location: {
            type: "Point",
            coordinates: [40.41817509525873, -3.69651165491942]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307308.pdf?idEdificio=a718f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307324-circulo-union-mercantil-industrial.json",
        originID: 307324,
        title: "Círculo de la Unión Mercantil e Industrial",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 24"
        },
        location: {
            type: "Point",
            coordinates: [40.42026644620261, -3.700776749697362]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307324.pdf?idEdificio=8818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11072157-ciudad-universitaria-madrid.json",
        originID: 11072157,
        title: "Ciudad Universitaria de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=185b0183252ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Distrito",
            locality: "MADRID",
            street: "CIUDAD UNIVERSITARIA "
        },
        location: {
            type: "Point",
            coordinates: [40.458171418103674, -3.7254416045474374]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11072157.pdf?idEdificio=185b0183252ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325526-colegio-nuestra-senora-loreto-madres-ursulinas.json",
        originID: 325526,
        title: "Colegio de Nuestra Señora de Loreto. Madres Ursulinas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2128f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Goya",
            locality: "MADRID",
            postalCode: 28001,
            street: "CALLE PRINCIPE DE VERGARA 42"
        },
        location: {
            type: "Point",
            coordinates: [40.42809511698824, -3.679715364244469]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325526.pdf?idEdificio=2128f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11071873-colegio-mayor-casa-do-brasil.json",
        originID: 11071873,
        title: "Colegio Mayor Casa do Brasil",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a1371521c50ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Ciudad Universitaria",
            locality: "MADRID",
            postalCode: 28040,
            street: "AVENIDA ARCO DE LA VICTORIA 3"
        },
        location: {
            type: "Point",
            coordinates: [40.43853583084271, -3.7252915757655174]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11071873.pdf?idEdificio=a1371521c50ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/313893-colegio-nuestra-senora-pilar.json",
        originID: 313893,
        title: "Colegio Nuestra Señora del Pilar",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=cb18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Recoletos",
            locality: "MADRID",
            postalCode: 28001,
            street: "CALLE CASTELLO 56"
        },
        location: {
            type: "Point",
            coordinates: [40.42828467450708, -3.6811529345648615]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/313893.pdf?idEdificio=cb18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11071277-colegio-oficial-arquitectos-madrid.json",
        originID: 11071277,
        title: "Colegio Oficial de Arquitectos de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=f3d5a9662229e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "CALLE HORTALEZA 63"
        },
        location: {
            type: "Point",
            coordinates: [40.42408121377881, -3.6984906424295754]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11071277.pdf?idEdificio=f3d5a9662229e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11075132-complejo-aguila.json",
        originID: 11075132,
        title: "Complejo El Águila",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=800b53f66bcae610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Arganzuela",
            areaURL: "Delicias",
            locality: "MADRID",
            postalCode: 28045,
            street: "CALLE RAMIREZ DE PRADO 3"
        },
        location: {
            type: "Point",
            coordinates: [40.399909791771385, -3.690036015115312]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11075132.pdf?idEdificio=800b53f66bcae610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/304017-congreso-diputados.json",
        originID: 304017,
        title: "Congreso de los Diputados",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6218f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "Plaza CORTES 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41641794374934, -3.6965760428685828]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/304017.pdf?idEdificio=6218f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/300323-convento-comendadoras-parroquia-santiago-mayor.json",
        originID: 300323,
        title: "Convento de las Comendadoras y parroquia de Santiago el Mayor",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2108f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28015,
            street: "PLAZA COMENDADORAS 10"
        },
        location: {
            type: "Point",
            coordinates: [40.42740150087395, -3.708938288104488]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/300323.pdf?idEdificio=2108f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325348-cuartel-conde-duque.json",
        originID: 325348,
        title: "Cuartel del Conde Duque",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6028f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28015,
            street: "Calle CONDE DUQUE 9"
        },
        location: {
            type: "Point",
            coordinates: [40.427509974454416, -3.711061057617866]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325348.pdf?idEdificio=6028f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11053543-edificio-bankinter.json",
        originID: 11053543,
        title: "Edificio Bankinter",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b8df078f64c1e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "Almagro",
            locality: "MADRID",
            postalCode: 28046,
            street: "PASEO CASTELLANA 29"
        },
        location: {
            type: "Point",
            coordinates: [40.43071965314907, -3.68950836611669]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11053543.pdf?idEdificio=b8df078f64c1e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11055806-edificio-bankunion-parlamento-europeo-embajada-irlanda-.json",
        originID: 11055806,
        title: "Edificio Bankunión (Parlamento Europeo y Embajada de Irlanda)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e686dfa16a63e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Castellana",
            locality: "MADRID",
            postalCode: 28046,
            street: "PASEO CASTELLANA 46"
        },
        location: {
            type: "Point",
            coordinates: [40.43420552208373, -3.6878737998050686]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11055806.pdf?idEdificio=e686dfa16a63e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302096-edificio-carrion-capitol-.json",
        originID: 302096,
        title: "Edificio Carrión (Capitol)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 41"
        },
        location: {
            type: "Point",
            coordinates: [40.42038314116203, -3.706766056524687]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302096.pdf?idEdificio=c608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302051-edificio-coliseum-teatro-coliseum-.json",
        originID: 302051,
        title: "Edificio Coliseum (Teatro Coliseum)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a308f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28013,
            street: "CALLE GRAN VIA 78"
        },
        location: {
            type: "Point",
            coordinates: [40.4232376492877, -3.7102689441860126]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302051.pdf?idEdificio=a308f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11016735-edificio-20-viviendas-calle-cervantes.json",
        originID: 11016735,
        title: "Edificio de 20 viviendas en calle Cervantes",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=3d4473b43552d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE CERVANTES 36"
        },
        location: {
            type: "Point",
            coordinates: [40.41426942327938, -3.696078069568077]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11016735.pdf?idEdificio=3d4473b43552d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302062-edificio-union-fenix.json",
        originID: 302062,
        title: "Edificio de La Unión y el Fénix",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GARCIA MOLINAS "
        },
        location: {
            type: "Point",
            coordinates: [40.422647917090806, -3.709135568642842]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302062.pdf?idEdificio=e408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302356-edificio-previsores-porvenir.json",
        originID: 302356,
        title: "Edificio de Los Previsores del Porvenir",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2d08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 19"
        },
        location: {
            type: "Point",
            coordinates: [40.41916316149634, -3.698490337359729]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302356.pdf?idEdificio=2d08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302095-edificio-oficinas-apartamentos.json",
        originID: 302095,
        title: "Edificio de Oficinas y Apartamentos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 43"
        },
        location: {
            type: "Point",
            coordinates: [40.42053455529419, -3.7070505439234185]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302095.pdf?idEdificio=a608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11017140-edificio-viviendas-calle-hilarion-eslava.json",
        originID: 11017140,
        title: "Edificio de Viviendas en la calle Hilarión Eslava",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=50e3ce908a92d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "Gaztambide",
            locality: "MADRID",
            postalCode: 28015,
            street: "CALLE HILARION ESLAVA 10"
        },
        location: {
            type: "Point",
            coordinates: [40.433285976618926, -3.7164990134208717]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11017140.pdf?idEdificio=50e3ce908a92d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11050212-edificio-girasol.json",
        originID: 11050212,
        title: "Edificio Girasol",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b7b887c41420e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Castellana",
            locality: "MADRID",
            postalCode: 28006,
            street: "CALLE LAGASCA 90"
        },
        location: {
            type: "Point",
            coordinates: [40.43092747841812, -3.6846446338833183]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11050212.pdf?idEdificio=b7b887c41420e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302343-edificio-gran-pena.json",
        originID: 302343,
        title: "Edificio Gran Peña",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4c08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 2"
        },
        location: {
            type: "Point",
            coordinates: [40.41935051716017, -3.697301746425403]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302343.pdf?idEdificio=4c08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302145-edificio-hostal-lauria.json",
        originID: 302145,
        title: "Edificio Hostal Lauria",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 50"
        },
        location: {
            type: "Point",
            coordinates: [40.420970348006776, -3.706501085101446]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302145.pdf?idEdificio=c708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302168-edificio-adriatica.json",
        originID: 302168,
        title: "Edificio La Adriática",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a808f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Plaza CALLAO "
        },
        location: {
            type: "Point",
            coordinates: [40.41999533487041, -3.7053592829015223]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302168.pdf?idEdificio=a808f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302072-edificio-sotanos.json",
        originID: 302072,
        title: "Edificio Los Sótanos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 59"
        },
        location: {
            type: "Point",
            coordinates: [40.421972138578035, -3.7091520478715996]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302072.pdf?idEdificio=8508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302073-edificio-sotanos.json",
        originID: 302073,
        title: "Edificio Los Sótanos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 57"
        },
        location: {
            type: "Point",
            coordinates: [40.421747794773914, -3.709008238044509]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302073.pdf?idEdificio=a508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302074-edificio-sotanos-teatro-lope-vega.json",
        originID: 302074,
        title: "Edificio Los Sótanos y Teatro Lope de Vega",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 55"
        },
        location: {
            type: "Point",
            coordinates: [40.421533109617585, -3.7087584404681806]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302074.pdf?idEdificio=c508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302223-edificio-matesanz.json",
        originID: 302223,
        title: "Edificio Matesanz",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 27"
        },
        location: {
            type: "Point",
            coordinates: [40.41983067032157, -3.7028114644082746]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302223.pdf?idEdificio=e908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302425-edificio-metropolis.json",
        originID: 302425,
        title: "Edificio Metrópolis",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ed08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE ALCALA 39"
        },
        location: {
            type: "Point",
            coordinates: [40.41871024079712, -3.6974552127875446]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302425.pdf?idEdificio=ed08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302342-edificio-banco-urquijo.json",
        originID: 302342,
        title: "Edificio para el Banco Urquijo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2c08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 4"
        },
        location: {
            type: "Point",
            coordinates: [40.41943002922452, -3.6975618907685255]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302342.pdf?idEdificio=2c08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302125-edificio-rialto.json",
        originID: 302125,
        title: "Edificio Rialto",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 54"
        },
        location: {
            type: "Point",
            coordinates: [40.42141709585185, -3.7071069351758537]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302125.pdf?idEdificio=4708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302198-edificio-telefonica.json",
        originID: 302198,
        title: "Edificio Telefónica",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28013,
            street: "CALLE GRAN VIA 28"
        },
        location: {
            type: "Point",
            coordinates: [40.42021381353114, -3.702045729504309]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302198.pdf?idEdificio=8908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302070-edificio-vita.json",
        originID: 302070,
        title: "Edificio Vita",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 62"
        },
        location: {
            type: "Point",
            coordinates: [40.42222006385312, -3.7083884373634293]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302070.pdf?idEdificio=4508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302052-edificio-vitalicio.json",
        originID: 302052,
        title: "Edificio Vitalicio",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c308f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Plaza ESPAÑA "
        },
        location: {
            type: "Point",
            coordinates: [40.42305180954051, -3.71084907791347]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302052.pdf?idEdificio=c308f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302061-edificio-cine-pompeya.json",
        originID: 302061,
        title: "Edificio y Cine Pompeya",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 70"
        },
        location: {
            type: "Point",
            coordinates: [40.42280855064068, -3.7093848037700505]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302061.pdf?idEdificio=c408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302075-edificios-sotanos-hotel-emperador.json",
        originID: 302075,
        title: "Edificios Los Sótanos. Hotel Emperador",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 53"
        },
        location: {
            type: "Point",
            coordinates: [40.42136433290127, -3.7083676730256907]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302075.pdf?idEdificio=e508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/300108-ermita-virgen-puerto.json",
        originID: 300108,
        title: "Ermita de la Virgen del Puerto",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8008f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "PASEO VIRGEN DEL PUERTO 4"
        },
        location: {
            type: "Point",
            coordinates: [40.41556783900282, -3.721135107165399]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/300108.pdf?idEdificio=8008f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11070491-ermita-san-antonio-florida.json",
        originID: 11070491,
        title: "Ermita de San Antonio de la Florida",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=26233c5e74a8e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Casa de Campo",
            locality: "MADRID",
            postalCode: 28008,
            street: "GLORIETA SAN ANTONIO DE LA FLORIDA 4"
        },
        location: {
            type: "Point",
            coordinates: [40.425614559049066, -3.7260819285571833]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11070491.pdf?idEdificio=26233c5e74a8e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/10999706-ermita-santa-maria-antigua.json",
        originID: 10999706,
        title: "Ermita de Santa Maria la Antigua",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8662b8a28658c610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Carabanchel",
            areaURL: "Vista Alegre",
            locality: "MADRID",
            postalCode: 28047,
            street: "CALLE MONSE&amp;Ntilde;OR OSCAR ROMERO 92"
        },
        location: {
            type: "Point",
            coordinates: [40.38249753936885, -3.752510480692841]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/10999706.pdf?idEdificio=8662b8a28658c610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307259-escuelas-pias-san-fernando-biblioteca-centro-uned-.json",
        originID: 307259,
        title: "Escuelas Pías de San Fernando (Biblioteca  y centro de la UNED)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e618f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "CALLE SOMBRERETE 15"
        },
        location: {
            type: "Point",
            coordinates: [40.40803440320469, -3.703466938452617]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307259.pdf?idEdificio=e618f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/318308-estacion-atocha.json",
        originID: 318308,
        title: "Estación de Atocha",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2f18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Arganzuela",
            areaURL: "Atocha",
            locality: "MADRID",
            postalCode: 28045,
            street: "PLAZA EMPERADOR CARLOS V 3"
        },
        location: {
            type: "Point",
            coordinates: [40.40792245547035, -3.6923116993889704]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/318308.pdf?idEdificio=2f18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11071839-fundacion-francisco-giner-rios.json",
        originID: 11071839,
        title: "Fundación Francisco Giner de los Ríos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=bbc11521c50ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "Almagro",
            locality: "MADRID",
            postalCode: 28010,
            street: "PASEO GENERAL MARTINEZ CAMPOS 14"
        },
        location: {
            type: "Point",
            coordinates: [40.434877495729964, -3.696810843113834]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11071839.pdf?idEdificio=bbc11521c50ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11050023-fundacion-juan-march.json",
        originID: 11050023,
        title: "Fundación Juan March",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8245072df910e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Castellana",
            locality: "MADRID",
            postalCode: 28006,
            street: "CALLE CASTELLO 77"
        },
        location: {
            type: "Point",
            coordinates: [40.43122422239439, -3.681123764267725]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11050023.pdf?idEdificio=8245072df910e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11071302-gimnasio-colegio-maravillas.json",
        originID: 11071302,
        title: "Gimnasio del Colegio Maravillas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=f217a9662229e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamartin",
            areaURL: "El Viso",
            locality: "MADRID",
            postalCode: 28002,
            street: "CALLE JOAQUIN COSTA 21"
        },
        location: {
            type: "Point",
            coordinates: [40.44622182664542, -3.6874505523727996]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11071302.pdf?idEdificio=f217a9662229e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302175-grandes-almacenes-madrid-paris.json",
        originID: 302175,
        title: "Grandes Almacenes Madrid-París",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle DESENGAÑO 7"
        },
        location: {
            type: "Point",
            coordinates: [40.420556700334984, -3.7034201887922915]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302175.pdf?idEdificio=0908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067396-hipodromo-zarzuela.json",
        originID: 11067396,
        title: "Hipódromo de la Zarzuela",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=71e5a8071288e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Distrito",
            locality: "MADRID",
            street: "HIPODROMO ZARZUELA "
        },
        location: {
            type: "Point",
            coordinates: [40.478600170152276, -3.7574669011672372]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067396.pdf?idEdificio=71e5a8071288e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/310322-hospital-jornaleros-san-francisco-paula.json",
        originID: 310322,
        title: "Hospital de Jornaleros San Francisco de Paula",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0918f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "RiosRosas",
            locality: "MADRID",
            postalCode: 28003,
            street: "CALLE MAUDES 17"
        },
        location: {
            type: "Point",
            coordinates: [40.44539205139684, -3.7011974227253477]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/310322.pdf?idEdificio=0918f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307316-hotel-alfonso-xiii.json",
        originID: 307316,
        title: "Hotel Alfonso XIII",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e718f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 34"
        },
        location: {
            type: "Point",
            coordinates: [40.42050742476766, -3.704115144651839]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307316.pdf?idEdificio=e718f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302055-hotel-apartamentos-espahotel.json",
        originID: 302055,
        title: "Hotel Apartamentos Espahotel",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle FLOR BAJA 6"
        },
        location: {
            type: "Point",
            coordinates: [40.42250707487777, -3.710065338350866]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302055.pdf?idEdificio=2408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302227-hotel-gran-via.json",
        originID: 302227,
        title: "Hotel Gran Vía",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0a08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Calle GRAN VIA 25"
        },
        location: {
            type: "Point",
            coordinates: [40.419762112038654, -3.702233164302461]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302227.pdf?idEdificio=0a08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302059-hotel-menfis.json",
        originID: 302059,
        title: "Hotel Menfis",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GENERAL MITRE "
        },
        location: {
            type: "Point",
            coordinates: [40.42305832746606, -3.7097882216017055]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302059.pdf?idEdificio=8408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302228-hotel-metropolitano.json",
        originID: 302228,
        title: "Hotel Metropolitano",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2a08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Calle GRAN VIA 23"
        },
        location: {
            type: "Point",
            coordinates: [40.419718715992786, -3.7019616011392307]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302228.pdf?idEdificio=2a08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302144-hotel-nueva-york-cine-actualidades.json",
        originID: 302144,
        title: "Hotel Nueva York y cine Actualidades",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 48"
        },
        location: {
            type: "Point",
            coordinates: [40.420900008680086, -3.706217444920123]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302144.pdf?idEdificio=a708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/304046-hotel-palace.json",
        originID: 304046,
        title: "Hotel Palace",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a218f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "PLAZA CORTES 7"
        },
        location: {
            type: "Point",
            coordinates: [40.41548099224374, -3.6957733739936085]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/304046.pdf?idEdificio=a218f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302281-hotel-roma.json",
        originID: 302281,
        title: "Hotel Roma",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ca08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CLAVEL 1"
        },
        location: {
            type: "Point",
            coordinates: [40.420038222989966, -3.6997842288466742]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302281.pdf?idEdificio=ca08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302060-hotel-washington.json",
        originID: 302060,
        title: "Hotel Washington",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 72"
        },
        location: {
            type: "Point",
            coordinates: [40.42294237533695, -3.7095983942507478]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302060.pdf?idEdificio=a408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302094-hotel-cine-rex.json",
        originID: 302094,
        title: "Hotel y cine Rex",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 43B"
        },
        location: {
            type: "Point",
            coordinates: [40.4206600249067, -3.707157946297817]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302094.pdf?idEdificio=8608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302428-iglesia-concepcion-real-calatrava.json",
        originID: 302428,
        title: "Iglesia de la Concepción Real de Calatrava",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0e08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 25"
        },
        location: {
            type: "Point",
            coordinates: [40.41831315896514, -3.699011971823613]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302428.pdf?idEdificio=0e08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/301090-iglesia-san-antonio-alemanes.json",
        originID: 301090,
        title: "Iglesia de San Antonio de los Alemanes",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c108f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle PUEBLA 22"
        },
        location: {
            type: "Point",
            coordinates: [40.42248408139826, -3.703510993080645]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/301090.pdf?idEdificio=c108f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/317886-iglesia-san-jeronimo-real.json",
        originID: 317886,
        title: "Iglesia de San Jerónimo el Real",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6e18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE MORETO 4"
        },
        location: {
            type: "Point",
            coordinates: [40.414356517969345, -3.690523026519969]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/317886.pdf?idEdificio=6e18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302348-iglesia-san-jose.json",
        originID: 302348,
        title: "Iglesia de San José",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6c08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 43"
        },
        location: {
            type: "Point",
            coordinates: [40.41934499059586, -3.696724106180927]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302348.pdf?idEdificio=6c08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/316121-iglesia-san-manuel-san-benito.json",
        originID: 316121,
        title: "Iglesia de San Manuel y San Benito",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8c18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Recoletos",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 83"
        },
        location: {
            type: "Point",
            coordinates: [40.420758796546075, -3.68628303682986]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/316121.pdf?idEdificio=8c18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/300184-iglesia-san-marcos.json",
        originID: 300184,
        title: "Iglesia de San Marcos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a008f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28015,
            street: "CALLE SAN LEONARDO 10"
        },
        location: {
            type: "Point",
            coordinates: [40.424769387928684, -3.7111444272242124]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/300184.pdf?idEdificio=a008f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303603-iglesia-san-pedro-viejo.json",
        originID: 303603,
        title: "Iglesia de San Pedro el Viejo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6118f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "Calle NUNCIO 14"
        },
        location: {
            type: "Point",
            coordinates: [40.41324464343417, -3.710250837641945]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303603.pdf?idEdificio=6118f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067036-iglesia-parroquial-santa-ana-nuestra-senora-esperanza.json",
        originID: 11067036,
        title: "Iglesia Parroquial de Santa Ana y Nuestra Señora de la Esperanza",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=7c29e5274b78e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Moratalaz",
            areaURL: "Vinateros",
            locality: "MADRID",
            postalCode: 28030,
            street: "CALLE CAÑADA 35"
        },
        location: {
            type: "Point",
            coordinates: [40.405427281364965, -3.6450041456114723]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067036.pdf?idEdificio=7c29e5274b78e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307123-ilustre-colegio-oficial-medicos-madrid.json",
        originID: 307123,
        title: "Ilustre Colegio Oficial de Médicos de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4618f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "CALLE SANTA ISABEL 51"
        },
        location: {
            type: "Point",
            coordinates: [40.40926280409965, -3.6953774471568273]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307123.pdf?idEdificio=4618f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307357-instituto-cervantes-antiguo-banco-espanol-rio-plata-.json",
        originID: 307357,
        title: "Instituto Cervantes (antiguo Banco Español del Río de la Plata)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 49"
        },
        location: {
            type: "Point",
            coordinates: [40.41956034622228, -3.6953707711467745]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307357.pdf?idEdificio=a818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11050966-instituto-patrimonio-cultural-espana.json",
        originID: 11050966,
        title: "Instituto del Patrimonio Cultural de España",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=f51b0a11f811e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Ciudad Universitaria",
            locality: "MADRID",
            postalCode: 28040,
            street: "CALLE PINTOR EL GRECO 4"
        },
        location: {
            type: "Point",
            coordinates: [40.44166668674646, -3.735464796879181]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11050966.pdf?idEdificio=f51b0a11f811e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/305578-casa-encendida.json",
        originID: 305578,
        title: "La Casa Encendida",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4418f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "RONDA VALENCIA 2"
        },
        location: {
            type: "Point",
            coordinates: [40.40596221830597, -3.6997720739017033]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/305578.pdf?idEdificio=4418f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067567-matadero-mercado-municipal-granados.json",
        originID: 11067567,
        title: "Matadero y Mercado Municipal de Granados",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=55c478610b88e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Arganzuela",
            areaURL: "Chopera",
            locality: "MADRID",
            postalCode: 28045,
            street: "PASEO CHOPERA 14"
        },
        location: {
            type: "Point",
            coordinates: [40.39245798191536, -3.6972067902718897]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067567.pdf?idEdificio=55c478610b88e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307124-medialab-prado-antigua-serreria-belga-.json",
        originID: 307124,
        title: "Medialab-Prado (antigua Serrería Belga)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6618f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE ALAMEDA 15"
        },
        location: {
            type: "Point",
            coordinates: [40.4105673503608, -3.6937819843413373]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307124.pdf?idEdificio=6618f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307088-mercado-san-miguel.json",
        originID: 307088,
        title: "Mercado de San Miguel",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2618f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "Plaza SAN MIGUEL "
        },
        location: {
            type: "Point",
            coordinates: [40.4153602918824, -3.709023692234164]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307088.pdf?idEdificio=2618f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/317796-ministerio-agricultura-pesca-alimentacion.json",
        originID: 317796,
        title: "Ministerio de Agricultura, Pesca y Alimentación",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ed18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "PASEO INFANTA ISABEL 1"
        },
        location: {
            type: "Point",
            coordinates: [40.40863906624042, -3.6906194489700237]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/317796.pdf?idEdificio=ed18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303037-monasterio-descalzas-reales.json",
        originID: 303037,
        title: "Monasterio de las Descalzas Reales",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=af08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Plaza DESCALZAS "
        },
        location: {
            type: "Point",
            coordinates: [40.418631243969415, -3.705969762193341]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303037.pdf?idEdificio=af08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307231-monasterio-montserrat.json",
        originID: 307231,
        title: "Monasterio de Montserrat",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c618f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28015,
            street: "CALLE SAN BERNARDO 79"
        },
        location: {
            type: "Point",
            coordinates: [40.42782496214609, -3.706474495078322]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307231.pdf?idEdificio=c618f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11005963-museo-cerralbo.json",
        originID: 11005963,
        title: "Museo Cerralbo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=64458a205fccc610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Arguelles",
            locality: "MADRID",
            postalCode: 28008,
            street: "CALLE VENTURA RODRIGUEZ 17"
        },
        location: {
            type: "Point",
            coordinates: [40.423779252051425, -3.7145996063573756]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11005963.pdf?idEdificio=64458a205fccc610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11050879-museo-america.json",
        originID: 11050879,
        title: "Museo de América",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=aefeb801a201e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Ciudad Universitaria",
            locality: "MADRID",
            postalCode: 28040,
            street: "AVENIDA REYES CATOLICOS 6"
        },
        location: {
            type: "Point",
            coordinates: [40.43793725485899, -3.7218544182655786]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11050879.pdf?idEdificio=aefeb801a201e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/301272-museo-historia-madrid-museo-municipal-madrid.json",
        originID: 301272,
        title: "Museo de Historia de Madrid. Museo Municipal de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4208f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "CALLE FUENCARRAL 78"
        },
        location: {
            type: "Point",
            coordinates: [40.4257331392528, -3.700926972454831]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/301272.pdf?idEdificio=4208f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/321069-museo-ferrocarril.json",
        originID: 321069,
        title: "Museo del Ferrocarril",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=cf18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Arganzuela",
            areaURL: "PalosMoguer",
            locality: "MADRID",
            postalCode: 28045,
            street: "PASEO DELICIAS 1"
        },
        location: {
            type: "Point",
            coordinates: [40.406996505596624, -3.6930483362488657]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/321069.pdf?idEdificio=cf18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/313939-museo-lazaro-galdiano.json",
        originID: 313939,
        title: "Museo Lázaro Galdiano",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=eb18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Castellana",
            locality: "MADRID",
            postalCode: 28006,
            street: "CALLE SERRANO 122"
        },
        location: {
            type: "Point",
            coordinates: [40.43675593917329, -3.6861820403705816]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/313939.pdf?idEdificio=eb18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/305800-museo-nacional-centro-arte-reina-sofia.json",
        originID: 305800,
        title: "Museo Nacional Centro de Arte Reina Sofía",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a418f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "CALLE SANTA ISABEL 52"
        },
        location: {
            type: "Point",
            coordinates: [40.40864029339671, -3.6939504103293244]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/305800.pdf?idEdificio=a418f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11055833-museo-nacional-ciencias-naturales-escuela-tecnica-superior-ingenieros-industriales.json",
        originID: 11055833,
        title: "Museo Nacional de Ciencias Naturales y Escuela Técnica Superior de Ingenieros Industriales",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=db67dfa16a63e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamartin",
            areaURL: "El Viso",
            locality: "MADRID",
            postalCode: 28006,
            street: "CALLE JOSE GUTIERREZ ABASCAL 2"
        },
        location: {
            type: "Point",
            coordinates: [40.44042600324054, -3.690212174964136]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11055833.pdf?idEdificio=db67dfa16a63e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325790-museo-nacional-prado.json",
        originID: 325790,
        title: "Museo Nacional del Prado",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a128f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "PASEO PRADO 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41854475379762, -3.6925831204366806]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325790.pdf?idEdificio=a128f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/313014-museo-sorolla.json",
        originID: 313014,
        title: "Museo Sorolla",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=aa18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "Almagro",
            locality: "MADRID",
            postalCode: 28010,
            street: "Paseo GENERAL MARTINEZ CAMPOS 37"
        },
        location: {
            type: "Point",
            coordinates: [40.43546990168913, -3.692433817871342]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/313014.pdf?idEdificio=aa18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325816-museo-thyssen-bornemisza-palacio-vistahermosa-.json",
        originID: 325816,
        title: "Museo Thyssen-Bornemisza (Palacio de Vistahermosa)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=40083d43db3a45103d43db3a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "PASEO PRADO 8"
        },
        location: {
            type: "Point",
            coordinates: [40.41601631762229, -3.694738346891257]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325816.pdf?idEdificio=40083d43db3a45103d43db3a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11055925-nuevos-ministerios.json",
        originID: 11055925,
        title: "Nuevos Ministerios",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=845f5454dca3e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamberi",
            areaURL: "RiosRosas",
            locality: "MADRID",
            postalCode: 28003,
            street: "CALLE AGUSTIN DE BETANCOURT 4"
        },
        location: {
            type: "Point",
            coordinates: [40.44268919706804, -3.694627300005272]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11055925.pdf?idEdificio=845f5454dca3e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325775-observatorio-astronomico.json",
        originID: 325775,
        title: "Observatorio Astronómico",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6128f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE ALFONSO XII 3"
        },
        location: {
            type: "Point",
            coordinates: [40.40951154860526, -3.6884516670285747]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325775.pdf?idEdificio=6128f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302157-oficinas-ramon-lopez-rumayor-lombera.json",
        originID: 302157,
        title: "Oficinas para Ramón López-Rumayor Lombera",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0808f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle CONCEPCION ARENAL 1"
        },
        location: {
            type: "Point",
            coordinates: [40.4205202700433, -3.7049639867882593]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302157.pdf?idEdificio=0808f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302204-oficinas-vicente-patuel.json",
        originID: 302204,
        title: "Oficinas para Vicente Patuel",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Calle CHINCHILLA 9"
        },
        location: {
            type: "Point",
            coordinates: [40.41986954619534, -3.703825594056321]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302204.pdf?idEdificio=a908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302122-palacio-altamira-instituto-europeo-diseno-.json",
        originID: 302122,
        title: "Palacio de Altamira (Instituto Europeo del Diseño)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle FLOR ALTA 8"
        },
        location: {
            type: "Point",
            coordinates: [40.421767344162355, -3.707287420083181]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302122.pdf?idEdificio=0708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11050053-palacio-amboage-actual-sede-embajada-italia-.json",
        originID: 11050053,
        title: "Palacio de Amboage (actual sede de la Embajada de Italia)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=1d4ae77ccd10e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Castellana",
            locality: "MADRID",
            postalCode: 28006,
            street: "CALLE LAGASCA 98"
        },
        location: {
            type: "Point",
            coordinates: [40.43211109393623, -3.684551710224391]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11050053.pdf?idEdificio=1d4ae77ccd10e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325821-palacio-biblioteca-museos-nacionales.json",
        originID: 325821,
        title: "Palacio de Biblioteca y Museos Nacionales",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8228f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Recoletos",
            locality: "MADRID",
            postalCode: 28001,
            street: "CALLE SERRANO 13"
        },
        location: {
            type: "Point",
            coordinates: [40.4232789604228, -3.6884121235090532]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325821.pdf?idEdificio=8228f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325941-palacio-buena-vista-actual-sede-cuartel-general-ejercito-tierra-.json",
        originID: 325941,
        title: "Palacio de Buena Vista (actual sede del Cuartel General del Ejército de Tierra)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4328f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 51"
        },
        location: {
            type: "Point",
            coordinates: [40.42058333522924, -3.6945443828867504]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325941.pdf?idEdificio=4328f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325771-palacio-comunicaciones-palacio-cibeles-ayuntamiento-madrid-.json",
        originID: 325771,
        title: "Palacio de Comunicaciones (Palacio de Cibeles, Ayuntamiento de Madrid)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4128f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "PLAZA CIBELES 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41902261618159, -3.692188193693138]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325771.pdf?idEdificio=4128f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/305737-palacio-fernan-nunez-fundacion-ferrocarriles-espanoles-.json",
        originID: 305737,
        title: "Palacio de Fernán Nuñez (Fundación de los Ferrocarriles Españoles)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6418f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "CALLE SANTA ISABEL 44"
        },
        location: {
            type: "Point",
            coordinates: [40.40985206511554, -3.6970118323675845]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/305737.pdf?idEdificio=6418f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302164-palacio-musica.json",
        originID: 302164,
        title: "Palacio de la Música",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6808f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Calle ABADA 14"
        },
        location: {
            type: "Point",
            coordinates: [40.419882465507165, -3.7046626413957284]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302164.pdf?idEdificio=6808f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302152-palacio-prensa.json",
        originID: 302152,
        title: "Palacio de la Prensa",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "PLAZA CALLAO 4"
        },
        location: {
            type: "Point",
            coordinates: [40.41985083351601, -3.7055098379576314]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302152.pdf?idEdificio=e708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325803-palacio-linares-actual-casa-america-.json",
        originID: 325803,
        title: "Palacio de Linares (actual Casa de América)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e128f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "PLAZA CIBELES 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41902261618159, -3.692188193693138]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325803.pdf?idEdificio=e128f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325350-palacio-liria.json",
        originID: 325350,
        title: "Palacio de Liria",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8028f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28008,
            street: "CALLE PRINCESA 20"
        },
        location: {
            type: "Point",
            coordinates: [40.426837593736934, -3.7126361453494083]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325350.pdf?idEdificio=8028f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/301402-palacio-longoria-sede-sociedad-general-autores-editores-.json",
        originID: 301402,
        title: "Palacio de Longoria (sede de la Sociedad General de Autores y Editores)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c208f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle FERNANDO VI 4"
        },
        location: {
            type: "Point",
            coordinates: [40.42529015852938, -3.6968561786505174]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/301402.pdf?idEdificio=c208f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/304093-palacio-duques-santona-camara-comercio-.json",
        originID: 304093,
        title: "Palacio de los Duques de Santoña (Cámara de Comercio)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e218f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28012,
            street: "Calle HUERTAS 13"
        },
        location: {
            type: "Point",
            coordinates: [40.41408863088947, -3.700382632319931]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/304093.pdf?idEdificio=e218f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303226-palacio-santa-cruz-sede-actual-ministerio-asuntos-exteriores-.json",
        originID: 303226,
        title: "Palacio de Santa Cruz (sede actual del Ministerio de Asuntos Exteriores)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6018f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28012,
            street: "PLAZA PROVINCIA 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41471076984459, -3.705871508121933]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303226.pdf?idEdificio=6018f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302894-palacio-duque-uceda-palacio-consejos.json",
        originID: 302894,
        title: "Palacio del Duque de Uceda o Palacio de Consejos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2f08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "CALLE MAYOR 79"
        },
        location: {
            type: "Point",
            coordinates: [40.414975858382746, -3.712927052732882]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302894.pdf?idEdificio=2f08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/304779-palacio-marques-perales-filmoteca-nacional-.json",
        originID: 304779,
        title: "Palacio del marqués de Perales (Filmoteca Nacional)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e318f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "CALLE MAGDALENA 10"
        },
        location: {
            type: "Point",
            coordinates: [40.41232213776173, -3.702168315990886]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/304779.pdf?idEdificio=e318f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/317990-palacio-marques-salamanca.json",
        originID: 317990,
        title: "Palacio del Marqués de Salamanca",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ce18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Recoletos",
            locality: "MADRID",
            postalCode: 28001,
            street: "Paseo RECOLETOS 10"
        },
        location: {
            type: "Point",
            coordinates: [40.42142429655837, -3.691016699006383]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/317990.pdf?idEdificio=ce18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067352-palacio-real-pardo.json",
        originID: 11067352,
        title: "Palacio Real de El Pardo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=3de1a8071288e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Fuencarral-El Pardo",
            areaURL: "El Pardo",
            locality: "MADRID",
            postalCode: 28048,
            street: "CALLE MANUEL ALONSO 1"
        },
        location: {
            type: "Point",
            coordinates: [40.520729051083116, -3.776611188452123]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067352.pdf?idEdificio=3de1a8071288e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/300001-palacio-real-madrid.json",
        originID: 300001,
        title: "Palacio Real de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2008f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28071,
            street: "Calle BAILEN "
        },
        location: {
            type: "Point",
            coordinates: [40.417955, -3.714312]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/300001.pdf?idEdificio=2008f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/390002-parque-retiro.json",
        originID: 390002,
        title: "Parque de El Retiro",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0528f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28001,
            street: "PLAZA INDEPENDENCIA 7"
        },
        location: {
            type: "Point",
            coordinates: [40.41965292860097, -3.6878947032733205]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/390002.pdf?idEdificio=0528f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067509-parroquia-nuestra-senora-transito.json",
        originID: 11067509,
        title: "Parroquia de Nuestra Señora del Tránsito",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6c4e78610b88e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Hortaleza",
            areaURL: "Canillas",
            locality: "MADRID",
            postalCode: 28043,
            street: "CARRETERA CANILLAS 40"
        },
        location: {
            type: "Point",
            coordinates: [40.46278617142339, -3.6507587941024298]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067509.pdf?idEdificio=6c4e78610b88e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067173-parroquia-san-pedro-advincula.json",
        originID: 11067173,
        title: "Parroquia de San Pedro Advincula",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c3a3a7055e78e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Villa De Vallecas",
            areaURL: "Casco Histórico de Vallecas",
            locality: "MADRID",
            postalCode: 28031,
            street: "CALLE SIERRA GORDA 5"
        },
        location: {
            type: "Point",
            coordinates: [40.380255445301586, -3.620330652764418]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067173.pdf?idEdificio=c3a3a7055e78e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11067550-parroquia-san-pedro-dominicos.json",
        originID: 11067550,
        title: "Parroquia de San Pedro de los Dominicos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=eb0478610b88e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Hortaleza",
            areaURL: "Valdefuentes",
            locality: "MADRID",
            postalCode: 28050,
            street: "AVENIDA BURGOS 204"
        },
        location: {
            type: "Point",
            coordinates: [40.5022552628529, -3.659176242434582]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11067550.pdf?idEdificio=eb0478610b88e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325827-parroquia-santa-barbara.json",
        originID: 325827,
        title: "Parroquia de Santa Bárbara",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a228f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "CALLE GENERAL CASTA&amp;Ntilde;OS 2"
        },
        location: {
            type: "Point",
            coordinates: [40.42429327897972, -3.6940790697439114]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325827.pdf?idEdificio=a228f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11065764-parroquia-nuestra-senora-guadalupe.json",
        originID: 11065764,
        title: "Parroquia Nuestra Señora de Guadalupe",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=d8cd376edad7e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamartin",
            areaURL: "Hispanoamerica",
            locality: "MADRID",
            postalCode: 28016,
            street: "CALLE PUERTO RICO 1"
        },
        location: {
            type: "Point",
            coordinates: [40.45242744242779, -3.6746764221304726]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11065764.pdf?idEdificio=d8cd376edad7e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307263-parroquia-san-millan-san-cayetano.json",
        originID: 307263,
        title: "Parroquia San Millán y San Cayetano",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0718f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "Calle EMBAJADORES 15"
        },
        location: {
            type: "Point",
            coordinates: [40.40960698563183, -3.705510095790745]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307263.pdf?idEdificio=0718f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/329096-plaza-toros-ventas.json",
        originID: 329096,
        title: "Plaza de Toros de Las Ventas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e328f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Guindalera",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 237"
        },
        location: {
            type: "Point",
            coordinates: [40.43227072485769, -3.6634101865891995]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/329096.pdf?idEdificio=e328f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/390003-plaza-mayor.json",
        originID: 390003,
        title: "Plaza Mayor",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2528f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28012,
            street: "Plaza MAYOR "
        },
        location: {
            type: "Point",
            coordinates: [40.41539735232832, -3.707385727413197]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/390003.pdf?idEdificio=2528f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/340529-puente-segovia.json",
        originID: 340529,
        title: "Puente de Segovia",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6428f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            locality: "MADRID",
            street: "PUENTE SEGOVIA "
        },
        location: {
            type: "Point",
            coordinates: [40.41396526110986, -3.722773406728326]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/340529.pdf?idEdificio=6428f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/340528-puente-toledo.json",
        originID: 340528,
        title: "Puente de Toledo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4428f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            locality: "MADRID",
            street: "PUENTE TOLEDO "
        },
        location: {
            type: "Point",
            coordinates: [40.39779539202881, -3.7157588747442656]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/340528.pdf?idEdificio=4428f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/340416-puerta-alcala.json",
        originID: 340416,
        title: "Puerta de Alcalá",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2428f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "Jeronimos",
            locality: "MADRID",
            postalCode: 28001,
            street: "Plaza INDEPENDENCIA "
        },
        location: {
            type: "Point",
            coordinates: [40.41997849525109, -3.68872691282157]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/340416.pdf?idEdificio=2428f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/340394-puerta-toledo.json",
        originID: 340394,
        title: "Puerta de Toledo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0428f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28005,
            street: "Glorieta PUERTA DE TOLEDO "
        },
        location: {
            type: "Point",
            coordinates: [40.40673161633396, -3.711631948428992]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/340394.pdf?idEdificio=0428f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/390004-puerta-sol.json",
        originID: 390004,
        title: "Puerta del Sol",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4528f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "PLAZA PUERTA DEL SOL 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41689383463677, -3.70226287159844]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/390004.pdf?idEdificio=4528f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303820-real-academia-bellas-artes-san-fernando.json",
        originID: 303820,
        title: "Real Academia de Bellas Artes de San Fernando",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c118f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28014,
            street: "Calle ALCALÁ 13"
        },
        location: {
            type: "Point",
            coordinates: [40.41800496217898, -3.7008122201025677]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303820.pdf?idEdificio=c118f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/304332-real-academia-historia.json",
        originID: 304332,
        title: "Real Academia de la Historia",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8318f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE LEON 21"
        },
        location: {
            type: "Point",
            coordinates: [40.413477661561586, -3.698997649377588]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/304332.pdf?idEdificio=8318f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/317885-real-academia-espanola-lengua.json",
        originID: 317885,
        title: "Real Academia Española de la Lengua",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4e18f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE FELIPE IV 4"
        },
        location: {
            type: "Point",
            coordinates: [40.41507827018255, -3.6909088749077665]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/317885.pdf?idEdificio=4e18f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325454-real-basilica-san-francisco-grande.json",
        originID: 325454,
        title: "Real Basílica de San Francisco el Grande",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e028f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28005,
            street: "Gran Vía SAN FRANCISCO 19"
        },
        location: {
            type: "Point",
            coordinates: [40.41038846182965, -3.7146876430333604]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325454.pdf?idEdificio=e028f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307076-real-casa-correos.json",
        originID: 307076,
        title: "Real Casa de Correos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8518f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "PLAZA PUERTA DEL SOL 7"
        },
        location: {
            type: "Point",
            coordinates: [40.416550888822, -3.7037990314537987]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307076.pdf?idEdificio=8518f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307298-real-casa-aduana-actual-sede-ministerio-hacienda-.json",
        originID: 307298,
        title: "Real Casa de la Aduana (actual sede del Ministerio de Hacienda)",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8718f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE ALCALA 5"
        },
        location: {
            type: "Point",
            coordinates: [40.41731385250003, -3.7018150873321436]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307298.pdf?idEdificio=8718f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/303772-real-colegiata-san-isidro.json",
        originID: 303772,
        title: "Real Colegiata de San Isidro",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8118f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28005,
            street: "CALLE TOLEDO 37"
        },
        location: {
            type: "Point",
            coordinates: [40.412971157638985, -3.707369400972756]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/303772.pdf?idEdificio=8118f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325786-real-jardin-botanico.json",
        originID: 325786,
        title: "Real Jardín Botánico",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8128f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "PLAZA MURILLO 2"
        },
        location: {
            type: "Point",
            coordinates: [40.412388448625556, -3.692021796072817]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325786.pdf?idEdificio=8128f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307041-real-monasterio-encarnacion.json",
        originID: 307041,
        title: "Real Monasterio de la Encarnación",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e418f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Plaza ENCARNACION 1"
        },
        location: {
            type: "Point",
            coordinates: [40.42000078931801, -3.71181890174026]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307041.pdf?idEdificio=e418f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11017265-reforma-antiguo-edificio-union-electrica.json",
        originID: 11017265,
        title: "Reforma del antiguo edificio de Unión Eléctrica",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=5b43e485f1a2d610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28013,
            street: "CALLE GRAN VIA 4"
        },
        location: {
            type: "Point",
            coordinates: [40.41929644186726, -3.6976372524904275]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11017265.pdf?idEdificio=5b43e485f1a2d610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11053575-residencia-estudiantes.json",
        originID: 11053575,
        title: "Residencia de Estudiantes",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b711078f64c1e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Chamartin",
            areaURL: "El Viso",
            locality: "MADRID",
            postalCode: 28006,
            street: "CALLE PINAR 21"
        },
        location: {
            type: "Point",
            coordinates: [40.44065779577869, -3.6880526406060454]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11053575.pdf?idEdificio=b711078f64c1e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11016982-restos-antiguo-palacio-buen-retiro.json",
        originID: 11016982,
        title: "Restos del Antiguo Palacio del Buen Retiro",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=056bce908a92d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "LosJeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "CALLE FELIPE IV 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41534345623286, -3.6924516397138722]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11016982.pdf?idEdificio=056bce908a92d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/390005-salon-prado.json",
        originID: 390005,
        title: "Salón del Prado",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6528f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Retiro",
            areaURL: "Jeronimos",
            locality: "MADRID",
            postalCode: 28014,
            street: "Paseo PRADO "
        },
        location: {
            type: "Point",
            coordinates: [40.41482596602272, -3.6931415043070634]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/390005.pdf?idEdificio=6528f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11049875-teatro-barcelo.json",
        originID: 11049875,
        title: "Teatro Barceló",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=14ba072df910e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "CALLE BARCELO 11"
        },
        location: {
            type: "Point",
            coordinates: [40.42691245380727, -3.69979134642512]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11049875.pdf?idEdificio=14ba072df910e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/325817-teatro-maria-guerrero.json",
        originID: 325817,
        title: "Teatro María Guerrero",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6228f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle TAMAYO Y BAUS 4"
        },
        location: {
            type: "Point",
            coordinates: [40.422854719603144, -3.6928584806310307]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/325817.pdf?idEdificio=6228f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307072-teatro-real.json",
        originID: 307072,
        title: "Teatro Real",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6518f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "PLAZA ISABEL II "
        },
        location: {
            type: "Point",
            coordinates: [40.41776291784375, -3.70918800795985]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307072.pdf?idEdificio=6518f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11018036-teatro-valle-inclan.json",
        originID: 11018036,
        title: "Teatro Valle-Inclán",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=96e756881493d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Embajadores",
            locality: "MADRID",
            postalCode: 28012,
            street: "CALLE VALENCIA 1"
        },
        location: {
            type: "Point",
            coordinates: [40.408011845853444, -3.700475207314223]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11018036.pdf?idEdificio=96e756881493d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11005484-templo-debod.json",
        originID: 11005484,
        title: "Templo de Debod",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=201e4c90b3dcc610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Casa de Campo",
            locality: "MADRID",
            postalCode: 28008,
            street: "CALLE FERRAZ 1"
        },
        location: {
            type: "Point",
            coordinates: [40.424301175943256, -3.7162688083251094]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11005484.pdf?idEdificio=201e4c90b3dcc610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11073713-terminal-t4.json",
        originID: 11073713,
        title: "Terminal T4",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=194cbd23f57ae610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Distrito",
            locality: "MADRID",
            street: "AEROPUERTO TERMINAL T-4 "
        },
        location: {
            type: "Point",
            coordinates: [40.49244999472662, -3.591837062218565]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11073713.pdf?idEdificio=194cbd23f57ae610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11053556-torre-castelar.json",
        originID: 11053556,
        title: "Torre Castelar",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=a790078f64c1e610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Salamanca",
            areaURL: "Castellana",
            locality: "MADRID",
            postalCode: 28046,
            street: "PASEO CASTELLANA 50"
        },
        location: {
            type: "Point",
            coordinates: [40.435197111159646, -3.688015719288949]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11053556.pdf?idEdificio=a790078f64c1e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11023466-torre-madrid.json",
        originID: 11023466,
        title: "Torre de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0b592f9156e4d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Moncloa-Aravaca",
            areaURL: "Arguelles",
            locality: "MADRID",
            postalCode: 28008,
            street: "PLAZA ESPAÑA 18"
        },
        location: {
            type: "Point",
            coordinates: [40.42418961131494, -3.712366421203481]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11023466.pdf?idEdificio=0b592f9156e4d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11050220-torres-blancas.json",
        originID: 11050220,
        title: "Torres Blancas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=fd8987c41420e610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Chamartin",
            areaURL: "Prosperidad",
            locality: "MADRID",
            postalCode: 28002,
            street: "AVENIDA AMERICA 37"
        },
        location: {
            type: "Point",
            coordinates: [40.43965048520964, -3.6718342742664696]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11050220.pdf?idEdificio=fd8987c41420e610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11027622-tribunal-superior-justicia.json",
        originID: 11027622,
        title: "Tribunal Superior de Justicia",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=174d227f2186d610VgnVCM1000001d4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "CALLE GENERAL CASTA&amp;Ntilde;OS 1"
        },
        location: {
            type: "Point",
            coordinates: [40.424691322944106, -3.6942249750928022]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11027622.pdf?idEdificio=174d227f2186d610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11006305-viaducto.json",
        originID: 11006305,
        title: "Viaducto",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=b666390fd42dc610VgnVCM2000001f4a900aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "CALLE BAILEN 12"
        },
        location: {
            type: "Point",
            coordinates: [40.41458749364033, -3.713713125691665]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11006305.pdf?idEdificio=b666390fd42dc610VgnVCM2000001f4a900aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302124-viviendas-alejandro-santamaria.json",
        originID: 302124,
        title: "Viviendas para Alejandro Santamaría",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 56"
        },
        location: {
            type: "Point",
            coordinates: [40.42151409771597, -3.7074497966802955]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302124.pdf?idEdificio=2708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302352-viviendas-conde-artaza.json",
        originID: 302352,
        title: "Viviendas para el Conde Artaza",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ac08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 11"
        },
        location: {
            type: "Point",
            coordinates: [40.41940962687557, -3.69944766764916]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302352.pdf?idEdificio=ac08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302159-viviendas-conde-godo.json",
        originID: 302159,
        title: "Viviendas para el conde de Godó",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4808f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 44"
        },
        location: {
            type: "Point",
            coordinates: [40.42056229267926, -3.705459505540731]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302159.pdf?idEdificio=4808f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302185-viviendas-marques-cubas-fontalba.json",
        originID: 302185,
        title: "Viviendas para el Marqués de Cubas y Fontalba",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GONZALO JIMENEZ DE QUESADA 2"
        },
        location: {
            type: "Point",
            coordinates: [40.42044310282671, -3.7028414131115097]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302185.pdf?idEdificio=2908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302187-viviendas-marques-cubas-fontalba.json",
        originID: 302187,
        title: "Viviendas para el Marqués de Cubas y Fontalba",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 30"
        },
        location: {
            type: "Point",
            coordinates: [40.42037361389273, -3.702416336705097]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302187.pdf?idEdificio=6908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307318-viviendas-marques-falces.json",
        originID: 307318,
        title: "Viviendas para el marqués de Falces",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle CONCEPCION ARENAL 2"
        },
        location: {
            type: "Point",
            coordinates: [40.42047752700586, -3.704586337195032]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307318.pdf?idEdificio=2818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302341-viviendas-marques-urquijo.json",
        originID: 302341,
        title: "Viviendas para el marqués de Urquijo",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0c08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 6"
        },
        location: {
            type: "Point",
            coordinates: [40.41951812230061, -3.697892849039001]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302341.pdf?idEdificio=0c08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302285-viviendas-marques-villamayor-santiago.json",
        originID: 302285,
        title: "Viviendas para el marqués de Villamayor de Santiago",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2b08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 7"
        },
        location: {
            type: "Point",
            coordinates: [40.41960260462519, -3.700310150544718]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302285.pdf?idEdificio=2b08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302135-viviendas-fernando-m-vidales.json",
        originID: 302135,
        title: "Viviendas para Fernando M. Vidales",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8708f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 52"
        },
        location: {
            type: "Point",
            coordinates: [40.42120305505693, -3.706751062021101]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302135.pdf?idEdificio=8708f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302053-viviendas-jose-maria-escrina.json",
        originID: 302053,
        title: "Viviendas para José María Escriña",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=e308f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 69"
        },
        location: {
            type: "Point",
            coordinates: [40.422783222706194, -3.7105751263868805]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302053.pdf?idEdificio=e308f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302056-viviendas-jose-perez-pla.json",
        originID: 302056,
        title: "Viviendas para José Pérez Pla",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle FLOR BAJA 4"
        },
        location: {
            type: "Point",
            coordinates: [40.42241829328353, -3.709852221827304]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302056.pdf?idEdificio=4408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302355-viviendas-juan-giralt-porta.json",
        originID: 302355,
        title: "Viviendas para Juan Giralt de la Porta",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0d08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 17"
        },
        location: {
            type: "Point",
            coordinates: [40.41920713559999, -3.6986676029689782]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302355.pdf?idEdificio=0d08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302333-viviendas-sociedad-inmobiliaria-villa-madrid-bar-chicote-.json",
        originID: 302333,
        title: "Viviendas para la Sociedad Inmobiliaria de la Villa de Madrid. Bar Chicote.",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ab08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 12"
        },
        location: {
            type: "Point",
            coordinates: [40.41976473508097, -3.698826608774758]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302333.pdf?idEdificio=ab08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302332-viviendas-sociedad-inmobiliaria-madrid.json",
        originID: 302332,
        title: "Viviendas para la Sociedad Inmobiliaria de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8b08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 14"
        },
        location: {
            type: "Point",
            coordinates: [40.419835306475555, -3.699074876456168]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302332.pdf?idEdificio=8b08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302357-viviendas-luis-ocharan-mazas.json",
        originID: 302357,
        title: "Viviendas para Luis Ocharán Mazas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4d08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 21"
        },
        location: {
            type: "Point",
            coordinates: [40.4190843632902, -3.6981123266852105]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302357.pdf?idEdificio=4d08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302353-viviendas-luis-manuel-mitjans.json",
        originID: 302353,
        title: "Viviendas para Luis y Manuel Mitjans",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=cc08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 13"
        },
        location: {
            type: "Point",
            coordinates: [40.41932139571109, -3.6991402812861884]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302353.pdf?idEdificio=cc08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307317-viviendas-maria-monasterio-arrillaga.json",
        originID: 307317,
        title: "Viviendas para María Monasterio Arrillaga",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 36"
        },
        location: {
            type: "Point",
            coordinates: [40.4204609465012, -3.7043504121334347]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307317.pdf?idEdificio=0818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302334-viviendas-seguros-estrella.json",
        originID: 302334,
        title: "Viviendas para Seguros La Estrella",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=cb08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 10"
        },
        location: {
            type: "Point",
            coordinates: [40.419685368324615, -3.698542888220262]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302334.pdf?idEdificio=cb08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302280-viviendas-seguros-estrella.json",
        originID: 302280,
        title: "Viviendas para Seguros La Estrella",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=aa08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 20"
        },
        location: {
            type: "Point",
            coordinates: [40.42010879230797, -3.7000324985088477]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302280.pdf?idEdificio=aa08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302282-viviendas-tomas-allende.json",
        originID: 302282,
        title: "Viviendas para Tomás Allende",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ea08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 1"
        },
        location: {
            type: "Point",
            coordinates: [40.41975031907702, -3.701207530853102]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302282.pdf?idEdificio=ea08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307320-viviendas-comercios-francisco-escrina.json",
        originID: 307320,
        title: "Viviendas y comercios para Francisco Escriña",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 71"
        },
        location: {
            type: "Point",
            coordinates: [40.42291755243886, -3.710706208243318]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307320.pdf?idEdificio=6818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302083-viviendas-oficinas.json",
        originID: 302083,
        title: "Viviendas y oficinas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 51"
        },
        location: {
            type: "Point",
            coordinates: [40.421150945618855, -3.7079057135178797]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302083.pdf?idEdificio=0608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302042-viviendas-oficinas.json",
        originID: 302042,
        title: "Viviendas y oficinas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6308f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28015,
            street: "Calle GRAN VIA 80"
        },
        location: {
            type: "Point",
            coordinates: [40.423487402817905, -3.710334985725268]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302042.pdf?idEdificio=6308f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302086-viviendas-oficinas.json",
        originID: 302086,
        title: "Viviendas y oficinas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 45"
        },
        location: {
            type: "Point",
            coordinates: [40.4208657051662, -3.707407641201163]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302086.pdf?idEdificio=6608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302069-viviendas-oficinas.json",
        originID: 302069,
        title: "Viviendas y oficinas",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 60"
        },
        location: {
            type: "Point",
            coordinates: [40.42204991423245, -3.7082216221580424]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302069.pdf?idEdificio=2508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302278-viviendas-oficinas-vizconde-escoriaza.json",
        originID: 302278,
        title: "Viviendas y oficinas para el vizconde de Escoriaza",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6a08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 22B"
        },
        location: {
            type: "Point",
            coordinates: [40.420196449810746, -3.700434184151691]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302278.pdf?idEdificio=6a08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302054-viviendas-oficinas-hilario-ruiz.json",
        originID: 302054,
        title: "Viviendas y oficinas para Hilario Ruiz",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle DOCTOR CARRACIDO "
        },
        location: {
            type: "Point",
            coordinates: [40.42260479210528, -3.710290337398356]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302054.pdf?idEdificio=0408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302250-viviendas-oficinas-jesus-murga.json",
        originID: 302250,
        title: "Viviendas y oficinas para Jesús de Murga",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4a08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle FUENCARRAL 2"
        },
        location: {
            type: "Point",
            coordinates: [40.42019974167522, -3.7013772230560367]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302250.pdf?idEdificio=4a08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302050-viviendas-oficinas-jesus-ussia-cubas-cine-azul.json",
        originID: 302050,
        title: "Viviendas y oficinas para Jesús Ussia y Cubas y Cine Azul",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8308f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GENERAL MITRE "
        },
        location: {
            type: "Point",
            coordinates: [40.42326392942259, -3.7100497207381746]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302050.pdf?idEdificio=8308f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302158-viviendas-oficinas-jose-maria-cano.json",
        originID: 302158,
        title: "Viviendas y oficinas para José María Cano",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2808f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 42"
        },
        location: {
            type: "Point",
            coordinates: [40.420527912725234, -3.7051880312562004]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302158.pdf?idEdificio=2808f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302335-viviendas-oficinas-jose-maria-antonio-becerril.json",
        originID: 302335,
        title: "Viviendas y oficinas para José María de Antonio Becerril",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=eb08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Justicia",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle GRAN VIA 8"
        },
        location: {
            type: "Point",
            coordinates: [40.41960571610798, -3.6983063152074465]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302335.pdf?idEdificio=eb08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302071-viviendas-oficinas-jose-perez-pla.json",
        originID: 302071,
        title: "Viviendas y oficinas para José Pérez Pla",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6508f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            street: "Calle GRAN VIA 64"
        },
        location: {
            type: "Point",
            coordinates: [40.42230899265851, -3.708577977039153]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302071.pdf?idEdificio=6508f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302057-viviendas-oficinas-juan-miralles-sese.json",
        originID: 302057,
        title: "Viviendas y oficinas para Juan Miralles Sesé",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=6408f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle FLOR BAJA 2"
        },
        location: {
            type: "Point",
            coordinates: [40.42230263063633, -3.709615247532299]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302057.pdf?idEdificio=6408f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302212-viviendas-oficinas-constructora-calpense.json",
        originID: 302212,
        title: "Viviendas y oficinas para la Constructora Calpense",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c908f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CHINCHILLA "
        },
        location: {
            type: "Point",
            coordinates: [40.41983659667071, -3.7033183883781584]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302212.pdf?idEdificio=c908f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302084-viviendas-oficinas-leopoldo-garcia.json",
        originID: 302084,
        title: "Viviendas y oficinas para Leopoldo García",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=2608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            street: "Calle GRAN VIA 49"
        },
        location: {
            type: "Point",
            coordinates: [40.421052935047896, -3.7077278705268566]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302084.pdf?idEdificio=2608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/307319-viviendas-oficinas-rafael-calabuig.json",
        originID: 307319,
        title: "Viviendas y oficinas para Rafael Calabuig",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4818f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 58"
        },
        location: {
            type: "Point",
            coordinates: [40.4219249510091, -3.708031705868069]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/307319.pdf?idEdificio=4818f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302165-viviendas-oficinas-ramon-saiz-carlos.json",
        originID: 302165,
        title: "Viviendas y oficinas para Ramón Saiz de Carlos",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=8808f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Sol",
            locality: "MADRID",
            street: "Calle GRAN VIA 33"
        },
        location: {
            type: "Point",
            coordinates: [40.419884476559766, -3.7043326122944116]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302165.pdf?idEdificio=8808f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302085-viviendas-oficinas-santos-suarez-compania.json",
        originID: 302085,
        title: "Viviendas y oficinas para Santos Suárez y Compañía",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=4608f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Palacio",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle GRAN VIA 47"
        },
        location: {
            type: "Point",
            coordinates: [40.420909593356875, -3.707596703829156]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302085.pdf?idEdificio=4608f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302354-viviendas-oficinas-seguros-estrella.json",
        originID: 302354,
        title: "Viviendas y oficinas para Seguros La Estrella",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=ec08f7d9560a4510f7d9560a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Cortes",
            locality: "MADRID",
            postalCode: 28013,
            street: "Calle CABALLERO DE GRACIA 15"
        },
        location: {
            type: "Point",
            coordinates: [40.41925983291224, -3.698892108659167]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302354.pdf?idEdificio=ec08f7d9560a4510f7d9560a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/302186-viviendas-teatro-fontalba-marques-cubas-fontalba.json",
        originID: 302186,
        title: "Viviendas y teatro Fontalba para el marqués de Cubas y Fontalba",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=0008723e180a4510723e180a45102e085a0aRCRD",
        address: {
            districtURL: "Centro",
            areaURL: "Universidad",
            locality: "MADRID",
            postalCode: 28004,
            street: "Calle DESENGAÑO 3"
        },
        location: {
            type: "Point",
            coordinates: [40.42043538395938, -3.7026291559798357]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/302186.pdf?idEdificio=0008723e180a4510723e180a45102e085a0aRCRD&tipoMon=E"
    },
    {
        jsonURL: "https://datos.madrid.es/egob/catalogo/tipo/edificio/11066810-zoo-aquarium-madrid.json",
        originID: 11066810,
        title: "Zoo Aquarium de Madrid",
        relation: "https://patrimonioypaisaje.madrid.es/sites/v/index.jsp?vgnextchannel=83bc3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextoid=c8eb59843b38e610VgnVCM1000001d4a900aRCRD",
        address: {
            locality: "MADRID",
            street: "COMPLEJO ZOOLOGICO DE LA CASA CAMPO "
        },
        location: {
            type: "Point",
            coordinates: [40.41176029757209, -3.761360271036638]
        },
        references: "https://patrimonioypaisaje.madrid.es/FrameWork/generacionPDFMonumenta/11066810.pdf?idEdificio=c8eb59843b38e610VgnVCM1000001d4a900aRCRD&tipoMon=E"
    }
]





const salt = bcrypt.genSaltSync(bcryptSalt)
const hashPass1 = bcrypt.hashSync(password1, salt)
const hashPass2 = bcrypt.hashSync(password2, salt)

const users = [{
    username: "Admin",
    password: hashPass1,
    role: "Admin"
},
    {
        username: "Amanda",
        password: hashPass2
  }  
]






Activity.create(activities)
    .then(allActivitiesCreated => console.log('Se han creado', allActivitiesCreated.length, 'actividades en la BBDD'))
    .catch(err => console.log('ERROR: ', err))

Monument.create(monuments)
    .then(allMonuments => console.log("Se han creado ", allMonuments.length, " monumentos en la BBD"))
    
    .catch(err => console.log('ERROR: ', err))


User.create(users)
    .then(allUsers => console.log('Se han creado', allUsers.length, 'usuarios en la BBDD'))
    .catch(err => console.log('ERROR: ', err))



// close the database
// mongoose.connection.close()