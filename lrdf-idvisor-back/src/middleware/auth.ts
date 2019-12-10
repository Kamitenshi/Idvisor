import { verify } from "jsonwebtoken";

export default async function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            const user = await verify(token, "MySuperSecretPassPhrase", { algorithms: ["HS256"] });
            req.user = user;
            next();
        }
        catch (err) {
            res.status(500).json({ error: "Not Authorized" });

        }
    } else {
        res.status(403).json({ error: "Not Authorized" });
    }
}