const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Acceso denegado. No tienes los permisos necesarios.' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  