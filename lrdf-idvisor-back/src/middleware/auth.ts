import { checkToken } from "../utils/jwt";

export default async function isAuthenticated(request, res, next) {
    try {
        await checkToken(request);
        next();
    }
    catch (err) {
        res.status(500).json({ error: "Not Authorized" }); //TODO: give a more precise answer (server down, not valid token, ...)

    }
}