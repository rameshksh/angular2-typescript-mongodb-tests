var MovieRepository = (function () {
    function MovieRepository(database) {
        this.db = database;
    }
    MovieRepository.prototype.initializeDb = function () {
        // Establish connection to db
        this.db.open(function (err, db) {
            //var collection = db.collection("test_data");
            //// Insert a single document
            //collection.insert([{ hello: 'world_safe1' }, { hello: 'world_safe2' }], { w: 1 }, function (err, result)
            //{
            //});
            this.db.close();
        });
    };
    MovieRepository.prototype.read = function () {
        return new Promise(function (resolve, reject) {
            var data = this.db.open(function (err, db) {
                var collection = db.collection("movies");
                // Fetch the document
                collection.find({ title: 'card' }, function (err, item) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(item);
                    }
                });
                db.close();
            });
        });
    };
    MovieRepository.prototype.create = function () {
        this.db.open(function (err, db) {
            this.db.close();
        });
    };
    MovieRepository.prototype.update = function (id) {
        this.db.open(function (err, db) {
            this.db.close();
        });
    };
    MovieRepository.prototype.delete = function (id) {
        this.db.open(function (err, db) {
            this.db.close();
        });
    };
    return MovieRepository;
})();
exports.MovieRepository = MovieRepository;
//# sourceMappingURL=movie.js.map