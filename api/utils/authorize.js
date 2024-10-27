const authorize = (allowedRoles) => (req, res, next) => {
    const userRole = req.user.roles[0]; // Assuming roles is an array
    if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied.' });
    }
    next();
};

export default authorize; // Default export
