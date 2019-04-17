const ValidationService = {
    getAll: function() {
        return new Promise((res, rej) => {
            fetch('http://localhost:3001/api/questions')
            .then(function(data) {
                res(data.json());
            })
        })
    },

    getOne: function(value) {
        //inspect the value
    }
};

export default ValidationService;