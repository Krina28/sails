var jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
	var token;
	if (req.headers && req.headers.authorization) {
		token = req.headers.authorization;
		let verified = await jwt.verify(token, 'secret');
		if (verified) {
			req.user = verified;
			next();
		} else {
			return res.json({ message: 'Token does not exist!!' })
		}
	} else {
		return res.json({ message: 'Authentication failed!! Token Required.' })
	}
}
