import Users from '../../../models/UserModel'
import AuthenticationService from '../../services/authentication.service'
import PasswordService from '../../services/password.service'

export class Controller {
    async register(req, res) {
        let duplicateUser = await Users.findOne({ email: req.body.email });
        if (duplicateUser) {
            res.status(409).json({ "data": { error: "Email Already Exists" } });
        }
        else {
            let { salt, hash } = PasswordService.createPassword(req.body.password);
            let user = new Users({
                email: req.body.email,
                name: req.body.name,
                salt: salt,
                hash: hash
            });
            user.save()
                .then(r => res.json({ "data": r }),
                    error => res.json({ "data": { error: error } }));
        }
    }


    login(req, res) {
        Users.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    res.status(401).json({ "data": { error: "Invalid Email or Password" } });
                }
                else if (!PasswordService.checkPassword(req.body.password, user.hash, user.salt)) {
                    res.status(401).json({ "data": { error: "Invalid Email or Password" } });
                }
                else {
                    res.status(200).json({
                        "data": {
                            token: AuthenticationService.generateToken(user._id),
                        }
                    });
                }
            }).catch(err => {
                res.status(401).json({ "data": { error: err } });
            }
            );
    }
}
export default new Controller();