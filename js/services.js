angular.module('wTap')

.service('LoginService', function($q){
	return {
		loginUser: function(name, pw) {
			var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == '1' && pw == '1') {
                deferred.resolve();
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
	}
})