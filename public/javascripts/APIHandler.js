class APIHandler {

    constructor(base_Url) {
        this.app = axios.create({
            baseURL: base_Url
        })
    }


 getFullList = () => this.app.get("/")



    }
