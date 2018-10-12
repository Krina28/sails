var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

module.exports = {

	signup: async function (req, res) {
		if (req.body.password) {
			let hashPwd = bcrypt.hashSync(req.body.password);

			let finalUser = req.body;
			finalUser['password'] = hashPwd;

			let user = await User.create(finalUser).meta({ fetch: true });

			if (user) {
				return res.json({ message: 'Signup successfull. Please login' });
			} else {
				return res.json({ message: 'Signup failed!!' })
			}
		} else {
			return res.json({ message: 'Password is required.' })
		}

	},

	login: async function (req, res) {

		let user = await User.findOne({ email: req.body.email })
		let hashPwd = bcrypt.compareSync(req.body.password, user.password);

		if (hashPwd) {
			let finalUser = user;

			finalUser['token'] = jwt.sign(user.email, 'secret')
			return res.json({ data: finalUser, message: 'Login success', status: 'SUCCESS' });
		} else {
			return res.json({ message: 'Authentication failed!!', status: 'ERROR' });
		}
	}

}
